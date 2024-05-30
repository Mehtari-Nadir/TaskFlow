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
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const ColumnMenuBtn = ({ columnId, columnTitle }: { columnId: string, columnTitle: string }) => {

    const [openColumnDialog, setColumnDialog] = useState(false);
    const [openTaskDialog, setTaskDialog] = useState(false);
    const deleteColumn = useColumnStore(actions => actions.deleteColumn);
    const supabase = createClientComponentClient();

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
                        onClick={() => {
                            toast.warning("Delete This column?", {
                                description: "All tasks in this column will be deleted.",
                                action: {
                                    label: "Delete",
                                    onClick: async () => {
                                        try {
                                            deleteColumn(columnId);
                                            const { error } = await supabase
                                                .from('columns')
                                                .delete()
                                                .eq('columnId', columnId);
                                            if (error) throw error;
                                        } catch (error) {
                                            toast.error("Error deleting column");
                                        }
                                    },
                                }
                            })
                        }}
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