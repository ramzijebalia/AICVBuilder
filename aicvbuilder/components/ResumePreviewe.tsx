import useDimensions from "@/hooks/useDimensions"
import { cn } from "@/lib/utils"
import { ResumeValues } from "@/lib/validation"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import {formatDate} from "date-fns"
import { Badge } from "./ui/badge"
import { BorderStyles } from "@/app/(main)/editor/BorderStyleButton"
import type { File } from "buffer"

interface ResumePreviewProps {
    resumeData: ResumeValues
    contentRef?: React.Ref<HTMLDivElement>
    className?: string
}

export default function ResumePreview({resumeData, contentRef, className}: ResumePreviewProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const {width} = useDimensions(containerRef)
    
    return (
        <div className={cn("bg-white text-black h-fit w-full aspect-[210/297]", className)} ref={containerRef}>
            <div 
                className={cn("p-6", !width && "invisible")} 
                style={{zoom: (1/794) * width}} 
                ref={contentRef} 
                id="resumePreviewContent"
            >
                <PersonalInfoHeader resumeData={resumeData}/>
                <div className="space-y-4 mt-4">
                    <SummarySection resumeData={resumeData}/>
                    <WorkExperienceSection resumeData={resumeData}/>
                    <EducationSection resumeData={resumeData}/>
                    <SkillsSection resumeData={resumeData}/>
                </div>
            </div>
        </div>
    )
}

interface ResumePreviewSectionProps {
    resumeData: ResumeValues
}

function PersonalInfoHeader({resumeData}: ResumePreviewSectionProps) {
    const {photo, firstName, lastName, jobTitle, city, country, phone, email, colorHex, borderStyle} = resumeData
    const [photoSrc, setPhotoSrc] = useState(typeof photo === 'object' && photo !== null ? "" : photo)

    useEffect(() => {
        const objectUrl = typeof photo === 'object' && photo !== null ? URL.createObjectURL(photo) : ""
        if (objectUrl) setPhotoSrc(objectUrl)
        if(photo === null) setPhotoSrc("")
        return () => URL.revokeObjectURL(objectUrl)
    }, [photo])

    return (
        <div className="flex items-center gap-4">
            {photoSrc && (
                <Image
                    src={photoSrc}
                    width={80}
                    height={80}
                    alt="Profile photo"
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
            <div className="space-y-1">
                <h1 className="text-2xl font-bold" style={{color: colorHex}}>
                    {firstName} {lastName}
                </h1>
                <h2 className="text-sm font-medium" style={{color: colorHex}}>{jobTitle}</h2>
                <div className="flex flex-wrap gap-x-2 text-xs text-gray-600">
                    {city && <span>{city}{country && ", "}</span>}
                    {country && <span>{country}</span>}
                    {(phone || email) && (city || country) && <span>•</span>}
                    {phone && <span>{phone}</span>}
                    {email && <span>{email}</span>}
                </div>
            </div>
        </div>
    )
}

function SummarySection({resumeData}: ResumePreviewSectionProps) {
    const {summary, colorHex} = resumeData
    if(!summary) return null

    return (
        <div className="break-inside-avoid">
            <div className="flex items-center mb-2">
                <h3 className="text-base font-semibold mr-2" style={{color: colorHex}}>SUMMARY</h3>
                <div className="flex-grow border-t" style={{borderColor: colorHex}}></div>
            </div>
            <p className="text-xs text-justify whitespace-pre-line">{summary}</p>
        </div>
    )
}

function WorkExperienceSection({resumeData}: ResumePreviewSectionProps) {
    const {workExperiences, colorHex} = resumeData
    const workExperiencesNotEmpty = workExperiences?.filter(
        (exp) => Object.values(exp).filter(Boolean).length > 0
    )

    if(!workExperiencesNotEmpty?.length) return null

    return (
        <div className="break-inside-avoid">
            <div className="flex items-center mb-2">
                <h3 className="text-base font-semibold mr-2" style={{color: colorHex}}>EXPERIENCE</h3>
                <div className="flex-grow border-t" style={{borderColor: colorHex}}></div>
            </div>
            <div className="space-y-3">
                {workExperiencesNotEmpty.map((exp, index) => (
                    <div key={index} className="break-inside-avoid">
                        <div className="flex justify-between items-baseline">
                            <h4 className="text-sm font-semibold">{exp.position}</h4>
                            {exp.startDate && (
                                <span className="text-xs" style={{color: colorHex}}>
                                    {formatDate(exp.startDate, "MM/yyyy")} -{" "}
                                    {exp.endDate ? formatDate(exp.endDate, "MM/yyyy") : "Present"}
                                </span>
                            )}
                        </div>
                        <p className="text-xs font-medium mb-1">{exp.company}</p>
                        <p className="text-xs whitespace-pre-line">{exp.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

function EducationSection({resumeData}: ResumePreviewSectionProps) {
    const {educations, colorHex} = resumeData
    const educationsNotEmpty = educations?.filter(
        (edu) => Object.values(edu).filter(Boolean).length > 0
    )

    if(!educationsNotEmpty?.length) return null

    return (
        <div className="break-inside-avoid">
            <div className="flex items-center mb-2">
                <h3 className="text-base font-semibold mr-2" style={{color: colorHex}}>EDUCATION</h3>
                <div className="flex-grow border-t" style={{borderColor: colorHex}}></div>
            </div>
            <div className="space-y-3">
                {educationsNotEmpty.map((edu, index) => (
                    <div key={index} className="break-inside-avoid">
                        <div className="flex justify-between items-baseline">
                            <h4 className="text-sm font-semibold">{edu.degree}</h4>
                            {edu.startDate && (
                                <span className="text-xs" style={{color: colorHex}}>
                                    {formatDate(edu.startDate, "MM/yyyy")}{edu.endDate ? ` - ${formatDate(edu.endDate, "MM/yyyy")}` : ""}
                                </span>
                            )}
                        </div>
                        <p className="text-xs font-medium">{edu.school}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

function SkillsSection({resumeData}: ResumePreviewSectionProps) {
    const {skills, colorHex, borderStyle} = resumeData
    if(!skills?.length) return null

    return (
        <div className="break-inside-avoid">
            <div className="flex items-center mb-2">
                <h3 className="text-base font-semibold mr-2" style={{color: colorHex}}>SKILLS</h3>
                <div className="flex-grow border-t" style={{borderColor: colorHex}}></div>
            </div>
            <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                    <Badge 
                        key={index} 
                        className="text-white rounded-md"
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
    )
}