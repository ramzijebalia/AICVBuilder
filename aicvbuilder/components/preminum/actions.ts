"use server"

import { env } from "@/env"
import stripe from "@/lib/Stripe"
import { currentUser } from "@clerk/nextjs/server"

export async function createCheckoutSession(priceID : string){
    // it return the current user object not just teh user id
    const user = await currentUser()

    if(!user){
        throw new Error("Unauthorized")
    }

    const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        line_items: [
            {
                price: priceID,  // the price id of teh product we wanna buy
                quantity: 1 // we only wanna buy one subs
            }
        ],
        success_url: `${env.NEXT_PUBLIC_BASE_URL}/billing/success`,
        cancel_url: `${env.NEXT_PUBLIC_BASE_URL}/billing`,
        //we force the user to use teh same email address as the one they used to sign up
        customer_email: user.emailAddresses[0].emailAddress ,
        // thsi metadata is to know whitch user is buying or removing teh subs
        subscription_data: {
            metadata: {
                userId: user.id
            }
        },
        custom_text: {
            terms_of_service_acceptance: {
                message: `By signing up you agree to our [terms of service](${env.NEXT_PUBLIC_BASE_URL}/tos)`,
            }
        },
        consent_collection: {
            terms_of_service: "required"
        }
    })

    if(!session){
        throw new Error("Failed to create checkout session")
    }

    return session.url
}