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
import { useUserStore } from "../_providers/user-store-provider";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { BoardColors } from "./colors";

const createBoardFormSchema = z.object({
    boardName: z
        .string()
        .min(2, { message: "The board name must be at least 2 characters long." })
        .max(25, { message: "The board name must be no more than 25 characters long." }),
    boardDescription: z
        .string()
        .max(255, { message: "The board description must be no more than 255 characters long." })
        .optional(),
    boardColor: z.enum(["color1", "color2", "color3", "color4", "color5"], {
        required_error: "No color selected.",
    }),
});

type CreateBoardForm = z.infer<typeof createBoardFormSchema>;

const ColorPicker = ({
    onChange,
    defaultValue,
}: {
    onChange: (event: any) => void;
    defaultValue: string;
}) => {
    return (
        <RadioGroup onValueChange={onChange} defaultValue={defaultValue} className="flex flex-wrap">
            {Object.entries(BoardColors).map(([colorGroup, colors]) => (
                <RadioGroupItem
                    key={colorGroup}
                    className={`size-8 shadow-sm`}
                    style={{ backgroundImage: `linear-gradient(to right, ${colors.join(",")})` }}
                    value={colorGroup}
                />
            ))}
        </RadioGroup>
    );
};

const CreateBoardButton = ({ open, setOpen }: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const addBoard = useBoardStore(actions => actions.addBoard);
    const user = useUserStore(state => state.users);
    const supabase = createClientComponentClient();
    const form = useForm<CreateBoardForm>({
        resolver: zodResolver(createBoardFormSchema),
        defaultValues: {
            boardName: "",
            boardDescription: "",
            boardColor: "color1",
        },
    })
    const onSubmit = async ({ boardName, boardDescription, boardColor }: CreateBoardForm) => {
        try {
            const boardId = addBoard(boardName, boardDescription, BoardColors[boardColor]);
            const { error } = await supabase
                .from("boards")
                .insert([{
                    boardId,
                    boardTitle: boardName,
                    boardDescription: boardDescription || null,
                    userId: user[0].userId,
                    boardColor: BoardColors[boardColor] || null,
                }])
            if (error) throw error;
        } catch (error) {
            toast.error("Error creating board. Please try again.");
        } finally {
            form.reset();
            setOpen(false);
        }
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
                        <FormField
                            control={form.control}
                            name="boardColor"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel>Board Color</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex"
                                        >
                                            <ColorPicker onChange={field.onChange} defaultValue={field.value} />
                                        </RadioGroup>
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