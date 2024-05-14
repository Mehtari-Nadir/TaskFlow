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

import { useBoardStore } from "../_providers/board-store-provider";

const createBoardFormSchema = z.object({
    boardName: z.string().min(2, { message: "minimum 2 characters are required" }).max(25, { message: "maximum 25 characters" }),
    boardDescription: z.string().max(255, { message: "maximum 255 characters" }).optional(),
});

const CreateBoardButton = ({ open, setOpen }: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {

    const addBoard = useBoardStore(actions => actions.addBoard);

    const form = useForm<z.infer<typeof createBoardFormSchema>>({
        resolver: zodResolver(createBoardFormSchema),
        defaultValues: {
            boardName: "",
            boardDescription: ""
        },
    })

    function onSubmit(values: z.infer<typeof createBoardFormSchema>) {
        addBoard(values.boardName, values.boardDescription);
        form.reset();
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Let&apos;s build a Board</DialogTitle>
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
                        <Button className="px-4 py-2 bg-persianGreen text-black font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-persianGreen" variant={"outline"} type="submit">Create</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateBoardButton;