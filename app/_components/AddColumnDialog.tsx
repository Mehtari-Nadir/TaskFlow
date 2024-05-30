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
import { Plus } from "lucide-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "sonner";

const createColumnSchema = z.object({
    columnTitle: z.string()
        .min(2, { message: "The column title must be at least 2 characters long." })
        .max(20, { message: "The column title must be no more than 20 characters long." })
});
type createColumnForm = z.infer<typeof createColumnSchema>;


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
    const supabase = createClientComponentClient();
    const form = useForm<createColumnForm>({
        resolver: zodResolver(createColumnSchema),
        defaultValues: {
            columnTitle: "",
        },
    })
    const onSubmit = async ({ columnTitle }: createColumnForm) => {
        try {
            const columnId = addColumn(boardId, columnTitle);
            const { error } = await supabase
                .from("columns")
                .insert({ columnId, columnTitle, boardId });
            if (error) throw error;
        } catch (error) {
            toast.error("An error occurred while adding the column. Please try again.");
        } finally {
            form.reset();
            setColumnDialog(false);
        }
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
                        <Button
                            type="submit"
                            className="flex items-center gap-1.5 px-4 py-2 bg-persianGreen text-black font-bold transition-colors duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-persianGreen"
                        >
                            <Plus size={18} />Add Column
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default AddColumnDialog;