"use client";

import { useSearchParams } from "next/navigation";
import { steps } from "./steps";
import Breadcrumbs from "./Breadcrumbs";
import Footer from "./Footer";
import { useState } from "react";
import { ResumeValues } from "@/lib/validation";
import ResumePreviewSection from "./ResumePreviewSection";
import { cn, mapToResumeVlues } from "@/lib/utils";
import useAutoSaveResume from "./useAutoSaveResume";
import useUnloadWarning from "@/hooks/useUnloadWarning";
import { ResumeServerData } from "@/lib/types";

interface ResumeEditorProps {
    resumeToEdit: ResumeServerData | null;
}

export default function ResumeEditor( {resumeToEdit} : ResumeEditorProps) {

    const [resumeData , setResumeData] = useState<ResumeValues>(
        resumeToEdit ? mapToResumeVlues(resumeToEdit) : {} ,
    ) // we will use this to store the data of the resume

    const [showSmallScResumePreview , setShowSmallScResumePreview] = useState(false) // we will use this to show the resume in the small screens

    const {isSaving , hasUnsavedChanges} = useAutoSaveResume(resumeData) // we will use this to save the data of the resume

    useUnloadWarning(hasUnsavedChanges) // we will use this hook in case the user refresh teh page befor the changes are saved ( defor the delay mentioned in the useDebounce hook 250 ms)

    const searchParams = useSearchParams() //
    // from teh search params we w can get the currently active step ( form)
    const currentStep = searchParams.get("step") || steps[0].key

    function setStep(key : string){
        const newSearchParams = new URLSearchParams(searchParams)
        newSearchParams.set("step", key)
        window.history.pushState(null, "", `?${newSearchParams.toString()}`)
    }

    const FormComponent = steps.find(
        step => step.key === currentStep
    )?.component 


    return(
        <div className="flex grow flex-col"> 
            <header className="space-y-1.5 border-b px-3 py-5 text-center">  
                <h1 className="text-2xl font-bold"> Design your Resume</h1>
                <p className="text-sm text-muted-foreground">
                    Follow the steps below to create your resume. 
                    Your progress will be saved automatically.
                </p>
            </header>
            <main className="relative grow">
                <div className="absolute bottom-0 top-0 flex w-full"> {/* in teh small screen it need to be width full and in the big and middle md1/2 */}
                    <div className={cn("w-full p-3 md:w-1/2 overflow-y-auto space-y-6 md:block",
                        showSmallScResumePreview && "hidden" // we will hide the left div when we click the button ( teh showSmallScResumePreview is true)
                    )} >
                         <Breadcrumbs currentStep={currentStep} setCurrentStep={setStep}/>
                         {FormComponent && <FormComponent 
                            resumeData={resumeData}
                            setResumeData={setResumeData}
                        />}
                    </div>
                    <div className="grow md:border-r"/>
                    <ResumePreviewSection 
                        resumeData={resumeData}
                        setResumeData={setResumeData}
                        className={cn(showSmallScResumePreview && "flex")} // we will show the right div when we click the button ( teh showSmallScResumePreview is true)
                    />
                </div>
            </main>
            <Footer 
                currentStep={currentStep} 
                setCurrentStep={setStep} 
                showSmallScResumePreview={showSmallScResumePreview} 
                setShowSmallScResumePreview={setShowSmallScResumePreview}
                isSaving={isSaving}
            />
        </div>

)}