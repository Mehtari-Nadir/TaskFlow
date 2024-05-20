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

const editBoardSchema = z.object({
    boardName: z.string().min(2, { message: "The board name must be at least 2 characters long." }).max(25, { message: "The board name must be no more than 25 characters long." }),
    boardDescription: z.string().max(255, { message: "The board description must be no more than 255 characters long." }).optional(),
});

const EditBoardDialog = (
    {
        open,
        setOpen,
        boardId,
        boardName,
        boardDescription
    }: {
        open: boolean,
        setOpen: React.Dispatch<React.SetStateAction<boolean>>,
        boardId: string,
        boardName: string,
        boardDescription?: string
    }) => {

    const editBoard = useBoardStore(actions => actions.editBoard);

    const form = useForm<z.infer<typeof editBoardSchema>>({
        resolver: zodResolver(editBoardSchema),
        defaultValues: {
            boardName: boardName,
            boardDescription: boardDescription
        },
    })

    function onSubmit(values: z.infer<typeof editBoardSchema>) {
        editBoard(boardId, values.boardName, values.boardDescription);
        form.reset();
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
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
                        <Button className="bg-persianGreen text-black font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-persianGreen" variant={"outline"} type="submit">Save</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default EditBoardDialog;