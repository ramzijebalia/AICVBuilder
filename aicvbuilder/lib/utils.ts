import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

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