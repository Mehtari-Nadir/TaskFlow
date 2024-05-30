"use client";
import ColumnMenuBtn from "./ColumnMenuBtn";
import Task from "./Task";
import { useTaskStore } from "../_providers/task-store-provider";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Column = ({ columnId, columnTitle }: { columnId: string, columnTitle: string }) => {

    const { tasks, draggedTask, setDraggedTask, updateTask } = useTaskStore(state => ({
        tasks: state.tasks,
        draggedTask: state.draggedTask,
        setDraggedTask: state.setDraggedTask,
        updateTask: state.updateTask,
    }));
    const filtredTasks = useMemo(() => {
        return tasks.filter(task => task.columnId == columnId);
    }, [tasks, columnId]);
    const [active, setActive] = useState(false);
    const handleOnDrop = () => {
        if (!draggedTask) return
        updateTask(draggedTask, columnId);
        setDraggedTask(null);
        setActive(false);
    }
    const handleOnDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setActive(true);
    }
    const handleDragLeave = () => setActive(false);

    return (
        <div
            className={`flex-none w-[300px] max-h-[450px] ${active ? "bg-[#092327]/50" : "bg-c-three"} p-3 rounded-lg text-white`}
            onDrop={handleOnDrop}
            onDragOver={handleOnDragOver}
            onDragLeave={handleDragLeave}
        >
            <div
                className="flex items-center justify-between mb-3"
            >
                <h1 className="font-bold text-2xl">{columnTitle}</h1>
                <ColumnMenuBtn
                    columnId={columnId}
                    columnTitle={columnTitle}
                />
            </div>
            <div className="flex flex-col gap-2 overflow-y-auto max-h-[375px]">
                <AnimatePresence initial={false}>
                    {filtredTasks.map((task, index) => {
                        return (
                            <motion.div
                                key={task.taskId}
                                initial={{ height: 0 }}
                                animate={{ height: "auto" }}
                                exit={{
                                    opacity: 0,
                                    height: 0,
                                    y: -50,
                                    zIndex: index,
                                }}
                                transition={{ ease: [0.32, 0.72, 0, 1], duration: 0.35 }}
                            >
                                <Task {...task} />
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default Column;