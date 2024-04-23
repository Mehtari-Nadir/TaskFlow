import { createStore } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

export const initTaskStore = (): TTask[] => {
    return [
        {
            taskId: "ttt-000",
            taskTitle: "Impl design home page",
            taskDescription: "bla bla bla",
            columnId: "ccc-000"
        },
        {
            taskId: "ttt-001",
            taskTitle: "create zustand store",
            taskDescription: "bla bla bla",
            columnId: "ccc-000"
        },
        {
            taskId: "ttt-002",
            taskTitle: "fix bug",
            taskDescription: "bla bla bla",
            columnId: "ccc-002"
        },
    ];
}

const defaultInitialState: TTask[] = [];

export const createTaskStore = (
    initState = defaultInitialState
) => {
    return createStore<TTaskStore>()((set) => {
        return (
            {
                tasks: [...initState],
                addTask: (columnId: string, taskTitle: string, taskDescription?: string) => {
                    set((state) => ({
                        tasks: [...state.tasks, { taskId: uuidv4(), taskTitle, taskDescription, columnId }]
                    }));
                },
                deleteTask: (taskId: string) => {
                    set((state) => ({
                        tasks: state.tasks.filter(task => task.taskId !== taskId)
                    }));
                }
            }
        );
    })
};