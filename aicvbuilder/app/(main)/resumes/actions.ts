"use server"

import prisma from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { del } from "@vercel/blob"
import { revalidatePath } from "next/cache"

export async function deleteResume(id : string) {
    const {userId} = await auth()

    if(!userId) throw new Error("User not Authenticated")

    // befor we welete the resume we need to delete  the user image of the reesume
    const resume = await prisma.resume.findUnique({
        where : {
            id,
            userId
        },
    })

    if(!resume) throw new Error("Resume not found")

    if(resume.photoUrl){
        await del(resume.photoUrl)
    }

    await prisma.resume.delete({
        where : {
            id
        }
    })

    // thsi sto make sure the /resues page is revalidated ( refreshed and teh resume image deleted frpom teh user's screen )
    revalidatePath("/resumes")
}