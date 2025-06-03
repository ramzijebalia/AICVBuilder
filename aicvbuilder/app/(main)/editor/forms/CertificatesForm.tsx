import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EditorFormProps } from "@/lib/types";
import { certificatesSchema, CertificatesValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { GripHorizontal } from "lucide-react";
import { useEffect } from "react";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";
import { closestCenter, DndContext, DragCancelEvent, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";

export default function CertificatesForm({resumeData, setResumeData}: EditorFormProps) {
    const form = useForm<CertificatesValues>({
        resolver: zodResolver(certificatesSchema),
        defaultValues: {
            certificates: resumeData.certificates || []
        }
    })

    useEffect(() => {
        const { unsubscribe } = form.watch(async (values) => {
            const isValid = await form.trigger();
            if (!isValid) return;
            setResumeData({
                ...resumeData,
                certificates: values.certificates?.filter((cert) => cert !== undefined) || [],
            });
        });
        return unsubscribe;
    }, [form, resumeData, setResumeData]);

    const {fields, append, remove, move} = useFieldArray({
        control: form.control,
        name: "certificates"
    })

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    )

    function handleDragEnd(event: DragCancelEvent) {
        const {active, over} = event
        if (over && active.id !== over.id) {
            const oldIndex = fields.findIndex((field) => field.id === active.id)
            const newIndex = fields.findIndex((field) => field.id === over.id)
            move(oldIndex, newIndex)
            return arrayMove(fields, oldIndex, newIndex)
        }
    }

    return (
        <div className="max-w-xl mx-auto space-y-6">
            <div className="space-y-1.5 text-center">
                <h2 className="text-2xl font-semibold">Certificates</h2>
                <p className="text-sm text-muted-foreground">
                    Add your professional certifications and achievements
                </p>
            </div>
            <Form {...form}>
                <form className="space-y-3">
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                        modifiers={[restrictToVerticalAxis]}
                    >
                        <SortableContext
                            items={fields}
                            strategy={verticalListSortingStrategy}
                        >
                            {fields.map((field, index) => (
                                <CertificateItem
                                    id={field.id}
                                    key={field.id}
                                    index={index}
                                    form={form}
                                    remove={remove}
                                />
                            ))}
                        </SortableContext>
                    </DndContext>

                    <div className="flex justify-center">
                        <Button
                            type="button"
                            onClick={() => append({
                                name: "",
                                issuer: "",
                                date: "",
                                url: "",
                            })}
                        >
                            Add Certificate
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

interface CertificateItemProps {
    id: string;
    form: UseFormReturn<CertificatesValues>;
    index: number;
    remove: (index: number) => void
}

function CertificateItem({id, form, index, remove}: CertificateItemProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({id})

    return (
        <div className={cn("space-y-3 border rounded-md bg-background p-3",
            isDragging && "shadow-xl z-50 cursor-grab relative"
        )}
            ref={setNodeRef}
            style={{
                transform: CSS.Transform.toString(transform),
                transition,
            }}
        >
            <div className="flex justify-between gap-2">
                <span className="font-semibold">Certificate {index + 1}</span>
                <GripHorizontal
                    className="size-5 cursor-grab text-muted-foreground focus:outline-none"
                    {...attributes}
                    {...listeners}
                />
            </div>

            <FormField
                control={form.control}
                name={`certificates.${index}.name`}
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Certificate Name</FormLabel>
                        <FormControl>
                            <Input {...field} autoFocus/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name={`certificates.${index}.issuer`}
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Issuing Organization</FormLabel>
                        <FormControl>
                            <Input {...field}/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name={`certificates.${index}.date`}
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Date Earned</FormLabel>
                        <FormControl>
                            <Input type="date" {...field}/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name={`certificates.${index}.url`}
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Certificate URL (optional)</FormLabel>
                        <FormControl>
                            <Input {...field}/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />

            <Button
                type="button"
                variant="destructive"
                onClick={() => remove(index)}
            >
                Remove Certificate
            </Button>
        </div>
    )
} 