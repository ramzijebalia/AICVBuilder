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

type TemplateStyle = {
    container: string;
    header: string;
    section: string;
    sectionTitle: string;
    sectionDivider: string;
    sectionTitleWithLine?: string;
    sectionTitleText?: string;
    sectionTitleLine?: string;
}

const templateStyles: Record<string, TemplateStyle> = {
    modern: {
        container: "bg-white text-black",
        header: "flex items-center gap-4",
        section: "space-y-4 mt-4",
        sectionTitle: "text-base font-semibold mr-2",
        sectionDivider: "flex-grow border-t",
    },
    'two-column': {
        container: "bg-white text-black",
        header: "space-y-3",
        section: "space-y-4",
        sectionTitle: "text-base font-semibold mb-2",
        sectionDivider: "hidden",
        sectionTitleWithLine: "flex items-center gap-2 mb-2",
        sectionTitleText: "text-base font-semibold",
        sectionTitleLine: "flex-grow border-t",
    }
}

function CertificatesSection({resumeData, template}: ResumePreviewSectionProps) {
    const {certificates, colorHex} = resumeData
    const styles = templateStyles[template]
    const certificatesNotEmpty = certificates?.filter(
        (cert) => Object.values(cert).filter(Boolean).length > 0
    )

    if(!certificatesNotEmpty?.length) return null

    return (
        <div className="break-inside-avoid">
            <div className={template === 'two-column' ? styles.sectionTitleWithLine : "flex items-center mb-2"}>
                <h3 className={template === 'two-column' ? styles.sectionTitleText : styles.sectionTitle} style={{color: colorHex}}>CERTIFICATES</h3>
                <div className={template === 'two-column' ? styles.sectionTitleLine : styles.sectionDivider} style={{borderColor: colorHex}}></div>
            </div>
            <div className="space-y-3">
                {certificatesNotEmpty.map((cert, index) => (
                    <div key={index} className="break-inside-avoid">
                        <div className="flex justify-between items-baseline">
                            <h4 className="text-sm font-semibold">{cert.name}</h4>
                            {cert.date && (
                                <span className="text-xs" style={{color: colorHex}}>
                                    {formatDate(cert.date, "MM/yyyy")}
                                </span>
                            )}
                        </div>
                        <p className="text-xs font-medium">{cert.issuer}</p>
                        {cert.url && (
                            <a href={cert.url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">
                                View Certificate
                            </a>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

function LanguagesSection({resumeData, template}: ResumePreviewSectionProps) {
    const {languages, colorHex} = resumeData
    const styles = templateStyles[template]
    const languagesNotEmpty = languages?.filter(
        (lang) => Object.values(lang).filter(Boolean).length > 0
    )

    if(!languagesNotEmpty?.length) return null

    return (
        <div className="break-inside-avoid">
            <div className={template === 'two-column' ? styles.sectionTitleWithLine : "flex items-center mb-2"}>
                <h3 className={template === 'two-column' ? styles.sectionTitleText : styles.sectionTitle} style={{color: colorHex}}>LANGUAGES</h3>
                <div className={template === 'two-column' ? styles.sectionTitleLine : styles.sectionDivider} style={{borderColor: colorHex}}></div>
            </div>
            <div className={template === 'two-column' ? "space-y-1" : "grid grid-cols-3 gap-2"}>
                {languagesNotEmpty.map((lang, index) => (
                    <div key={index} className={template === 'two-column' ? "flex justify-between items-center" : "flex flex-col"}>
                        <span className="text-sm font-medium">{lang.name}</span>
                        <span className="text-xs" style={{color: colorHex}}>{lang.level}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

function SkillsAndInterestsSection({resumeData, template}: ResumePreviewSectionProps) {
    const {skills = [], interests = [], colorHex} = resumeData
    const styles = templateStyles[template]
    const hasSkills = skills.length > 0
    const hasInterests = interests.length > 0

    if(!hasSkills && !hasInterests) return null

    if (template === 'two-column') {
        return (
            <div className="break-inside-avoid space-y-4">
                {/* Skills Section */}
                {hasSkills && (
                    <div>
                        <div className={styles.sectionTitleWithLine}>
                            <h3 className={styles.sectionTitleText} style={{color: colorHex}}>SKILLS</h3>
                            <div className={styles.sectionTitleLine} style={{borderColor: colorHex}}></div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill, index) => (
                                <span 
                                    key={index} 
                                    className="text-sm text-black"
                                >
                                    {skill}{index < skills.length - 1 ? " •" : ""}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Interests Section */}
                {hasInterests && (
                    <div>
                        <div className={styles.sectionTitleWithLine}>
                            <h3 className={styles.sectionTitleText} style={{color: colorHex}}>INTERESTS</h3>
                            <div className={styles.sectionTitleLine} style={{borderColor: colorHex}}></div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {interests.map((interest, index) => (
                                <span 
                                    key={index} 
                                    className="text-sm text-black"
                                >
                                    {interest}{index < interests.length - 1 ? " •" : ""}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className="break-inside-avoid">
            <div className="grid grid-cols-2 gap-4">
                {/* Skills Column */}
                <div>
                    {hasSkills && (
                        <>
                            <div className="flex items-center mb-2">
                                <h3 className={styles.sectionTitle} style={{color: colorHex}}>SKILLS</h3>
                                <div className={styles.sectionDivider} style={{borderColor: colorHex}}></div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill, index) => (
                                    <span 
                                        key={index} 
                                        className="text-sm text-black"
                                    >
                                        {skill}{index < skills.length - 1 ? " •" : ""}
                                    </span>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* Interests Column */}
                <div>
                    {hasInterests && (
                        <>
                            <div className="flex items-center mb-2">
                                <h3 className={styles.sectionTitle} style={{color: colorHex}}>INTERESTS</h3>
                                <div className={styles.sectionDivider} style={{borderColor: colorHex}}></div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {interests.map((interest, index) => (
                                    <span 
                                        key={index} 
                                        className="text-sm text-black"
                                    >
                                        {interest}{index < interests.length - 1 ? " •" : ""}
                                    </span>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default function ResumePreview({resumeData, contentRef, className}: ResumePreviewProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const {width} = useDimensions(containerRef)
    const template = resumeData.template || 'modern'
    const styles = templateStyles[template]
    
    return (
        <div className={cn(styles.container, "h-fit w-full aspect-[210/297]", className)} ref={containerRef}>
            <div 
                className={cn("p-6", !width && "invisible")} 
                style={{zoom: (1/794) * width}} 
                ref={contentRef} 
                id="resumePreviewContent"
            >
                {template === 'two-column' ? (
                    <div className="flex gap-6">
                        {/* Left Column */}
                        <div className="w-1/3 space-y-4">
                            <PersonalInfoHeader resumeData={resumeData} template={template}/>
                            <LanguagesSection resumeData={resumeData} template={template}/>
                            <SkillsAndInterestsSection resumeData={resumeData} template={template}/>
                        </div>
                        
                        {/* Right Column */}
                        <div className="w-2/3 space-y-4">
                            <SummarySection resumeData={resumeData} template={template}/>
                            <WorkExperienceSection resumeData={resumeData} template={template}/>
                            <EducationSection resumeData={resumeData} template={template}/>
                            <CertificatesSection resumeData={resumeData} template={template}/>
                        </div>
                    </div>
                ) : (
                    <>
                        <PersonalInfoHeader resumeData={resumeData} template={template}/>
                        <div className={styles.section}>
                            <SummarySection resumeData={resumeData} template={template}/>
                            <WorkExperienceSection resumeData={resumeData} template={template}/>
                            <EducationSection resumeData={resumeData} template={template}/>
                            <CertificatesSection resumeData={resumeData} template={template}/>
                            <LanguagesSection resumeData={resumeData} template={template}/>
                            <SkillsAndInterestsSection resumeData={resumeData} template={template}/>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

interface ResumePreviewSectionProps {
    resumeData: ResumeValues
    template: keyof typeof templateStyles
}

function PersonalInfoHeader({resumeData, template}: ResumePreviewSectionProps) {
    const {photo, firstName, lastName, jobTitle, city, country, phone, email, colorHex, borderStyle} = resumeData
    const [photoSrc, setPhotoSrc] = useState(typeof photo === 'object' && photo !== null ? "" : photo)
    const styles = templateStyles[template]

    useEffect(() => {
        const objectUrl = typeof photo === 'object' && photo !== null ? URL.createObjectURL(photo) : ""
        if (objectUrl) setPhotoSrc(objectUrl)
        if(photo === null) setPhotoSrc("")
        return () => URL.revokeObjectURL(objectUrl)
    }, [photo])

    return (
        <div className={styles.header}>
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

function SummarySection({resumeData, template}: ResumePreviewSectionProps) {
    const {summary, colorHex} = resumeData
    const styles = templateStyles[template]
    if(!summary) return null

    return (
        <div className="break-inside-avoid">
            <div className={template === 'two-column' ? styles.sectionTitleWithLine : "flex items-center mb-2"}>
                <h3 className={template === 'two-column' ? styles.sectionTitleText : styles.sectionTitle} style={{color: colorHex}}>SUMMARY</h3>
                <div className={template === 'two-column' ? styles.sectionTitleLine : styles.sectionDivider} style={{borderColor: colorHex}}></div>
            </div>
            <p className="text-xs text-justify whitespace-pre-line">{summary}</p>
        </div>
    )
}

function WorkExperienceSection({resumeData, template}: ResumePreviewSectionProps) {
    const {workExperiences, colorHex} = resumeData
    const styles = templateStyles[template]
    const workExperiencesNotEmpty = workExperiences?.filter(
        (exp) => Object.values(exp).filter(Boolean).length > 0
    )

    if(!workExperiencesNotEmpty?.length) return null

    return (
        <div className="break-inside-avoid">
            <div className={template === 'two-column' ? styles.sectionTitleWithLine : "flex items-center mb-2"}>
                <h3 className={template === 'two-column' ? styles.sectionTitleText : styles.sectionTitle} style={{color: colorHex}}>EXPERIENCE</h3>
                <div className={template === 'two-column' ? styles.sectionTitleLine : styles.sectionDivider} style={{borderColor: colorHex}}></div>
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

function EducationSection({resumeData, template}: ResumePreviewSectionProps) {
    const {educations, colorHex} = resumeData
    const styles = templateStyles[template]
    const educationsNotEmpty = educations?.filter(
        (edu) => Object.values(edu).filter(Boolean).length > 0
    )

    if(!educationsNotEmpty?.length) return null

    return (
        <div className="break-inside-avoid">
            <div className={template === 'two-column' ? styles.sectionTitleWithLine : "flex items-center mb-2"}>
                <h3 className={template === 'two-column' ? styles.sectionTitleText : styles.sectionTitle} style={{color: colorHex}}>EDUCATION</h3>
                <div className={template === 'two-column' ? styles.sectionTitleLine : styles.sectionDivider} style={{borderColor: colorHex}}></div>
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