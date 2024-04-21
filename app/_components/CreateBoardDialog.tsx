"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"

const createBoardFormSchema = z.object({
    boardName: z.string().min(2, { message: "2 chars in min" }).max(25, { message: "25 chars in max" }),
    boardDescription: z.string().max(100, { message: "25 chars in max" }).optional(),
});

const CreateBoardButton = ({open, setOpen}: {open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>}) => {

    const form = useForm<z.infer<typeof createBoardFormSchema>>({
        resolver: zodResolver(createBoardFormSchema),
        defaultValues: {
            boardName: "",
            boardDescription: ""
        },
    })

    function onSubmit(values: z.infer<typeof createBoardFormSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
        setOpen(false);
        form.reset();
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Let's build a Board</DialogTitle>
                    <DialogDescription>
                        Enhance Team Efficiency: Centralize Board Access for Seamless Collaboration!
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 w-full">
                        <FormField
                            control={form.control}
                            name="boardName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Board Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="E-commerce design board" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="boardDescription"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Board Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="This board is dedicated to managing the design tasks for our e-commerce...."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className="bg-c-one" variant={"outline"} type="submit">Create</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateBoardButton;