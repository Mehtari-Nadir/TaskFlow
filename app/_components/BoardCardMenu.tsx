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
    const handleDelete = () =>
        toast.warning("Delete This board?", {
            description: "All Columns and tasks in this board will be deleted.",
            action: (
                <Button
                    className="px-3 py-2 bg-red-400 text-black font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-red-400 "
                    onClick={() => {
                        deleteBoard(boardId);
                        toast.dismiss();
                    }}
                >
                    Delete
                </Button>
            )
        })

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
                        onClick={handleDelete}
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