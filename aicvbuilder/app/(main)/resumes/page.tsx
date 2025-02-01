// thsi si the Resume page ("/resumes")

// the () in the (main) , folders with parentheses are so-called route groups in next js
//  they are ignored by the server and are not part of the url
// /resumes/page.tsx is a route group  ( the main folder does not count)

import prisma from "@/lib/prisma"
import { resumeDataInclude } from "@/lib/types"
import { auth } from "@clerk/nextjs/server"
import { Metadata } from "next"
import ResumeItem from "./ResumeItem"
import CreateResumeButton from "./CreateResumeButton"
import { getUserSubscriptionLevel } from "@/lib/subscriptions"
import { canCreateResumr } from "@/lib/permissions"

export const metadata : Metadata = {
    title : "Your Resumes" // the title of the page
}


export default async function Page() {

    const {userId} = await auth()
    if(!userId) return null

    // promise.all is used to run multiple promises in parallel
    const [resumes , totalCount , SubscriptionLevel] = await Promise.all([
        prisma.resume.findMany({
            where : {
                userId
            },
            orderBy : {
                updatedAt : "desc"
            },
            // teh work exp and the education are in separate tabels , so we need to include them in the query
            include : resumeDataInclude
        }),
        prisma.resume.count({
            where : {
                userId
            }
        }),
        // we used the cach in this function to dedeublicate the request ( ( no : one for the layout and one for this  page))
        getUserSubscriptionLevel(userId)
    ])

    //we will check teh quota later for no preminum user

    
    return (
    <main className="maw-w-7xl mx-auto w-full px-3 py-6 space-y-6"> 
        <CreateResumeButton canCreate={canCreateResumr(SubscriptionLevel , totalCount)} />
        <div className="space-y-1">
            <h1 className="text-3xl font-bold">Your Resumes</h1>
            <p>Total : {totalCount}</p>
            <div className="flex flex-col sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 w-full gap-3">
                {resumes.map(resume => (
                    <ResumeItem key={resume.id} resume={resume} />
                ))}
            </div>
        </div>
        
    </main>
)}
