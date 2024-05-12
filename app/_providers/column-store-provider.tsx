"use client"

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { type StoreApi, useStore } from 'zustand'
import { createColumnStore, initColumnStore } from '../_stores/columnStore';

// ! If there is an error will be the type down here
export const ColumnStoreContext = createContext<StoreApi<TColumnStore> | null>(
    null,
)

export interface ColumnStoreProviderProps {
    children: ReactNode
}

export const ColumnStoreProvider = ({
    children,
}: ColumnStoreProviderProps) => {
    const storeRef = useRef<StoreApi<TColumnStore>>()
    if (!storeRef.current) {
        // storeRef.current = useBoardStore(initBoardStore())
        storeRef.current = createColumnStore(initColumnStore())
    }

    return (
        <ColumnStoreContext.Provider value={storeRef.current}>
            {children}
        </ColumnStoreContext.Provider>
    )
}

export const useColumnStore = <T,>(
    selector: (store: TColumnStore) => T,
): T => {
    const columnStoreContext = useContext(ColumnStoreContext)

    if (!columnStoreContext) {
        throw new Error(`useColumnStore must be use within ColumnStoreProvider`)
    }

    return useStore(columnStoreContext, selector)
}