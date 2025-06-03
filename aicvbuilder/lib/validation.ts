// shadcn form docs : https://ui.shadcn.com/docs/components/form

// here we will define our form shemas
// we will use it to validate the data received from the server

import { describe } from 'node:test';
import {z} from 'zod';



export const  optionalString  = z.string().trim().optional().or(z.literal(''))
// trim : remove white spaces at the beg and end of the string
// optional().or(z.literal(''))  : pass undefined or empty string as an entry value


/// GENERAL INFO SHEMA :
export const generalInfoSchema = z.object({
    title : optionalString,
    description : optionalString,
})

export type GeneralInfoValues = z.infer<typeof generalInfoSchema>


/// PERSONAL INFO SHEMA :
export const personalInfoSchema = z.object({
    photo : z.custom<File | string | null | undefined>()
    .refine(
        (file) => {
            if (!file) return true;
            if (typeof file === 'string') return true;
            return file.type?.startsWith('image/');
        },
        "Must be an image file"
    )
    .refine( 
        file => {
            if (!file || typeof file === 'string') return true;
            return file.size < 4 * 1024 * 1024; // 4mb
        },
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

export type PersonalInfoValues = z.infer<typeof personalInfoSchema>


// WORK EXPERIENCE SHEMA :
export const workExperienceSchema = z.object({
    // we can add as many work exp as we want for that we need to put array
    workExperiences : z.array(
        z.object({
            position : optionalString,
            company : optionalString,
            startDate : optionalString,
            endDate : optionalString,
            description : optionalString
        })
    ).optional(),
})

export type WorkExperienceValues = z.infer<typeof workExperienceSchema>

// type for a single work exp
// teh work exp can be undifined so we need to use the NonNullable utility type to remove the undefined from the type
// it is ana array of work exp , but w ewnat one workexp for thatwe use [number] to access to a single work exp
export type WorkExperience = NonNullable<z.infer<typeof workExperienceSchema>["workExperiences"]>[number]

// EDUCATION SHEMA :
export const educationSchema = z.object({
    // we can add as many work exp as we want for that we need to put array
    educations : z.array(
        z.object({
            degree : optionalString,
            school : optionalString,
            startDate : optionalString,
            endDate : optionalString,
        })
    ).optional(),
})

export type EducationValues = z.infer<typeof educationSchema>


// SKILLS SHEMA :
export const skillsSchema = z.object({
    // we can add as many work exp as we want for that we need to put array
    skills : z.array(
        z.string().trim()
    ).optional(),
})

export type SkillsValues = z.infer<typeof skillsSchema>


// SUMMARY SCHEMA :
export const summarySchema = z.object({
    summary : optionalString
})

export type SummaryValues = z.infer<typeof summarySchema>


// CERTIFICATES SCHEMA:
export const certificatesSchema = z.object({
    certificates: z.array(
        z.object({
            name: optionalString,
            issuer: optionalString,
            date: optionalString,
            url: optionalString,
        })
    ).optional(),
})

export type CertificatesValues = z.infer<typeof certificatesSchema>
export type Certificate = NonNullable<z.infer<typeof certificatesSchema>["certificates"]>[number]

// INTERESTS SCHEMA:
export const interestsSchema = z.object({
    interests: z.array(
        z.string().trim()
    ).optional(),
})

export type InterestsValues = z.infer<typeof interestsSchema>

// LANGUAGES SCHEMA:
export const languagesSchema = z.object({
    languages: z.array(
        z.object({
            name: optionalString,
            level: optionalString,
        })
    ).optional(),
})

export type LanguagesValues = z.infer<typeof languagesSchema>
export type Language = NonNullable<z.infer<typeof languagesSchema>["languages"]>[number]

// shema for the whole resume
export const resumeSchema = z.object({
    ...generalInfoSchema.shape,
    ...personalInfoSchema.shape,
    ...workExperienceSchema.shape,
    ...educationSchema.shape,
    ...skillsSchema.shape,
    ...summarySchema.shape,
    ...certificatesSchema.shape,
    ...interestsSchema.shape,
    ...languagesSchema.shape,
    colorHex: optionalString, // the primary color of the resume
    borderStyle: optionalString,
    template: z.enum(['modern', 'two-column']).default('modern'), // the template style of the resume
})

export type ResumeValues = Omit<z.infer<typeof resumeSchema> , "photo"> & {
    // we need the id to update an existing resume
    id? : string;  // id is optional because new resumes doen-t yet have an id 
    

    // teh photo in the  personal info is a file or unfiedned
    // but when we upload teh photo in our backend the photo turns into url ( teh url into our blop storage )
    // whenw eload it into our cv fle , it is not a file anymore it is a url ( it is a string)
    // so we need to add a photo property that is a string ( url )
    // we used the OMit utility type to remove the photo from teh original type ( persoanll info ) and replace it with thsi photo property
    photo? : File | string | null;
}

export const generateWorkExperienceSchema = z.object({
    // the description snet  it to the api to generate a work experience
    description : z.string()
                    .trim()
                    .min(1 , "required")
                    .min(20 , "Description must be at least 20 characters long")

})

export type GenerateWorkExperienceInput = z.infer<typeof generateWorkExperienceSchema>


export const GenerateSummarySchema = z.object({
    jobTitle : optionalString,
    ...workExperienceSchema.shape,
    ...educationSchema.shape,
    ...skillsSchema.shape,
})

export type GenerateSummaryInput = z.infer<typeof GenerateSummarySchema>
