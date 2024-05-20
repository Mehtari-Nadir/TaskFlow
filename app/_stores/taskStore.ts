import { createStore } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

export const initTaskStore = (): TTask[] => {
    return [
        {columnId: "c-0", taskId: "t-0", taskTitle: "Learn react"}
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
                addTask: (columnId: string, taskTitle: string, taskDescription?: string, dueDate?: Date, priority?: Priority, taskId?: string) => {
                    set((state) => ({
                        tasks: [...state.tasks, { taskId: taskId ?? uuidv4(), taskTitle, taskDescription, columnId, dueDate, priority }]
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