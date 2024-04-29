import { useState } from "react";

import { Button } from "@/components/ui/button"
import { PlusIcon } from "@radix-ui/react-icons"
import Add_EditColumnDialog from "./Add_EditColumnDialog";

const AddColumnBtn = () => {

    const [open, setOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setOpen(true)} className="w-[250px]" variant={"outline"}>
                <PlusIcon className="h-4 w-4 mr-2" />
                Add Column
            </Button>
            <Add_EditColumnDialog open={open} setOpen={setOpen} />
        </>
    );
}

export default AddColumnBtn;