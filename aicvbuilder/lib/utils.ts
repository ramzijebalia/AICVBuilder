import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ResumeValues } from "./validation"
import { ResumeServerData } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// The function checks if the given value is a file object.
//  If it is a file, it extracts only the important details 
// (name, size, type, lastModified) and returns them 
// as a regular object. If it is not a file, 
// it leaves the value unchanged.
//  solution from stack overflow
export function fileReplacer(key : unknown , value: any){
  return value instanceof File ? {
    name : value.name,
    size : value.size,
    type : value.type,
    lastModified : value.lastModified,
  } : value
}


export function mapToResumeVlues(data : ResumeServerData) : ResumeValues {
  return {
    id : data.id,
    title: data.title || undefined,
    description : data.description || undefined,
    photo : data.photoUrl || undefined,  
    firstName : data.firstName || undefined,
    lastName : data.lastName || undefined,
    jobTitle : data.jobTitle || undefined,
    city : data.city || undefined,
    country : data.country || undefined,
    phone : data.phone || undefined,
    email : data.email || undefined,
    workExperiences : data.workExperiences.map(work => ({
      position : work.position || undefined,
      company : work.company || undefined,
      startDate : work.startDate?.toISOString().split("T")[0], // we remove the time
      endDate : work.endDate?.toISOString().split("T")[0],
      description : work.description || undefined,
    })),
    educations : data.educations.map(edu => ({
      degree : edu.degree || undefined,
      school : edu.school || undefined,
      startDate : edu.startDate?.toISOString().split("T")[0], // we remove the time
      endDate : edu.endDate?.toISOString().split("T")[0],
    })),
    skills : data.skills, // we dont need to mention or undefined because it is an array
    borderStyle : data.borderStyle , // we dont need to mention or undefined because it has a default value
    colorHex : data.colorHex , // we dont need to mention or undefined because it has a default value
    template : data.template || 'modern', // add template with default value
    summary : data.summary || undefined,
  }
}