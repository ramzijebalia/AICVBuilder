// stripe webhooj docs : https://docs.stripe.com/webhooks

import { env } from "@/env";
import prisma from "@/lib/prisma";
import stripe from "@/lib/Stripe";
import { clerkClient } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import Stripe from "stripe";

export async function POST(req : NextRequest){
    try {
        //when stripe call this webhook it sents all the data in this request object
        const payload = await req.text()
        
        // using teh signature we know it is actually stripe trying to calll this webhook 
        const signature = req.headers.get("stripe-signature")

        if(!signature) return new Response("Signature is missing" , {status:400})

        const event = stripe.webhooks.constructEvent(
            payload,
            signature,
            env.STRIPE_WEBHOOK_SECRET
        )
        console.log(`receved event ${event.type}` , event.data.object)

        switch (event.type) {
            case "checkout.session.completed" :
                await handleSessionCompleted(event.data.object)
                break;
            case "customer.subscription.created" :
            case "customer.subscription.updated" :
                await handleSubscriptionCreatedOrUpdated(event.data.object.id)
                break;
            case "customer.subscription.deleted" :
                await handleSubscriptionDeleted(event.data.object)
                break;
            default:
                console.log(`Unhandled event type ${event.type}`)
                break;
        }
        return new Response("Event Received", {status:200})

    } catch (error) {
        console.log(error)
        return new Response("Internal server error", {status:500})
    }
}


async function handleSessionCompleted(session : Stripe.Checkout.Session){
    // when we do a chekout for stripe , it automatically craete a customer in eth stripe dashborad with teh emaila ddress of teh user
    // but we can have duplicate customer with the same email ( pro and pro plus)
    // to avaoid creating duplicate user we have to store the stripe custmer id thatw  e can use it later

    // id of teh user who did the checkout
    const userId = session.metadata?.userId
    if(!userId) {
        throw new Error("User id is missing in session metdata")
    }

    // store the customerId  in teh clerk metadata
    (await clerkClient()).users.updateUserMetadata(userId , {
        privateMetadata : {
            stripeCustomerId : session.customer as string
        }
    })
}

async function handleSubscriptionCreatedOrUpdated(subscriptionId : string){
    const subscription = await stripe.subscriptions.retrieve(subscriptionId)

    // teh status of teh subscription is active , trialing or past_due ( stripe docs )
    if(subscription.status === "active" || subscription.status === "trialing" || subscription.status === "past_due"){
        // upsert is a mixt between create and update
        // we make sure  it works no matter if we recieved an update or create event
        await prisma.userSubscription.upsert({
            where: {
                userId : subscription.metadata.userId as string
            },
            create :  {
                userId: subscription.metadata.userId as string,
                subscriptionId: subscription.id,
                stripeCustomerId: subscription.customer as string,
                stripePriceId: subscription.items.data[0].price.id, // docs or console log to see the data
                stripeCurrentPeriodEnd : new Date(subscription.current_period_end * 1000),
                stripeCancelAtPeriodEnd: subscription.cancel_at_period_end,
            },
            update : {
                stripePriceId: subscription.items.data[0].price.id,
                stripeCurrentPeriodEnd : new Date(subscription.current_period_end * 1000),
                stripeCancelAtPeriodEnd: subscription.cancel_at_period_end,

            }
        })
    } else {
        // delet throw an error , for that we used deletaMany   
        // when the subscriptionn inactive we deklete it
        await prisma.userSubscription.deleteMany({
            where: {
                stripeCustomerId: subscription.customer as string
            }
        })
    }
}

async function handleSubscriptionDeleted(subscription : Stripe.Subscription){
    await prisma.userSubscription.deleteMany({
        where: {
            stripeCustomerId: subscription.customer as string
        }
    })
}