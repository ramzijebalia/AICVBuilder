//usefieldarray docs ; https://react-hook-form.com/docs/usefieldarray

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { EditorFormProps } from "@/lib/types";
import { summarySchema, SummaryValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function SummaryForm({resumeData , setResumeData}: EditorFormProps){
    const form = useForm<SummaryValues>({
        resolver: zodResolver(summarySchema),
        defaultValues: {
            summary : resumeData.summary || ''
        }
    })

    useEffect(() => {
        const {unsubscribe} = form.watch( async (values) => { // this function will triger when the form values change
            // normally this is not necessary because validation ahppen when we subbmit the form
            // but our form is deffered ( we dont ahve a submit button  ) instead we always wanna past the latest input to the parrent page immediately
            // this is why we have this validation ligic by ourselfs
            const isValid = await form.trigger() 
            if(!isValid) return ;
            setResumeData({...resumeData , ...values})
        })
        return unsubscribe
    }, [form , resumeData , setResumeData])


    return(
        <div className="max-w-xl mx-auto space-y-6">
            <div className="space-y-1.5 text-center">
                <h2 className="text-2xl font-semibold">Professional Summary</h2>
                {/* here maybe we will ask the ai to genaerate one for us  */}
                <p className="text-sm text-muted-foreground">
                    Write a short introduction for your resume...
                </p>
            </div>
            <Form {...form}>
                <form className="space-y-3">
                <FormField 
                    control={form.control}
                    name="summary"
                    render={({field}) => (
                        <FormItem>
                            {/* sr-only screen reader only */}
                            <FormLabel className="sr-only">Professional Summary</FormLabel>
                            <FormControl>
                                <Textarea 
                                    {...field} 
                                    placeholder="A brief summary of yourself..."
                                />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} 
            />
                </form>
            </Form>
        </div>
)}
