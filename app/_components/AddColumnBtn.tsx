import { Button } from "@/components/ui/button"
import { PlusIcon } from "@radix-ui/react-icons"

const AddColumnBtn = () => {
    return (
        <Button className="w-[250px]" variant={"outline"}>
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Column
        </Button>
    );
}

export default AddColumnBtn;