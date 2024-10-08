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
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useColumnStore } from "../_providers/column-store-provider"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "sonner";

const editColumnSchema = z.object({
    columnTitle: z.string()
        .min(2, { message: "The column title must be at least 2 characters long." })
        .max(20, { message: "The column title must be no more than 20 characters long." })
});
type editColumnForm = z.infer<typeof editColumnSchema>;

const EditColumnDialog = (
    {
        openColumnDialog,
        setColumnDialog,
        columnId,
        columnTitle,
    }: {
        openColumnDialog: boolean,
        setColumnDialog: React.Dispatch<React.SetStateAction<boolean>>,
        columnId: string,
        columnTitle: string,
    }
) => {
    const editColumn = useColumnStore(actions => actions.editColumn);
    const supabase = createClientComponentClient();
    const form = useForm<editColumnForm>({
        resolver: zodResolver(editColumnSchema),
        defaultValues: {
            columnTitle: columnTitle,
        },
    })
    const onSubmit = async ({ columnTitle }: editColumnForm) => {
        try {
            editColumn(columnId, columnTitle);
            const { error } = await supabase
                .from("columns")
                .update({ columnTitle })
                .eq("columnId", columnId);
            if (error) throw error;
        } catch (error) {
            toast.error("An error occurred while updating the column. Please try again.");
        } finally {
            form.reset();
            setColumnDialog(false);
        }
    };

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
                        <Button
                            type="submit"
                            className="px-4 py-2 bg-persianGreen text-black font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-persianGreen"
                        >Save Column</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default EditColumnDialog;