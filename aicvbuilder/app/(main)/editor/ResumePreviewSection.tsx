import ResumePreview from "@/components/ResumePreviewe"
import { ResumeValues } from "@/lib/validation"

interface ResumePreviewSectionProps{
    resumeData : ResumeValues
    // later we will add buttons to change the boerder radior and the primary color => we wil be abel to update the resume
    setResumeData : (data : ResumeValues) => void
}

export default function ResumePreviewSection({resumeData , setResumeData}: ResumePreviewSectionProps){
    return (
        <div className="hidden w-1/2 md:flex" >
            <div className="flex w-full justify-center overflow-y-auto bg-secondary p-3"> 
                <ResumePreview 
                    resumeData={resumeData}
                    clasName="max-w-2xl shadow-md" // overwrite the style ofthe right div in the resumepreviex definition
                />
            </div>
        </div>
)}