// shadcn form docs : https://ui.shadcn.com/docs/components/form

import {  personalInfoSchemas, PersonalInfoValues } from "@/lib/validation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useEffect } from "react"

export default function PersonalInfoForm() {

    const form = useForm<PersonalInfoValues>({
        resolver : zodResolver(personalInfoSchemas), // we can't submit our form until our fields are valid
        defaultValues : {  
            firstName : '',
            lastName : '', 
            jobTitle : '',
            city : '',
            country : '',
            phone : '',
            email : '',
    }})

    useEffect(() => {
        const {unsubscribe} = form.watch( async () => { // this function will triger when the form values change
            // normally this is not necessary because validation ahppen when we subbmit the form
            // but our form is deffered ( we dont ahve a submit button  ) instead we always wanna past the latest input to the parrent page immediately
            // this is why we have this validation ligic by ourselfs
            const isValid = await form.trigger() 
            if(!isValid) return ;
            // update resume data
        })
        return unsubscribe
    }, [form])


    return(
        <div className="max-w-xl mx-auto space-y-6">
            <div className="space-y-1.5 text-center">
                <h2 className="text-2xl font-semibold"> Personal Info</h2>
                <p className="text-sm text-muted-foreground">
                    Tell us about yourself
                </p>
            </div>
            <Form {...form}>
                <form className="space-y-3">
                    <FormField 
                        control={form.control}
                        name="photo"
                        render={({field : {value , ...fieldValues}}) => (
                            <FormItem>
                                <FormLabel>Your Photo</FormLabel>
                                <FormControl>
                                    <Input {...fieldValues} 
                                    type="file" 
                                    accept="image/*" 
                                    onChange={(e) =>{
                                        const file = e.target.files?.[0] // get a sigle file
                                        fieldValues.onChange(file)
                                    }}/>
                                </FormControl>
                                <FormMessage/> {/* this will show the error message */}
                            </FormItem>
                        )} 
                    />
                    <div className="grid grid-cols-2 gap-3"> {/*  we will put two inout filed behind each other */}
                        <FormField 
                            control={form.control}
                            name="firstName"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Fisrt Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )} 
                        />
                        <FormField 
                            control={form.control}
                            name="lastName"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )} 
                        />
                    </div>
                    <FormField 
                            control={form.control}
                            name="jobTitle"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Job Title</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )} 
                     />
                     <div className="grid grid-cols-2 gap-3"> {/*  we will put two inout filed behind each other */}
                        <FormField 
                            control={form.control}
                            name="city"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>city</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )} 
                        />
                        <FormField 
                            control={form.control}
                            name="country"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Country</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )} 
                        />
                    </div>
                    <FormField 
                            control={form.control}
                            name="phone"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="tel" />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )} 
                     />
                     <FormField 
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="email" />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )} 
                     />
                </form>
            </Form>
        </div>
)}