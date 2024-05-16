import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const aiTaskSchema = z.object({
    prompt: z.string().min(10, { message: "Minimum 10 chars" }),
})

const AiDialog = ({ open, setOpen }: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {

    const form = useForm<z.infer<typeof aiTaskSchema>>({
        resolver: zodResolver(aiTaskSchema),
        defaultValues: {
            prompt: ""
        },
    })

    function onSubmit(values: z.infer<typeof aiTaskSchema>) {
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="prompt"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Prompt</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="an E-commerce web app using next.js..." {...field} />
                                    </FormControl>
                                    <FormDescription>Make a specific and clear prompt</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Generate</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default AiDialog;