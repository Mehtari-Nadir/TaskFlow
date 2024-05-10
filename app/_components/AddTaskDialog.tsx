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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";


import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useTaskStore } from "../_providers/task-store-provider";

const createTaskSchema = z.object({
    taskTitle: z.string().min(2, { message: "minimum 2 chars" }).max(64, { message: "maximum 64 chars" }),
    taskDescription: z.string().max(255, { message: "minimum 255 chars" }).optional(),
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
        addTask(columnId, values.taskTitle, values.taskDescription);
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
                        <Button type="submit">Add Task</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default AddTaskDialog;