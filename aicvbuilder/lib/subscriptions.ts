import { cache } from "react";
import prisma from "./prisma";
import { env } from "@/env";

export type SubscriptionLevel = "free" | "pro" | "pro_plus"
// if we call this fct multiple times in difrent componenets on teh same page we only end up with a single call to teh database not a multiple time
// like for exp ; we called our user subs in teh navbar and iin teh main componenet in  teh same page  
export const getUserSubscriptionLevel = cache(async (userId : string) : Promise<SubscriptionLevel> => {
    const subscription = await prisma.userSubscription.findUnique({
        where: {
            userId
        }
    })

    if(!subscription || subscription.stripeCurrentPeriodEnd < new Date()) return "free"

    if(subscription.stripePriceId === env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY) return "pro"

    if(subscription.stripePriceId === env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_PLUS_MONTHLY) return "pro_plus"

    throw new Error("Invalid Subscription")
})