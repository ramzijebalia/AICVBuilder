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
