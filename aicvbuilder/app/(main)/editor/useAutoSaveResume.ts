// this hook will be used only by the resume editor

import useDebounce from "@/hooks/useDebounce";
import { ResumeValues } from "@/lib/validation";
import { useEffect, useState } from "react";


export  default function useAutoSaveResume(resumeData : ResumeValues) {
    const debouncedResumeData = useDebounce(resumeData, 1500)

    // only we trigger auto save if we have changed anything
    const [lastSavedData, setLastSavedData] = useState(
        // craete a deep copy of the resume data
        structuredClone(resumeData)
    )

    const [isSaving, setIsSaving] = useState(false)

    useEffect(() => {
        async function save() {
            setIsSaving(true)
            await new Promise(resolve => setTimeout(resolve, 1500))
            setLastSavedData(structuredClone(debouncedResumeData))
            setIsSaving(false)
        }

        // if they are diffrent we know we have unsaved data
        const hasUnsavedChanges = JSON.stringify(debouncedResumeData) !== JSON.stringify(lastSavedData)

        if(hasUnsavedChanges && debouncedResumeData && !isSaving){
            save()
        }

    }, [debouncedResumeData , isSaving , lastSavedData])

    return {
        isSaving ,
        hasUnsavedChanges : JSON.stringify(resumeData) !== JSON.stringify(lastSavedData)
    }
}