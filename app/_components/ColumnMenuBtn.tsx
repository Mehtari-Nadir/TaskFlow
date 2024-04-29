import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import Add_EditColumnDialog from "./Add_EditColumnDialog";
import { useState } from "react";

const ColumnMenuBtn = ({columnId, columnTitle}: {columnId: string, columnTitle: string}) => {

    const [open, setOpen] = useState(false);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={"outline"} size={'icon'}>
                        <DotsVerticalIcon className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>Add Task</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => {setOpen(true)}}>
                        Edit Column
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-500">Delete Column</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <Add_EditColumnDialog open={open} setOpen={setOpen} defaultValue={columnTitle} />
        </>
    );
}

export default ColumnMenuBtn;