"use client"

import { useState } from "react";
import CreateBoardDialog from "./CreateBoardDialog";
import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

const CreateBoardBtn = () => {

    const [open, setOpen] = useState(false);

    return (
        <>
            <Button
                onClick={() => setOpen(true)}
                className="bg-c-one max-md:hidden" variant={"outline"}
            >
                Create Board
            </Button>
            <Button onClick={() => setOpen(true)} size={"icon"}
                className="bg-c-one md:hidden" variant={"outline"}
            >
                <PlusIcon className="h-4 w-4" />
            </Button>
            <CreateBoardDialog open={open} setOpen={setOpen} />
        </>
    );
}

export default CreateBoardBtn;