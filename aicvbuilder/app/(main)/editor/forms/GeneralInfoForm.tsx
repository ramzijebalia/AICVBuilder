// shadcn form docs : https://ui.shadcn.com/docs/components/form

import { generalInfoSchemas, GeneralInfoValues } from "@/lib/validation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

export default function GenerateInfoForm() {

    const form = useForm<GeneralInfoValues>({
        resolver : zodResolver(generalInfoSchemas), // we can't submit our form until our fields are valid
        defaultValues : {  
            title : '',
            description : ''
    }})


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
                </form>
            </Form>
        </div>
)}