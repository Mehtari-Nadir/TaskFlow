import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils"; import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { format } from "date-fns";
import { useTaskStore } from "../_providers/task-store-provider"
import { useMemo } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "sonner";

enum Priority {
    High = 'High',
    Medium = 'Medium',
    Low = 'Low',
};

const editTaskSchema = z.object({
    taskTitle: z.string()
        .min(2, { message: "The task title must be at least 2 characters long." })
        .max(64, { message: "The task title must be no more than 64 characters long." }),
    taskDescription: z.string()
        .max(255, { message: "The task description must be no more than 255 characters long." })
        .optional(),
    dueDate: z.date().optional(),
    priority: z.nativeEnum(Priority).optional(),
});
type editTaskForm = z.infer<typeof editTaskSchema>;

const EditTaskDialog = (
    {
        openTaskDialog,
        setTaskDialog,
        taskId,
    }: {
        openTaskDialog: boolean,
        setTaskDialog: React.Dispatch<React.SetStateAction<boolean>>,
        taskId: string,
    }
) => {
    const editTask = useTaskStore(actions => actions.editTask);
    const tasks = useTaskStore(state => state.tasks);
    const supabase = createClientComponentClient();
    const currentTask = useMemo(() => {
        return tasks.filter(task => task.taskId == taskId);
    }, [taskId, tasks]);
    const form = useForm<editTaskForm>({
        resolver: zodResolver(editTaskSchema),
        defaultValues: {
            taskTitle: currentTask[0]?.taskTitle,
            taskDescription: currentTask[0]?.taskDescription,
            dueDate: currentTask[0]?.dueDate ? new Date(currentTask[0]?.dueDate) : undefined,
            priority: currentTask[0]?.priority,
        },
    })
    const onSubmit = async ({ taskTitle, dueDate, priority, taskDescription }: editTaskForm) => {
        try {
            editTask(taskId, taskTitle, taskDescription, dueDate, priority);
            const { error } = await supabase
                .from("tasks")
                .update({
                    taskTitle,
                    taskDescription: taskDescription || null,
                    dueDate: dueDate || null,
                    priority: priority ? Priority[priority] : null,
                })
                .eq("taskId", taskId);
            if (error) throw error;
        } catch (error) {
            toast.error("An error occurred while updating the task. Please try again.");
        } finally {
            form.reset();
            setTaskDialog(false);
        }
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
                        <FormField
                            control={form.control}
                            name="priority"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Select Priority</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Priorities" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value={Priority.High}>High</SelectItem>
                                            <SelectItem value={Priority.Medium}>Medium</SelectItem>
                                            <SelectItem value={Priority.Low}>Low</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            className="px-4 py-2 bg-persianGreen text-black font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-persianGreen"
                        >Save Task</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default EditTaskDialog;