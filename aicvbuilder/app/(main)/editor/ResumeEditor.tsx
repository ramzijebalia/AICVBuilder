"use client";

import { useSearchParams } from "next/navigation";
import { steps } from "./steps";
import Breadcrumbs from "./Breadcrumbs";
import Footer from "./Footer";
import { useState } from "react";
import { ResumeValues } from "@/lib/validation";
import ResumePreviewSection from "./ResumePreviewSection";

export default function ResumeEditor() {

    const [resumeData , setResumeData] = useState<ResumeValues>({}) // we will use this to store the data of the resume

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
                <div className="absolute bottom-0 top-0 flex w-full">
                    <div className="w-full p-3 md:w-1/2 overflow-y-auto space-y-6" >
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
                    />
                </div>
            </main>
            <Footer currentStep={currentStep} setCurrentStep={setStep}/>
        </div>

)}