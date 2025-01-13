"use client";

import ResumePreview from "@/components/ResumePreviewe";
import { ResumeServerData } from "@/lib/types";
import { mapToResumeVlues } from "@/lib/utils";
import { formatDate } from "date-fns";
import Link from "next/link";

interface ResumeItemProps {
    resume : ResumeServerData
}

export default function ResumeItem({resume} : ResumeItemProps) {
    const wasUpdated = resume.updatedAt !== resume.createdAt

    return (
        <div className="group border rounded-lg border-transparent hover:border-border transition-colors bg-secondary p-3">
            <div className="space-y-3">
                <Link 
                    href={`/editor?resumeId=${resume.id}`}
                    className="inline-block w-full text-center"
                >
                    {/* line-clamp-1 : does not go into multiple lines , insteda oit will add a ... at teh end  */}
                    <p className="font-semibold line-clamp-1"> {resume.title || "No Title"}</p>
                    {resume.description && (
                        <p className="line-clamp-2 text-sm">{resume.description}</p>
                    )}
                    <p className="text-xs text-muted-foreground">
                        {wasUpdated ? "Updated" : "Created"} on {" "} 
                        {formatDate(resume.updatedAt, "MMM dd, yyyy h:mm a")}
                    </p>
                </Link>

                <Link 
                    href={`/editor?resumeId=${resume.id}`}
                    className="relative inline-block w-full"
                >
                    <ResumePreview 
                        resumeData={mapToResumeVlues(resume)} 
                        clasName="overflow-hidden shadow-sm transition-shadow group-hover:shadow-lg"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent"/>
                </Link>

            </div>
        </div>
    )
}