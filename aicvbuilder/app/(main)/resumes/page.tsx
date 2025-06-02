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
    <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
            <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Your Resumes
                        </h1>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            Manage and organize your professional resumes
                        </p>
                    </div>
                    <CreateResumeButton canCreate={canCreateResumr(SubscriptionLevel, totalCount)} />
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-medium">{totalCount}</span>
                    <span>resumes created</span>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {resumes.map(resume => (
                    <ResumeItem key={resume.id} resume={resume} />
                ))}
            </div>
        </div>
    </main>
)}
