// thsi si the Resume page ("/resumes")

// the () in the (main) , folders with parentheses are so-called route groups in next js
//  they are ignored by the server and are not part of the url
// /resumes/page.tsx is a route group  ( the main folder does not count)


import { Button } from "@/components/ui/button"
import prisma from "@/lib/prisma"
import { resumeDataInclude } from "@/lib/types"
import { auth } from "@clerk/nextjs/server"
import { PlusSquare } from "lucide-react"
import { Metadata } from "next"
import Link from "next/link"
import ResumeItem from "./ResumeItem"

export const metadata : Metadata = {
    title : "Your Resumes" // the title of the page
}


export default async function Page() {

    const {userId} = await auth()
    if(!userId) return null

    // promise.all is used to run multiple promises in parallel
    const [resumes , totalCount] = await Promise.all([
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
        })
    ])

    //we will check teh quota later for no preminum user

    
    return (
    <main className="maw-w-7xl mx-auto w-full px-3 py-6 space-y-6"> 
        <Button asChild className="mx-auto flex w-fit gap-2">  
            {/* asChild :  tell shadcn to not render a button , instead it render a link that look like a button*/}
            <Link href="/editor">
                <PlusSquare className="size-5" />
                New Resume
            </Link>
        </Button>
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
