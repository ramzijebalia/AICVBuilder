//we can export the metadat only from server componenet 
// but we need in this componnet we need js feature like state and effect
// for  that we will craete the content of this page in a separate client component and import it here

import { Metadata } from "next";
import ResumeEditor from "./ResumeEditor";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { resumeDataInclude } from "@/lib/types";

interface PageProps {
    searchParams: Promise<{resumeId?: string}>
}

export  const metadata: Metadata = {
    title: "Design Your Resume"
}

export default async function Page({searchParams} : PageProps) {
    const {resumeId} = await  searchParams

    const {userId} = await auth()

    if(!userId) return null

    const resumeToEdit = resumeId ? await prisma.resume.findUnique({
        where : {id : resumeId , userId},
        // by default we only fetch the resume table ( but not the work exp , edu .. )
        // because they are in separaete tabels  , we will fetch  them as well using teh include values of prisma
        include : resumeDataInclude
    }) : null


    return <ResumeEditor resumeToEdit={resumeToEdit} />

}