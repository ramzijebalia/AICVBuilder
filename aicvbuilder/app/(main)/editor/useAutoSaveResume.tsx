// this hook will be used only by the resume editor

import { useToast } from "@/hooks/use-toast";
import useDebounce from "@/hooks/useDebounce";
import { ResumeValues } from "@/lib/validation";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { saveResume } from "./actions";
import { Button } from "@/components/ui/button";
import { fileReplacer } from "@/lib/utils";


export  default function useAutoSaveResume(resumeData : ResumeValues) {
    const searchParams = useSearchParams()
    const  {toast} = useToast()

    const debouncedResumeData = useDebounce(resumeData, 1500)
    const [resumeId, setResumeId] = useState(resumeData.id)

    // only we trigger auto save if we have changed anything
    const [lastSavedData, setLastSavedData] = useState(
        // craete a deep copy of the resume data
        structuredClone(resumeData)
    )

    const [isSaving, setIsSaving] = useState(false)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        setIsError(false) // reset the error state because afetr we make a new chnages , we wanna try saving again maybe the errors are resolved
    }, [debouncedResumeData])

    useEffect(() => {
        async function save() {
            try {
                setIsSaving(true)
                setIsError(false)

                const newData = structuredClone(debouncedResumeData)

                const updatedResume = await saveResume({
                    ...newData,
                    ...(JSON.stringify(lastSavedData.photo, fileReplacer) === JSON.stringify(newData.photo , fileReplacer) && {photo : undefined}), // if the photo is the same we dont need to send it again
                    id : resumeId

                })
                setResumeId(updatedResume.id)
                setLastSavedData(newData)
                
                // add the resume id to teh path so if we refresh we still in the same resume page and w ecan update on it 
                if(searchParams.get("resumeId") !== updatedResume.id){
                    const  newSearchParams = new URLSearchParams(searchParams)
                    newSearchParams.set("resumeId", updatedResume.id)
                    window.history.replaceState(
                        null , "", `?${newSearchParams.toString()}`)
                }
            } catch (error) {
                setIsError(true)
                console.error("Failed to save resume", error)
                const {dismiss} = toast({
                    variant : "destructive", //make it red
                    description : (
                        <div className="space-y-3">
                            <p>Could not save the changes.</p>
                            <Button
                                variant="secondary"
                                onClick={() => {
                                    dismiss() // close the toast
                                    save() // try saving again
                                }}
                            >
                                Retry
                            </Button>
                        </div>
                    )
                })
            } finally {
                setIsSaving(false)
            }
        }

        console.log("debouncedResumeData", JSON.stringify(debouncedResumeData))
        console.log("lastSavedData", JSON.stringify(lastSavedData))

        // if they are diffrent we know we have unsaved data
        const hasUnsavedChanges = JSON.stringify(debouncedResumeData , fileReplacer) !== JSON.stringify(lastSavedData , fileReplacer)

        if(hasUnsavedChanges && debouncedResumeData && !isSaving && !isError){
            save()
        }

    }, [debouncedResumeData , isSaving , lastSavedData, isError, resumeId , searchParams , toast])

    return {
        isSaving ,
        hasUnsavedChanges : JSON.stringify(resumeData) !== JSON.stringify(lastSavedData)
    }
}