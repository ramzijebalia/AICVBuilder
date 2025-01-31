"user client"

import { SubscriptionLevel } from "@/lib/subscriptions"
import { createContext, useContext } from "react"

const SubscriptionLevelContext = createContext<SubscriptionLevel | undefined>(
    undefined
)

interface SubscriptionLevelProviderProps{
    children: React.ReactNode
    userSubscriptionLevel : SubscriptionLevel
}

export default function SubscriptionLevelProvider({children , userSubscriptionLevel} : SubscriptionLevelProviderProps){

    return <SubscriptionLevelContext.Provider value={userSubscriptionLevel}>
        {children}
    </SubscriptionLevelContext.Provider>

}

export function userSubscriptionLevel(){
    const context = useContext(SubscriptionLevelContext)
    if(context === undefined){
        throw new Error("useSubscriptionLevel must be used within a SubscriptionLeveleProvider")
    }
    return context
}