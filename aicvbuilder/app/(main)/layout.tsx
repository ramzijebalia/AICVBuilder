// thsi layout will be applied to all the pages inside the (main) folder ( the main group)
import PreminumModal from "@/components/preminum/PreminumModal"
import Navbar from "./Navbar"
import { auth } from "@clerk/nextjs/server"
import { getUserSubscriptionLevel } from "@/lib/subscriptions"
import SubscriptionLevelProvider from "./SubscriptionLevelProvider"

export default async function Layout({children} : {children : React.ReactNode}) {
    
    const {userId} = await auth()
    if(!userId) return null

    const userSubscriptionLevel = await getUserSubscriptionLevel(userId)
    return (
        <SubscriptionLevelProvider userSubscriptionLevel={userSubscriptionLevel}>
            <div className="flex min-h-screen flex-col"> 
                <Navbar />
                {children}
                <PreminumModal />
            </div>
        </SubscriptionLevelProvider>
)


}