import { Badge } from "@/components/ui/badge"
import StackedAvatars from "./StackedAvatars";

const Task = ({ taskTitle }: { taskTitle: string }) => {
    return (
        <div
            className={`
                relative flex items-center justify-between
                rounded-lg bg-c-two px-3
                py-2 text-white max-h-[5rem]
                border-[1px] hover:border-c-one
            `}
        >
            <div className="w-full overflow-hidden flex flex-col gap-y-1">
                <h3 className='truncate font-medium'>{taskTitle}</h3>
                <div className="flex items-center justify-between">
                    <div className="flex gap-x-2">
                        <Badge variant="outline" className="bg-yellow-500">Apr 9</Badge>
                        <Badge variant="outline" className="bg-red-500">High priority</Badge>
                    </div>
                    <StackedAvatars />
                </div>
            </div>
        </div>
    );
}

export default Task;