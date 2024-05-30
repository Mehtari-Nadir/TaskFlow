import { createStore } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { persist } from "zustand/middleware";

export const initTaskStore = (): TTask[] => {
    return [
        // {
        //     taskId: "t-0",
        //     columnId: "c-0",
        //     taskTitle: "Impl Design",
        //     taskDescription: "use figma",
        //     // dueDate: null,
        //     // priority: null
        // },
        // {
        //     taskId: "t-1",
        //     columnId: "c-2",
        //     taskTitle: "Fix Ai",
        //     taskDescription: "use next ai sdk",
        //     // dueDate: null,
        //     // priority: null
        // }
    ];
}

const supabase = createClientComponentClient();

const defaultInitialState: TTask[] = [];

export const createTaskStore = (
    initState = defaultInitialState
) => {
    return createStore<TTaskStore>()(
        persist(
            (set) => ({
                tasks: [...initState],
                addTask: (columnId: string, taskTitle: string, taskDescription?: string, dueDate?: Date, priority?: Priority, taskId: string = uuidv4()) => {
                    set((state) => ({
                        tasks: [...state.tasks, { taskId, taskTitle, taskDescription, columnId, dueDate, priority }]
                    }));
                    return taskId;
                },
                deleteTask: (taskId: string) => {
                    set((state) => ({
                        tasks: state.tasks.filter(task => task.taskId !== taskId)
                    }));
                },
                editTask: (taskId: string, taskTitle: string, taskDescription?: string, dueDate?: Date, priority?: Priority) => {
                    set(state => ({
                        tasks: state.tasks.map((task) => {
                            return task.taskId == taskId ? { ...task, taskTitle, taskDescription, dueDate, priority } : task;
                        })
                    }));
                },
                fetchTasks: async (columnIds: string[]) => {
                    try {
                        const { data: tasks, error } = await supabase
                            .from("tasks")
                            .select("*")
                            .in("columnId", columnIds);

                        if (error) {
                            throw new Error(error.message);
                        }

                        const fetchedTasks: TTask[] = tasks.map(
                            ({
                                taskId,
                                taskTitle,
                                taskDescription,
                                dueDate,
                                columnId,
                                priority,
                            }: TTask) => ({
                                taskId,
                                taskTitle,
                                taskDescription: taskDescription || undefined,
                                dueDate: dueDate ? new Date(dueDate) : undefined,
                                columnId,
                                priority: priority || undefined,
                            })
                        );

                        set({ tasks: fetchedTasks })

                    } catch (error) {
                        console.log("error fetching tasks ", error);
                    }
                }
            }),
            {
                name: "task-store",
                skipHydration: true,
                getStorage: () => localStorage
            }
        )
    )
};