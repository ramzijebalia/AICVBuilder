//usefieldarray docs ; https://react-hook-form.com/docs/usefieldarray
// dnd kit : drag and drop docs ; https://docs.dndkit.com/

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EditorormProps } from "@/lib/types";
import { workExperienceSchema, WorkExperienceValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { GripHorizontal } from "lucide-react";
import { useEffect } from "react";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";
import { closestCenter, DndContext, DragCancelEvent, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core" ;
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities"
import { cn } from "@/lib/utils";

export default function WorkExperienceForm({resumeData , setResumeData}: EditorormProps){
    const form = useForm<WorkExperienceValues>({
        resolver: zodResolver(workExperienceSchema),
        defaultValues: {
            workExperiences : resumeData.workExperiences || []
        }
    })

    useEffect(() => {
        const { unsubscribe } = form.watch(async (values) => {
          const isValid = await form.trigger();
          if (!isValid) return;
          setResumeData({
            ...resumeData,
            workExperiences:
              values.workExperiences?.filter((exp) => exp !== undefined) || [],
          });
        });
        return unsubscribe;
      }, [form, resumeData, setResumeData]);


    const {fields , append , remove , move} = useFieldArray({
        control : form.control ,
        name: "workExperiences"
    })

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter : sortableKeyboardCoordinates
        })
    )

    function handleDragEnd(event : DragCancelEvent){
        const {active , over} = event
        if(over && active.id !== over.id){
            const oldIndex = fields.findIndex((field) => field.id === active.id)
            const newIndex = fields.findIndex((field) => field.id === over.id)
            move(oldIndex , newIndex)
            return arrayMove(fields , oldIndex , newIndex)
        }
    }

    return(
        <div className="max-w-xl mx-auto space-y-6">
            <div className="space-y-1.5 text-center">
                <h2 className="text-2xl font-semibold"> Work Experience</h2>
                <p className="text-sm text-muted-foreground">
                    Add as many work Experiences as you like ... 
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
                                <WorkExperienceItem 
                                    id={field.id}
                                    key={field.id} 
                                    index={index} 
                                    form={form} 
                                    remove= {remove} 
                                />
                            ))}
                        </SortableContext>
                    </DndContext>
                    <div className="flex justify-center">
                        <Button 
                            type="button" 
                            onClick={() => append({
                                position: "",
                                company: "",
                                startDate: "",
                                endDate: "",
                                description:""
                        })}>
                            Add Work Experience
                        </Button>

                    </div>
                </form>
            </Form>
        </div>
)}

interface WorkExperienceItemProps {
    id : string;
    form: UseFormReturn<WorkExperienceValues>;
    index : number;
    remove : (index : number) => void
}


function WorkExperienceItem({id , form , index , remove}: WorkExperienceItemProps){
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } =  useSortable({id})
    return(
        <div className={cn("space-y-3 border rounded-md bg-background p-3" ,
            isDragging && "shadow-xl z-50 cursor-grab relative" // this will make the item that is being dragged to be on top of the other items
        )}
            ref={setNodeRef}
            style={{
                transform: CSS.Transform.toString(transform),
                transition,
            }}
        >
            <div className="flex justify-between gap-2">
                <span className="font-semibold"> Work Experience {index +1}</span>
                {/*we will use this gripHorizontal to drag and drop */}
                <GripHorizontal 
                    className="size-5 cursor-grab text-muted-foreground focus:outline-none"
                    {...attributes}
                    {...listeners}
                />
            </div>

            <FormField 
                control={form.control}
                name={`workExperiences.${index}.position`}
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Job Title</FormLabel>
                            <FormControl>
                                <Input {...field} autoFocus/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )} 
            />
            <FormField 
                control={form.control}
                name={`workExperiences.${index}.company`}
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Company</FormLabel>
                            <FormControl>
                                <Input {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )} 
            />
            <div className="grid grid-cols-2 gap-3">
                <FormField 
                    control={form.control}
                    name={`workExperiences.${index}.startDate`}
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Start Date</FormLabel>
                                <FormControl>
                                    <Input 
                                        {...field} 
                                        type="date" 
                                        value={field.value?.slice(0,10)} // this remove the time ( slice keep only the first 10 caracter wich is teh date )
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} 
                />
                <FormField 
                    control={form.control}
                    name={`workExperiences.${index}.endDate`}
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>End Date</FormLabel>
                                <FormControl>
                                    <Input 
                                        {...field} 
                                        type="date" 
                                        value={field.value?.slice(0,10)} // this remove the time ( slice keep only the first 10 caracter wich is teh date )
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} 
                />
            </div>
            <FormDescription>
                Leave <span className="font-semibold">End Date</span> empty if you are still working here ...
            </FormDescription>
            <FormField 
                    control={form.control}
                    name={`workExperiences.${index}.description`}
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} 
            />
            <Button variant="destructive" type="button" onClick={()=> remove(index)}>
                Remove
            </Button>

        </div>
)}