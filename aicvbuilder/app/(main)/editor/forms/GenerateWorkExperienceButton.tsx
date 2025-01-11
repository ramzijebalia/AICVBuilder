import LoadingButton from "@/components/LoadingButton";
import { useToast } from "@/hooks/use-toast";
import { GenerateWorkExperienceInput, generateWorkExperienceSchema, ResumeValues, WorkExperience } from "@/lib/validation";
import { WandSparklesIcon } from "lucide-react";
import { useState } from "react";
import {  generateWorkExperience } from "./actions";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogDescription, DialogHeader , DialogContent , DialogTitle} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

interface GenaerateWorkExperienceButtonProps {
    onWorkExperienceGenerated : (workExperience : WorkExperience) => void
}

export default function GenaerateWorkExperienceButton({onWorkExperienceGenerated} : GenaerateWorkExperienceButtonProps){
    const [showInputDialog, setShowInputDialog] = useState(false)
    

    return (
        <>
            <Button 
                variant="outline" 
                type="button"
                onClick={() => {setShowInputDialog(true)}}
                >
                <WandSparklesIcon className="size-4"/>
                Smart Fill (AI)
            </Button>
            <InputDialog 
                open={showInputDialog}
                onOpenChange={setShowInputDialog}
                onWorkExperienceGenerated={(workExperience) => { 
                    onWorkExperienceGenerated(workExperience)
                    setShowInputDialog(false)
                }}
            />
        </>
    )
}


interface InputDialogProps {
    open : boolean
    onOpenChange : (open : boolean) => void
    onWorkExperienceGenerated : (workExperience : WorkExperience) => void
}

function InputDialog({open, onOpenChange, onWorkExperienceGenerated }: InputDialogProps){
    
    const {toast} = useToast()

    const form = useForm<GenerateWorkExperienceInput>({
        resolver : zodResolver(generateWorkExperienceSchema),
        defaultValues : {
            description : "",
        }
    })

    async function onSubmit(input : GenerateWorkExperienceInput){
        try {
            const response = await generateWorkExperience(input)
            onWorkExperienceGenerated(response)
        } catch (error) {
            console.error(error)
            toast({
                variant : "destructive",
                description : "Something went wrong. please try again",
            })
        }
    }
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle> Generate Work Experience</DialogTitle>
                    <DialogDescription>
                        Describe this work experience and let the AI generate an optimized work experience entry for you.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                        <FormField
                            control={form.control}
                            name="description"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel> Description</FormLabel>
                                    <FormControl>
                                        <Textarea 
                                            {...field} 
                                            placeholder="E.g: from nov 2023 to jan 2025 I worked as a software engineer at google, tasks included..."
                                            autoFocus 
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <LoadingButton
                            type="submit"
                            loading={form.formState.isSubmitting}
                        >
                            Generate
                        </LoadingButton>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )


}