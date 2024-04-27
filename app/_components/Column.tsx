

import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import Task from "./Task";
import { useTaskStore } from "../_providers/task-store-provider";
import { useMemo } from "react";

const Column = ({columnId, columnTitle}: {columnId: string, columnTitle: string}) => {
    
    const tasks = useTaskStore(state => state.tasks);
    const filtredTasks = useMemo(() => {
        return tasks.filter(task => task.columnId == columnId);
    }, [columnId]);
    
    return (
        <div className="flex-none w-[250px] h-[450px] bg-c-three p-3 rounded-lg">
            <div className="flex items-center justify-between mb-3">
                <h1 className="font-bold text-2xl">{columnTitle}</h1>
                <Button variant={"outline"} size={'icon'}>
                    <PlusIcon className="h-4 w-4" />
                </Button>
            </div>
            <div className="flex flex-col gap-2 overflow-y-auto max-h-[375px]">
                {filtredTasks.map((value, index) => {
                    return (
                        <Task key={index} {...value} />
                    );
                })}
            </div>
        </div>
    );
}

export default Column;