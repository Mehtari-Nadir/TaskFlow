"use client"

import { PlusCircledIcon } from "@radix-ui/react-icons";
import CreateBoardDialog from "./CreateBoardDialog";
import { useState } from "react";

const CreateBoardBtn_home = () => {

    const [open, setOpen] = useState(false);

    return (
        <>
            <div
                onClick={() => setOpen(true)}
                className="w-[250px] h-[130px] cursor-pointer bg-c-three flex items-center justify-center gap-x-1 rounded-md">
                <PlusCircledIcon className="h-4 w-4" />
                Create Board
            </div>
            <CreateBoardDialog open={open} setOpen={setOpen} />
        </>
    );
}

export default CreateBoardBtn_home;