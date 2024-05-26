"use client"

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { type StoreApi, useStore } from 'zustand'
import { createTaskStore, initTaskStore } from '../_stores/taskStore';
import { useState, useEffect } from 'react';

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
    const [isMounted, setIsMounted] = useState(false);

    if (!storeRef.current) {
        // storeRef.current = useBoardStore(initBoardStore())
        storeRef.current = createTaskStore(initTaskStore())
    }

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null; // Avoid rendering until the component is mounted
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