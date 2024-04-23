"use client"

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { type StoreApi, useStore } from 'zustand'
import { createTaskStore, initTaskStore } from '../_stores/taskStore';

// ! If there is an error will be the type down here
export const TaskStoreContext = createContext<StoreApi<TTaskStore> | null>(
    null,
)

export interface TaskStoreProviderProps {
    children: ReactNode
}

export const TaskStoreProvider = ({
    children,
}: TaskStoreProviderProps) => {
    const storeRef = useRef<StoreApi<TTaskStore>>()
    if (!storeRef.current) {
        // storeRef.current = useBoardStore(initBoardStore())
        storeRef.current = createTaskStore(initTaskStore())
    }

    return (
        <TaskStoreContext.Provider value={storeRef.current}>
            {children}
        </TaskStoreContext.Provider>
    )
}

export const useTaskStore = <T,>(
    selector: (store: TTaskStore) => T,
): T => {
    const taskStoreContext = useContext(TaskStoreContext)

    if (!taskStoreContext) {
        throw new Error(`useTaskStore must be use within TaskStoreProvider`)
    }

    return useStore(taskStoreContext, selector)
}