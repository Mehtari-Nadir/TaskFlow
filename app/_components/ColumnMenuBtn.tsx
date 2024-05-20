import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import EditColumnDialog from "./EditColumnDialog";
import { useState } from "react";
import AddTaskDialog from "./AddTaskDialog";
import { toast } from "sonner";
import { useColumnStore } from "../_providers/column-store-provider";

const ColumnMenuBtn = ({ columnId, columnTitle }: { columnId: string, columnTitle: string }) => {

    const [openColumnDialog, setColumnDialog] = useState(false);
    const [openTaskDialog, setTaskDialog] = useState(false);

    const deleteColumn = useColumnStore(actions => actions.deleteColumn);
    const handleDelete = () =>
        toast.warning("Delete This column?", {
            description: "All tasks in this column will be deleted.",
            action: (
                <Button
                    className="px-3 py-2 bg-red-400 text-black font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-red-400 "
                    onClick={() => {
                        deleteColumn(columnId);
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
                    <Button variant={"outline"} size={'icon'}>
                        <DotsVerticalIcon className="h-4 w-4 text-black dark:text-white" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => { setTaskDialog(true) }}>
                        Add Task
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => { setColumnDialog(true) }}>
                        Edit Column
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="text-red-500"
                        onClick={handleDelete}
                    >
                        Delete Column
                    </DropdownMenuItem>
                </DropdownMenuContent >
            </DropdownMenu >
            <EditColumnDialog
                openColumnDialog={openColumnDialog}
                setColumnDialog={setColumnDialog}
                columnId={columnId}
                columnTitle={columnTitle}
            />
            <AddTaskDialog
                columnId={columnId}
                openTaskDialog={openTaskDialog}
                setTaskDialog={setTaskDialog}
            />
        </>
    );
}

export default ColumnMenuBtn;