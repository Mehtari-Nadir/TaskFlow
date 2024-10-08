import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useBoardStore } from "../_providers/board-store-provider";
import EditBoardDialog from "./EditBoardDialog";
import { toast } from "sonner";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const BoardCardMenu = (
    {
        boardId,
        boardTitle,
        boardDescription
    }: {
        boardId: string,
        boardTitle: string,
        boardDescription?: string
    }) => {

    const [open, setOpen] = useState<boolean>(false);
    const deleteBoard = useBoardStore(actions => actions.deleteBoard);
    const supabase = createClientComponentClient();

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={"ghost"} size={"icon"}>
                        <DotsHorizontalIcon className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => { setOpen(true) }}>
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="text-red-500"
                        onClick={() => {
                            toast.warning("Delete This board?", {
                                description: "All Columns and tasks in this board will be deleted.",
                                action: {
                                    label: "Delete",
                                    onClick: async () => {
                                        try {
                                            deleteBoard(boardId);
                                            const { error } = await supabase
                                                .from('boards')
                                                .delete()
                                                .eq('boardId', boardId);
                                            if (error) throw error;
                                        } catch (error) {
                                            toast.error("Error deleting board");
                                        }
                                    }
                                },
                            })
                        }}
                    >
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <EditBoardDialog
                open={open}
                setOpen={setOpen}
                boardId={boardId}
                boardName={boardTitle}
                boardDescription={boardDescription}
            />
        </>
    );
}

export default BoardCardMenu;