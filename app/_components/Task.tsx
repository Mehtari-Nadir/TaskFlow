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

const Task = (
    {
        taskTitle,
        taskId,
        taskDescription,
        dueDate,
    }: {
        taskTitle: string,
        taskId: string,
        taskDescription?: string,
        dueDate?: Date
    }) => {

    const [openTaskDialog, setTaskDialog] = useState(false);
    const deleteTask = useTaskStore(actions => actions.deleteTask);

    return (
        <ContextMenu>
            <ContextMenuTrigger>
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
                                {dueDate &&
                                    <Badge variant="outline" className="bg-yellow-500">
                                        {dueDate.getDate() + " " + dueDate.toLocaleString('default', { month: 'long' })}
                                    </Badge>
                                }
                                <Badge variant="outline" className="bg-red-500">High priority</Badge>
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
                    onClick={() => {
                        toast.warning("Dlete This task??", {
                            action: {
                                label: "Delete",
                                onClick: () => {
                                    deleteTask(taskId);
                                }
                            },
                        })
                    }}
                >
                    Delete
                </ContextMenuItem>
            </ContextMenuContent>
            <EditTaskDialog
                openTaskDialog={openTaskDialog}
                setTaskDialog={setTaskDialog}
                taskTitle={taskTitle}
                taskDescription={taskDescription}
                taskId={taskId}
            />
        </ContextMenu>
    );
}

export default Task;