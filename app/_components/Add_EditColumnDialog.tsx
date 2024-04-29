import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
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

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

const createColumnSchema = z.object({
    columnTitle: z.string().min(2, { message: "minimum 2 chars" }).max(20, { message: "maximum 20 chars" }),
})

const Add_EditColumnDialog = (
    {
        open,
        setOpen,
        isEdit,
        defaultValue = "",
    }: {
        open: boolean,
        setOpen: React.Dispatch<React.SetStateAction<boolean>>,
        isEdit?: boolean,
        defaultValue?: string
    }
) => {

    const form = useForm<z.infer<typeof createColumnSchema>>({
        resolver: zodResolver(createColumnSchema),
        defaultValues: {
            columnTitle: defaultValue,
        },
    })

    function onSubmit(values: z.infer<typeof createColumnSchema>) {
        form.reset();
        setOpen(false);
        console.log(values)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="columnTitle"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Column Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="shadcn" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {defaultValue && <Button type="submit">Save</Button>}
                        {!defaultValue && <Button type="submit">Add</Button>}
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default Add_EditColumnDialog;