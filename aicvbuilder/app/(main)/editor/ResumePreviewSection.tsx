import ResumePreview from "@/components/ResumePreviewe"
import { ResumeValues } from "@/lib/validation"
import ColorPicker from "./ColorPicker"
import BorderStyleButton from "./BorderStyleButton"
import { cn } from "@/lib/utils"

interface ResumePreviewSectionProps{
    resumeData : ResumeValues
    // later we will add buttons to change the boerder radior and the primary color => we wil be abel to update the resume
    setResumeData : (data : ResumeValues) => void
    className? : string
}

export default function ResumePreviewSection({resumeData , setResumeData , className}: ResumePreviewSectionProps){
    return (
        <div className={cn(" group relative hidden md:w-1/2 md:flex w-full" , className)} >
            <div className="opacity-50 group-hover:opacity-100 absolute left-1y top-1 flex gap-3 flex-none lg: left-3 lg:top-3"> 
                <ColorPicker 
                    color={resumeData.colorHex} 
                    onChange={(color) => setResumeData({...resumeData , colorHex: color.hex})}
                />
                <BorderStyleButton 
                    borderStyle={resumeData.borderStyle} 
                    onChange={(borderStyle) => setResumeData({...resumeData , borderStyle})}
                />
            </div>
            <div className="flex w-full justify-center overflow-y-auto bg-secondary p-3"> 
                <ResumePreview 
                    resumeData={resumeData}
                    className="max-w-2xl shadow-md"
                />
            </div>
        </div>
    )
}