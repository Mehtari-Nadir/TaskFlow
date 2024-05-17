import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useBoardStore } from "../_providers/board-store-provider";
import EditBoardDialog from "./EditBoardDialog";
import { toast } from "sonner";

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
                            toast.warning("Dlete This board??", {
                                description: "All Columns and tasks in this board will be deleted.",
                                action: {
                                    label: "Delete",
                                    onClick: () => {
                                        deleteBoard(boardId);
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