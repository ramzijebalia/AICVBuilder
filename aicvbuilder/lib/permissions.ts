import { SubscriptionLevel } from "./subscriptions";

export function canCreateResumr(subscriptionLevel : SubscriptionLevel , currentResumeCount : number){
    const maxResumeMap : Record<SubscriptionLevel, number> = {
        free : 3,
        pro : 6 ,
        pro_plus : Infinity
    }

    const maxResumes = maxResumeMap[subscriptionLevel]

    // boolean returnn 
    return currentResumeCount < maxResumes
}

export function canUseAITools(subscriptionLevel : SubscriptionLevel){
    return subscriptionLevel !== "free"
}

export function canUseCustomizations(subscriptionLevel : SubscriptionLevel){
    return subscriptionLevel === "pro_plus"
}