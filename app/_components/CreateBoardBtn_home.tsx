import { PlusCircledIcon } from "@radix-ui/react-icons";

const CreateBoardBtn_home = () => {
    return (
        <div className="w-[250px] h-[130px] bg-c-three flex items-center justify-center gap-x-1 rounded-md">
            <PlusCircledIcon className="h-4 w-4" />
            Create Board
        </div>
    );
}

export default CreateBoardBtn_home;