import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";

import { useTaskStore } from "../_providers/task-store-provider";

const createTaskSchema = z.object({
    taskTitle: z.string().min(2, { message: "minimum 2 chars" }).max(64, { message: "maximum 64 chars" }),
    taskDescription: z.string().max(255, { message: "minimum 255 chars" }).optional(),
    dueDate: z.date().optional(),
})

const AddTaskDialog = (
    {
        columnId,
        openTaskDialog,
        setTaskDialog,
    }: {
        columnId: string,
        openTaskDialog: boolean,
        setTaskDialog: React.Dispatch<React.SetStateAction<boolean>>,
    }
) => {

    const addTask = useTaskStore(actions => actions.addTask);

    const form = useForm<z.infer<typeof createTaskSchema>>({
        resolver: zodResolver(createTaskSchema),
        defaultValues: {
            taskTitle: "",
            taskDescription: "",
        },
    })

    function onSubmit(values: z.infer<typeof createTaskSchema>) {
        addTask(columnId, values.taskTitle, values.taskDescription, values.dueDate);
        form.reset();
        setTaskDialog(false);
    }

    return (
        <Dialog open={openTaskDialog} onOpenChange={setTaskDialog}>
            <DialogContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="taskTitle"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Task Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Impl Design" {...field} />
                                    </FormControl>
                                    <FormDescription>Make a specific and clear task title</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="taskDescription"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Task Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Use Figma as a tool, and dribbble for inspirational" {...field} />
                                    </FormControl>
                                    <FormDescription>Keep Descriptions Brief</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="dueDate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Select a Due date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-full pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date < new Date() || date < new Date("1900-01-01")
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormDescription>Set Realistic Deadline</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Add Task</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default AddTaskDialog;