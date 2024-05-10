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
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { useTaskStore } from "../_providers/task-store-provider"
import { useMemo } from "react"

const createTaskSchema = z.object({
    taskTitle: z.string().min(2, { message: "minimum 2 chars" }).max(20, { message: "maximum 20 chars" }),
    taskDescription: z.string().max(255, { message: "maximum 20 chars" }).optional(),
})

const EditTaskDialog = (
    {
        openTaskDialog,
        setTaskDialog,
        taskId,
        taskTitle,
        taskDescription = ""
    }: {
        openTaskDialog: boolean,
        setTaskDialog: React.Dispatch<React.SetStateAction<boolean>>,
        taskId: string,
        taskTitle: string;
        taskDescription?: string
    }
) => {

    const editTask = useTaskStore(actions => actions.editTask);

    const form = useForm<z.infer<typeof createTaskSchema>>({
        resolver: zodResolver(createTaskSchema),
        defaultValues: {
            taskTitle: taskTitle,
            taskDescription: taskDescription,
        },
    })

    function onSubmit(values: z.infer<typeof createTaskSchema>) {
        editTask(taskId, values.taskTitle, values.taskDescription);
        form.reset();
        setTaskDialog(false);
        console.log(values);
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
                        <Button type="submit">Save</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default EditTaskDialog;