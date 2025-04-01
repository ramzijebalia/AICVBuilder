"use client";

import { Button } from "@/components/ui/button";
import usePreminumModal from "@/hooks/usePreminumModal"
import { PlusSquare } from "lucide-react";
import Link from "next/link";


interface CreateResumeButtonProps {
    // to compare the number of teh resumes in teh page with teh limit of the nulber of teh resumes we can craete using teh preminum subbscription
    canCreate : boolean
}
export default function CreateResumeButton( {canCreate} : CreateResumeButtonProps) {
    const premiumModal = usePreminumModal()

    if(canCreate){
        return (
            <Button asChild className="mx-auto flex w-fit gap-2">  
            {/* asChild :  tell shadcn to not render a button , instead it render a link that look like a button*/}
            <Link href="/editor">
                <PlusSquare className="size-5" />
                New Resume
            </Link>
        </Button>
        )
    }

    return (
        <Button 
            onClick={() => premiumModal.setOpen(true)}
            className="mx-auto flex w-fit gap-2"
        >
            <PlusSquare className="size-5" />
            New Resume
        </Button>
    )
}