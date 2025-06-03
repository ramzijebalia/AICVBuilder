import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { EditorFormProps } from "@/lib/types";
import { interestsSchema, InterestsValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function InterestsForm({resumeData, setResumeData}: EditorFormProps) {
    const form = useForm<InterestsValues>({
        resolver: zodResolver(interestsSchema),
        defaultValues: {
            interests: resumeData.interests || []
        }
    })

    useEffect(() => {
        const { unsubscribe } = form.watch(async (values) => {
            const isValid = await form.trigger();
            if (!isValid) return;
            setResumeData({
                ...resumeData,
                interests: values.interests?.filter((interest) => interest !== undefined)
                    .map(interest => interest.trimLeft())
                    .filter(interest => interest !== "") || [],
            });
        });
        return unsubscribe;
    }, [form, resumeData, setResumeData]);

    return (
        <div className="max-w-xl mx-auto space-y-6">
            <div className="space-y-1.5 text-center">
                <h2 className="text-2xl font-semibold">Interests</h2>
                <p className="text-sm text-muted-foreground">
                    Share your personal interests and hobbies
                </p>
            </div>
            <Form {...form}>
                <form className="space-y-3">
                    <FormField
                        control={form.control}
                        name="interests"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="sr-only">Interests</FormLabel>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        placeholder="e.g. Photography, Hiking, Reading, ..."
                                        onChange={(e) => {
                                            const interests = e.target.value.split(",")
                                            field.onChange(interests)
                                        }}
                                        autoFocus
                                    />
                                </FormControl>
                                <FormDescription>
                                    Separate each interest with a comma
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        </div>
    )
} 