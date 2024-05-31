import { Badge } from "@/components/ui/badge";
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
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

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
    const { setDraggedTask, deleteTask } = useTaskStore(actions => ({
        setDraggedTask: actions.setDraggedTask,
        deleteTask: actions.deleteTask,
    }));
    const PriorityColors: { [key in Priority]: string } = {
        [Priority.High]: '#FF0000', // Red
        [Priority.Medium]: '#FF9900', // Orange
        [Priority.Low]: '#33CC33', // Green
    };
    const supabase = createClientComponentClient();
    const handleOnDragStart: (taskId: string) => () => void = (taskId) => () => {
        setDraggedTask(taskId);
    }

    return (
        <div className="cursor-grab active:cursor-grabbing" draggable="true" onDragStart={handleOnDragStart(taskId)}>
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
                                    {!!dueDate &&
                                        <Badge variant="default">
                                            {new Date(dueDate)?.getDate() + " " + new Date(dueDate)?.toLocaleString('default', { month: 'long' })}
                                        </Badge>
                                    }
                                    {priority && <Badge style={{ backgroundColor: PriorityColors[priority] }}>{priority}</Badge>}
                                </div>
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
                            toast.warning("Delete This task?", {
                                description: "Deleting this task will permanently remove it from this board.",
                                action: {
                                    label: "Delete",
                                    onClick: async () => {
                                        try {
                                            deleteTask(taskId);
                                            const { error } = await supabase
                                                .from('tasks')
                                                .delete()
                                                .eq('taskId', taskId);
                                            if (error) throw error;
                                        } catch (error) {
                                            toast.error("Failed to delete task");
                                        }
                                    },
                                }
                            })
                        }}
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
        </div>
    );
}

export default Task;