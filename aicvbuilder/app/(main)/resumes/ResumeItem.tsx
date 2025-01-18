// recat to print docs ; https://www.npmjs.com/package/react-to-print
"use client";

import ResumePreview from "@/components/ResumePreviewe";
import { Button } from "@/components/ui/button";
import { DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { ResumeServerData } from "@/lib/types";
import { mapToResumeVlues } from "@/lib/utils";
import { DropdownMenu, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { formatDate } from "date-fns";
import { MoreVertical, Printer, Trash2 } from "lucide-react";
import Link from "next/link";
import { startTransition, useRef, useState, useTransition } from "react";
import { deleteResume } from "./actions";
import { Dialog,DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import LoadingButton from "@/components/LoadingButton";
import  {useReactToPrint} from "react-to-print"

interface ResumeItemProps {
    resume : ResumeServerData
}

export default function ResumeItem({resume} : ResumeItemProps) {
    const wasUpdated = resume.updatedAt !== resume.createdAt

    const contentRef = useRef<HTMLDivElement>(null)
    const reactToPrintFn = useReactToPrint({
        contentRef , // the ref to the div we wanna print
        documentTitle : resume.title || "Resume",
    })

    return (
        <div className="group relative border rounded-lg border-transparent hover:border-border transition-colors bg-secondary p-3">
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
                        contentRef={contentRef}
                        clasName="overflow-hidden shadow-sm transition-shadow group-hover:shadow-lg"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white to-transparent"/>
                </Link>

            </div>
            <MoreMenu resumeId={resume.id}  onPrintClick={reactToPrintFn}/>
        </div>
    )
}

interface MoreMenuProps {
    resumeId : string 
    onPrintClick : () => void
}
function MoreMenu({resumeId , onPrintClick} : MoreMenuProps){
    // dop down menu ;; shadcn docs : https://ui.shadcn.com/docs/components/dropdown

    // we will use his state to to show a modal where th user need to confirm the deletion of the resume
    const [showDeleteConfirmation , setShowDeleteConfirmation] = useState(false)

    return (
        <>
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-0.5 top-0.5 opacity-0 transition-opacity group-hover:opacity-100 cursor-pointer border border-gray-300 rounded-full p-2 hover:bg-gray-100"
                >
                    <MoreVertical className="w-4 h-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="bg-white border border-gray-200 rounded-md shadow-lg p-2 w-48"
            >
                <DropdownMenuItem
                    className="flex items-center gap-2 px-4 py-2 rounded-md cursor-pointer hover:bg-gray-100 transition-all"
                    onClick={() => setShowDeleteConfirmation(true)}
                >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                </DropdownMenuItem>
                <hr className="my-1 border-gray-200" />
                <DropdownMenuItem
                    className="flex items-center gap-2 px-4 py-2 rounded-md cursor-pointer hover:bg-gray-100 transition-all"
                    onClick={onPrintClick}
                >
                    <Printer className="w-4 h-4" />
                    <span>Print</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
            <DeleteConfirmationDialog 
                resumeId={resumeId}
                open={showDeleteConfirmation}
                onOpenChange={setShowDeleteConfirmation}
            />
        </>
    )
}


interface DeleteConfirmationDialogProps {
    resumeId : string
    open : boolean
    onOpenChange : (open : boolean) => void
}
function DeleteConfirmationDialog({resumeId , open , onOpenChange} : DeleteConfirmationDialogProps){
    // we will use this function to delete the resume

    const {toast} = useToast()

    // when we call a server action like delete resume from a clinet compoennet
    // and we have validatepath which refresh  the page , we should wrap this into  a transition
    // because then this oending state will include this revalidate call , it will wiat until teh page will resfresh
    const [isPending , setIsPending] = useTransition()

    async function handleDelete(){
        startTransition( async() => {
            try {
                await deleteResume(resumeId)
                onOpenChange(false)
            } catch (error) {
                console.error(error)
                toast({
                    variant : "destructive",
                    description : "Something went wrong. please try again"
                })
            }
        })
    }

    return (
        <Dialog 
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle> Delete Resume ?</DialogTitle>
                    <DialogDescription>
                        This will permanently delete the resume. Are you sure you want to continue ?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <LoadingButton
                        variant="destructive"
                        onClick={handleDelete}
                        loading={isPending}
                    >
                        Delete
                    </LoadingButton>
                    <Button 
                        variant="secondary"
                        onClick={() => {onOpenChange(false)}}>
                        Cancel
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}