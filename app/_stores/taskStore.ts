import { createStore } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { persist } from "zustand/middleware";

export const initTaskStore = (): TTask[] => {
    return [];
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
                draggedTask: null,
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
                },
                setDraggedTask: (taskId: string | null) => {
                    set({ draggedTask: taskId });
                },
                updateTask: async (taskId: string, columnId: string) => {
                    set(state => ({
                        tasks: state.tasks.map((task) => {
                            return task.taskId == taskId ? { ...task, columnId } : task;
                        })
                    }));
                    try {
                        const { error } = await supabase
                            .from('tasks')
                            .update({ columnId })
                            .eq('taskId', taskId);
                        if (error) throw error;
                    } catch (error) {
                        console.log("error updating task ", error);
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