// vercel blop storge  ; https://vercel.com/docs/storage/vercel-blob/server-upload
// to turn it into a server action
"use server"

import prisma from "@/lib/prisma";
import { resumeSchema, ResumeValues } from "@/lib/validation";
import { auth } from "@clerk/nextjs/server";
import { del, put } from "@vercel/blob";
import path from "path";

export async function saveResume( values : ResumeValues) {
    // resume id
    const {id} = values

    console.log("received values", values)

    // we will use the resume schema to valiate  our inputs
    // we have to distructure these values beacuse photo is a fiel , workexp and edu are arrays
    const {
        photo, workExperiences , educations , ...resumeValues
    } = resumeSchema.parse(values)

    // user id
    const {userId} = await auth()
    if(!userId) throw new Error("User not Authenticated")

    const existingResume = id ? await prisma.resume.findFirst({where : {id , userId}}) : null

    if(id && !existingResume) throw new Error("Resume not found")

    // we need to upload teh photo to the blop storage becasue we cant store a file in our database
    // we have to upload  the file to the blop storage  and then we get teh urk back and store it in our database
    let newPhotoUrl : string | undefined | null = undefined
    
    if ( photo instanceof File) {
        // if the resume has already a photo we will delete the old photo before uploading teh new one
        if (existingResume?.photoUrl) { await del(existingResume.photoUrl) }
        
        // public is the only available option for now ( all images we put in our blob store can  be seen by other users )
        const blob = await  put(`resume_photos/${path.extname(photo.name)}`, photo , {access : "public"})

        newPhotoUrl = blob.url
    } else if (photo === null) { // null means deleted
        if (existingResume?.photoUrl) { await del(existingResume.photoUrl) }
        newPhotoUrl = null
    }

    if(id){
        // if the resume id defined update the existing resume
        return prisma.resume.update({
            where: {id},
            data: {
                ...resumeValues,
                photoUrl: newPhotoUrl,
                workExperiences: {
                    deleteMany: {}, // delete all existing work experiences
                    // teh dates are strings but it expect an actual date object  so we havee to map them
                    create: workExperiences?.map(exp => ({
                        ...exp,
                        startDate: exp.startDate ? new Date(exp.startDate) : undefined,
                        endDate: exp.endDate ? new Date(exp.endDate) : undefined
                    }))
                },
                educations: {
                    deleteMany: {},
                    create: educations?.map(edu => ({
                        ...edu,
                        startDate: edu.startDate ? new Date(edu.startDate) : undefined,
                        endDate: edu.endDate ? new Date(edu.endDate) : undefined
                    }))
                },
                updatedAt: new Date() // update the update date too the current  date
            }
        })

    }else{
        // if the resume id is not defined create a new resume
        return prisma.resume.create({
            data: {
                ...resumeValues,
                userId, // add the user id to the resume
                photoUrl: newPhotoUrl,
                workExperiences: {
                    create: workExperiences?.map(exp => ({
                        ...exp,
                        startDate: exp.startDate ? new Date(exp.startDate) : undefined,
                        endDate: exp.endDate ? new Date(exp.endDate) : undefined
                    }))
                },
                educations: {
                    create: educations?.map(edu => ({
                        ...edu,
                        startDate: edu.startDate ? new Date(edu.startDate) : undefined,
                        endDate: edu.endDate ? new Date(edu.endDate) : undefined
                    }))
                },
            }
        })
    }
}
