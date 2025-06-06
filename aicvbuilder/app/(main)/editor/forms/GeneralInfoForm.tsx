// shadcn form docs : https://ui.shadcn.com/docs/components/form

import { generalInfoSchema, GeneralInfoValues } from "@/lib/validation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useEffect } from "react"
import { EditorFormProps } from "@/lib/types"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function GenerateInfoForm({resumeData , setResumeData}: EditorFormProps) {

    const form = useForm<GeneralInfoValues & { template: 'modern' | 'two-column' }>({
        resolver : zodResolver(generalInfoSchema), // we can't submit our form until our fields are valid
        defaultValues : {  
            title : resumeData.title || '',
            description : resumeData.description || '',
            template : resumeData.template || 'modern'
    }})

    // this useEffcet to submit our form if something change
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
                <h2 className="text-2xl font-semibold"> General Info</h2>
                <p className="text-sm text-muted-foreground">
                    this wil not appear on your resume
                </p>
            </div>
            <Form {...form}>
                <form className="space-y-3">
                    <FormField 
                        control={form.control}
                        name="title"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Project Name</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="My cool Resume ..." autoFocus/>
                                </FormControl>
                                <FormMessage/> {/* this will show the error message */}
                            </FormItem>
                        )} 
                    />
                    <FormField 
                        control={form.control}
                        name="description"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder=" A resume for my jext job"/>
                                </FormControl>
                                <FormDescription>
                                    Write a short description about your project ...
                                </FormDescription>
                                <FormMessage/> {/* this will show the error message */}
                            </FormItem>
                        )} 
                    />
                    <FormField
                        control={form.control}
                        name="template"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel>Template Style</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex flex-col space-y-1"
                                    >
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="modern" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Modern
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="two-column" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Two Column
                                            </FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        </div>
)}