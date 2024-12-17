import useDimensions from "@/hooks/useDimensions"
import { cn } from "@/lib/utils"
import { ResumeValues } from "@/lib/validation"
import { useRef } from "react"

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
                <h1 className="p-6 text-3xl font-bold">
                    this text should change with the size of teh conatainer div
                </h1>
            </div>
        </div>

)}