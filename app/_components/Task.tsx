import { Badge } from "@/components/ui/badge";
import StackedAvatars from "./StackedAvatars";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useState } from "react";
import EditTaskDialog from "./EditTaskDialog";
import { toast } from "sonner";
import { useTaskStore } from "../_providers/task-store-provider";
import { Button } from "@/components/ui/button";

enum Priority {
    High = 'High',
    Medium = 'Medium',
    Low = 'Low',
};

const Task = (
    {
        taskTitle,
        taskId,
        taskDescription,
        dueDate,
        priority,
    }: {
        taskTitle: string,
        taskId: string,
        taskDescription?: string,
        dueDate?: Date,
        priority?: Priority
    }) => {

    const [openTaskDialog, setTaskDialog] = useState(false);
    const deleteTask = useTaskStore(actions => actions.deleteTask);

    const PriorityColors: { [key in Priority]: string } = {
        [Priority.High]: '#FF0000', // Red
        [Priority.Medium]: '#FF9900', // Orange
        [Priority.Low]: '#33CC33', // Green
    };
    const handleDelete = () =>
        toast.warning("Delete This task?", {
            description: "Deleting this task will permanently remove it from this board.",
            action: (
                <div className="flex justify-end">
                    <Button
                        className="px-3 bg-red-400 text-black font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-red-400 "
                        onClick={() => {
                            deleteTask(taskId);
                            toast.dismiss();
                        }}
                    >
                        Delete
                    </Button>
                </div>
            ),
        })

    return (
        <ContextMenu>
            <ContextMenuTrigger>
                <div
                    className={`
                        relative flex items-center justify-between
                        rounded-lg bg-background px-3 py-2
                        border-[1px] hover:border-c-one
                    `}
                >
                    <div className="w-full overflow-hidden flex flex-col gap-y-1">
                        <h3 className='truncate font-medium text-black dark:text-white text-balance'>{taskTitle}</h3>
                        <div className="flex items-center justify-between">
                            <div className="flex gap-x-2">
                                {dueDate &&
                                    <Badge variant="default">
                                        {dueDate.getDate() + " " + dueDate.toLocaleString('default', { month: 'long' })}
                                    </Badge>
                                }
                                {priority && <Badge style={{ backgroundColor: PriorityColors[priority] }}>{priority}</Badge>}
                            </div>
                            <StackedAvatars />
                        </div>
                    </div>
                </div>
            </ContextMenuTrigger>
            <ContextMenuContent>
                <ContextMenuItem onClick={() => { setTaskDialog(true) }}>
                    Edit
                </ContextMenuItem>
                <ContextMenuItem className="text-red-500"
                    onClick={handleDelete}
                >
                    Delete
                </ContextMenuItem>
            </ContextMenuContent>
            <EditTaskDialog
                openTaskDialog={openTaskDialog}
                setTaskDialog={setTaskDialog}
                taskId={taskId}
            />
        </ContextMenu>
    );
}

export default Task;