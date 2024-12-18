import useDimensions from "@/hooks/useDimensions"
import { cn } from "@/lib/utils"
import { ResumeValues } from "@/lib/validation"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

interface ResumePreviewProps {
    resumeData : ResumeValues // contain all teh data from our form fields
    clasName? : string

}

export default function ResumePreview({resumeData , clasName}: ResumePreviewProps){

    const containerRef = useRef<HTMLDivElement>(null)
    const {width} = useDimensions(containerRef)
    
    
    
    return (
        <div className={cn("bg-white text-black h-fit w-full aspect-[210/297]" , clasName)} ref={containerRef}>
            {/* we use  the cn ( from shadcn ) to ensure that the clasname overwrite the already existing class */}
            {/* teh background of teh sheet paper is white even in teh dark mode , the text is always black , and the size of teh paper A4 is 21 cm and 29.7 cm*/}

            <div className={cn("space-y-6 p-6" , !width && "invisible")} style={{zoom: (1/794) * width}}>
                {/* 794 is the number of pixels form 210 mm */}
                <PersonalInfoHeader resumeData={resumeData}/>
                <SummarySection resumeData={resumeData}/>
            </div>
        </div>

)}


interface ResumePreviewSectionProps {
    resumeData : ResumeValues
}

function PersonalInfoHeader({resumeData} : ResumePreviewSectionProps){
    const {photo , firstName , lastName , jobTitle , city , country , phone , email} = resumeData
    // if the photo is an instance of file then we gonna asign an empty string to the photoSrc else we gonna asign the photo ( which is a string it is not a file)
    const [photoSrc , setPhotoSrc] = useState(photo instanceof File ? "" : photo)

    // we will turn teh file of the photo into a string that we can use to resnder the image in teh screen
    useEffect(()=>{
        const objectUrl = photo instanceof File ? URL.createObjectURL(photo) : ""
        if (objectUrl) setPhotoSrc(objectUrl)
        // if we do not select the photo or we removed the photo
        if(photo === null) setPhotoSrc("")
        // we need to revoke the object url to prevent memory leaks
        return () => URL.revokeObjectURL(objectUrl)
    }, [photo])

    return(
        <div className="flex iteù-center gap-6">
            {photoSrc && (
                <Image
                    src={photoSrc}
                    width={100}
                    height={100}
                    alt="Author's photo"
                    className="aspect-square object-cover"
                />
            )}
            <div className="space-y-2.5">
                <div className="space-y-1">
                    <p className="text-3xl font-bold">
                        {firstName} {lastName}
                    </p>
                    <p className="font-medium">{jobTitle}</p>
                </div>
                <p className="text-xs text-gray-500">
                    {city}
                    {city && country ? ", " : ""}
                    {country}
                    {(city || country) && (phone || email ) ? " • " : ""}
                    {[phone , email].filter(Boolean).join(" • ")}
                </p>
            </div>
        </div>
)}



function SummarySection({resumeData} : ResumePreviewSectionProps){
    const {summary} = resumeData
    if(!summary) return null

    return(
        <>
        <hr className="border-2" />
        {/* break inside avoid : make sure that when we print teh resume it will not split teh contenet of the div ( ike print the p in teh page and the sulmary in an aother page) */}
        <div className="space-y-3 break-inside-avoid">
            <p className="text-lg font-semibold">Professional Profile</p>
            <div className="whitespace-pre-line text-sm">{summary}</div>
        </div>
        </>
)}