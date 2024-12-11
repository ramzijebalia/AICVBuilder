// shadcn form docs : https://ui.shadcn.com/docs/components/form

// here we will define our form shemas
// we will use it to validate the data received from the server

import {z} from 'zod';



export const  optionalString  = z.string().trim().optional().or(z.literal(''))
// trim : remove white spaces at the beg and end of the string
// optional().or(z.literal(''))  : pass undefined or empty string as an entry value


/// GENERAL INFO SHEMA :
export const generalInfoSchemas = z.object({
    title : optionalString,
    description : optionalString,
})

export type GeneralInfoValues = z.infer<typeof generalInfoSchemas>


/// PERSONAL INFO SHEMA :
export const personalInfoSchemas = z.object({
    photo : z.custom<File | undefined>()
    .refine(
        (file) => !file || (file instanceof File && file.type.startsWith('image/')),
        "Must be an image file"
    )
    .refine( file => !file || file.size < 4 * 1024 * 1024, // 4mb
        "Image size must be less than 4MB"
    ),
    firstName : optionalString,
    lastName : optionalString,
    jobTitle : optionalString,
    city : optionalString,
    country : optionalString,
    phone : optionalString,
    email : optionalString,

})

export type PersonalInfoValues = z.infer<typeof personalInfoSchemas>

// shema for the whole resume
export const resumeSchemas = z.object({
    ...generalInfoSchemas.shape,
    ...personalInfoSchemas.shape,
})

export type ResumeValues = Omit<z.infer<typeof resumeSchemas> , "photo"> & {
    // we need the id to update an existing resume
    id? : string;  // id is optional because new resumes doen-t yet have an id 
    

    // teh photo in the  personal info is a file or unfiedned
    // but when we upload teh photo in our backend the photo turns into url ( teh url into our blop storage )
    // whenw eload it into our cv fle , it is not a file anymore it is a url ( it is a string)
    // so we need to add a photo property that is a string ( url )
    // we used the OMit utility type to remove the photo from teh original type ( persoanll info ) and replace it with thsi photo property
    photo? : File | string | null;
}
