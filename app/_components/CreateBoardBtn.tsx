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
                className="px-4 py-2 bg-persianGreen text-black font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-persianGreen max-md:hidden" variant={"outline"}
            >
                Create Board
            </Button>
            <Button onClick={() => setOpen(true)} size={"icon"}
                className="bg-c-one md:hidden mx-2" variant={"outline"}
            >
                <PlusIcon color="black" className="h-4 w-4" />
            </Button>
            <CreateBoardDialog open={open} setOpen={setOpen} />
        </>
    );
}

export default CreateBoardBtn;