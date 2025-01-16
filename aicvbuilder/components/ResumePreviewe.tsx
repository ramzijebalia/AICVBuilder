import useDimensions from "@/hooks/useDimensions"
import { cn } from "@/lib/utils"
import { ResumeValues } from "@/lib/validation"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import {formatDate} from "date-fns"
import { Badge } from "./ui/badge"
import { BorderStyles } from "@/app/(main)/editor/BorderStyleButton"

interface ResumePreviewProps {
    resumeData : ResumeValues // contain all teh data from our form fields
    contentRef? : React.Ref<HTMLDivElement>
    clasName? : string


}

export default function ResumePreview({resumeData, contentRef , clasName}: ResumePreviewProps){

    const containerRef = useRef<HTMLDivElement>(null)
    const {width} = useDimensions(containerRef)
    
    
    
    return (
        <div className={cn("bg-white text-black h-fit w-full aspect-[210/297]" , clasName)} ref={containerRef}>
            {/* we use  the cn ( from shadcn ) to ensure that the clasname overwrite the already existing class */}
            {/* teh background of teh sheet paper is white even in teh dark mode , the text is always black , and the size of teh paper A4 is 21 cm and 29.7 cm*/}

            <div className={cn("space-y-6 p-6" , !width && "invisible")} style={{zoom: (1/794) * width}} ref={contentRef} id="resumePreviewContent">
                {/* 794 is the number of pixels form 210 mm */}
                <PersonalInfoHeader resumeData={resumeData}/>
                <SummarySection resumeData={resumeData}/>
                <WorkExperienceSection resumeData={resumeData}/>
                <EducationSection resumeData={resumeData}/>
                <SkillsSection resumeData={resumeData}/>
            </div>
        </div>

)}


interface ResumePreviewSectionProps {
    resumeData : ResumeValues
}

function PersonalInfoHeader({resumeData} : ResumePreviewSectionProps){
    const {photo , firstName , lastName , jobTitle , city , country , phone , email , colorHex , borderStyle} = resumeData
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
        <div className="flex item-center gap-6">
            {photoSrc && (
                <Image
                    src={photoSrc}
                    width={100}
                    height={100}
                    alt="Author's photo"
                    className="aspect-square object-cover"
                    style={{
                        borderRadius: 
                            borderStyle === BorderStyles.SQUARE 
                                ? "0px"
                                : borderStyle === BorderStyles.CIRCLE
                                ? "9999px"
                                : "10%"
                    }}
                />
            )}
            <div className="space-y-2.5">
                <div className="space-y-1">
                    <p className="text-3xl font-bold"
                        /*to cuqtomize a css value from a js variable we can use the style prop*/
                        style={{color: colorHex }}
                    >
                        {firstName} {lastName}
                    </p>
                    <p className="font-medium" style={{color: colorHex }}>{jobTitle}</p>
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
    const {summary , colorHex} = resumeData
    if(!summary) return null

    return(
        <>
        <hr className="border-2" style={{borderColor: colorHex }} />
        {/* break inside avoid : make sure that when we print teh resume it will not split teh contenet of the div ( ike print the p in teh page and the sulmary in an aother page) */}
        <div className="space-y-3 break-inside-avoid">
            <p className="text-lg font-semibold" style={{color: colorHex }}>Professional Profile</p>
            <div className="whitespace-pre-line text-sm">{summary}</div>
        </div>
        </>
)}


function WorkExperienceSection({resumeData} : ResumePreviewSectionProps){
    const {workExperiences , colorHex} = resumeData
    const workExperiencesNotEmpty = workExperiences?.filter(
        (exp) => Object.values(exp).filter(Boolean).length > 0
    )

    if(!workExperiencesNotEmpty?.length) return null


    return(
        <>
            <hr className="border-2" style={{borderColor: colorHex }}/>
            <div className="space-y-3">
                <p className="text-lg font-semibold" style={{color: colorHex }}>Work Experience</p>
                {workExperiencesNotEmpty.map((exp , index) => (
                    <div key={index} className="break-inside-avoid space-y-1 m-3">
                        <div className="flex items-center justify-between text-sm font-semibold" style={{color: colorHex }}>
                            <span>{exp.position}</span>
                            {exp.startDate &&  (
                                <span>
                                    {formatDate(exp.startDate, "MM/yyyy")} -{" "}
                                    {exp.endDate ? formatDate(exp.endDate, "MM/yyyy") : "Present"}
                                </span>
                            )}
                        </div>
                        <p className="text-xs font-semibold">{exp.company}</p>
                        <div className="whitespace-pre-line text-sm">
                            {exp.description}
                        </div>
                    </div>
                ))}
            </div>
        </>
        
)}

function EducationSection({resumeData} : ResumePreviewSectionProps){
    const {educations, colorHex} = resumeData
    const educationsNotEmpty = educations?.filter(
        (edu) => Object.values(edu).filter(Boolean).length > 0
    )

    if(!educationsNotEmpty?.length) return null


    return(
        <>
            <hr className="border-2" style={{borderColor: colorHex }} />
            <div className="space-y-3">
                <p className="text-lg font-semibold" style={{color: colorHex }}>Education</p>
                {educationsNotEmpty.map((edu , index) => (
                    <div key={index} className="break-inside-avoid space-y-1 m-3">
                        <div className="flex items-center justify-between text-sm font-semibold" >
                            <span>{edu.degree}</span>
                            {edu.startDate &&  (
                                <span>
                                    {edu.startDate &&
                                    `${formatDate(edu.startDate , "MM/yyyy")} ${edu.endDate ? `- ${formatDate(edu.endDate , "MM/yyyy")}`: ""}`
                                    
                                    }
                                </span>
                            )}
                        </div>
                        <p className="text-xs font-semibold">{edu.school}</p>
                    </div>
                ))}
            </div>
        </>
        
)}



function SkillsSection({resumeData} : ResumePreviewSectionProps){
    const {skills , colorHex , borderStyle} = resumeData
    if(!skills?.length) return null


    return(
        <>
            <hr className="border-2" style={{borderColor: colorHex }} />
            <div className=" break-inside-avoid space-y-3">
                <p className="text-lg font-semibold" style={{color: colorHex }}>Skills</p>
                <div className="flex break-inside-avoid flex-wrap gap-2">
                    {/* the empty skils ( , ,) are already filtred , we handled it in our form */}
                    {/* by defaut the badge change the color by chnaging teh theme , dark , light , for that we hardcoded the color in the className */}
                    {skills.map((skill , index) => (
                        <Badge key={index} className="bg-black hover:bg-black text-white rounded-md"
                            style={{
                                backgroundColor: colorHex,
                                borderRadius: 
                                    borderStyle === BorderStyles.SQUARE 
                                        ? "0px"
                                        : borderStyle === BorderStyles.CIRCLE
                                        ? "9999px"
                                        : "8px"
                            }}
                        >
                            {skill}
                        </Badge>
                    ))}
                </div>
                

            </div>
        </>
        
)}