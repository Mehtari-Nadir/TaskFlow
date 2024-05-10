import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
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

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { useColumnStore } from "../_providers/column-store-provider"

const createColumnSchema = z.object({
    columnTitle: z.string().min(2, { message: "minimum 2 chars" }).max(20, { message: "maximum 20 chars" }),
})

const AddColumnDialog = (
    {
        boardId,
        openColumnDialog,
        setColumnDialog,
    }: {
        boardId: string,
        openColumnDialog: boolean,
        setColumnDialog: React.Dispatch<React.SetStateAction<boolean>>,
    }
) => {

    const addColumn = useColumnStore(actions => actions.addColumn);

    const form = useForm<z.infer<typeof createColumnSchema>>({
        resolver: zodResolver(createColumnSchema),
        defaultValues: {
            columnTitle: "",
        },
    })

    function onSubmit(values: z.infer<typeof createColumnSchema>) {
        addColumn(boardId, values.columnTitle);
        form.reset();
        setColumnDialog(false);
    }

    return (
        <Dialog open={openColumnDialog} onOpenChange={setColumnDialog}>
            <DialogContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="columnTitle"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Column Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="in progress, done..." {...field} />
                                    </FormControl>
                                    <FormDescription>Choosing effective column titles</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Add Column</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default AddColumnDialog;