// stripe webhooj docs : https://docs.stripe.com/webhooks

import { env } from "@/env";
import stripe from "@/lib/Stripe";
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

    } catch (error) {
        console.log(error)
        return new Response("Internal server error", {status:500})
    }
}


async function handleSessionCompleted(session : Stripe.Checkout.Session){

}

async function handleSubscriptionCreatedOrUpdated(subscriptionId : string){
    console.log("handleSubscriptionCreatedOrUpdated")
}

async function handleSubscriptionDeleted(subscription : Stripe.Subscription){
    console.log("handleSessionDeleted")
}