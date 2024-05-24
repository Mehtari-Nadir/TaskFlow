import { createStore } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

export const initTaskStore = (): TTask[] => {
    return [
        {
            taskId: "t-0",
            columnId: "c-0",
            taskTitle: "Impl Design",
            taskDescription: "use figma",
            // dueDate: null,
            // priority: null
        },
        {
            taskId: "t-1",
            columnId: "c-2",
            taskTitle: "Fix Ai",
            taskDescription: "use next ai sdk",
            // dueDate: null,
            // priority: null
        }
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
                addTask: (columnId: string, taskTitle: string, taskDescription?: string, dueDate?: Date, priority?: Priority) => {
                    set((state) => ({
                        tasks: [...state.tasks, { taskId: uuidv4(), taskTitle, taskDescription, columnId, dueDate, priority }]
                    }));
                },
                deleteTask: (taskId: string) => {
                    set((state) => ({
                        tasks: state.tasks.filter(task => task.taskId !== taskId)
                    }));
                },
                editTask: (taskId: string, taskTitle: string, taskDescription?: string, dueDate?: Date, priority?: Priority) => {
                    set(state => ({
                        tasks: state.tasks.map((task) => {
                            return task.taskId == taskId ? {...task, taskTitle, taskDescription, dueDate, priority} : task;
                        })
                    }));
                }
            }
        );
    })
};