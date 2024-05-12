"use client"

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { type StoreApi, useStore } from 'zustand'
import { createBoardStore, initBoardStore } from '../_stores/boardStore';

// ! If there is an error will be the type down here
export const BoardStoreContext = createContext<StoreApi<TBoardStore> | null>(
    null,
)

export interface BoardStoreProviderProps {
    children: ReactNode
}

export const BoardStoreProvider = ({
    children,
}: BoardStoreProviderProps) => {
    const storeRef = useRef<StoreApi<TBoardStore>>()
    if (!storeRef.current) {
        // storeRef.current = useBoardStore(initBoardStore())
        storeRef.current = createBoardStore(initBoardStore())
    }

    return (
        <BoardStoreContext.Provider value={storeRef.current}>
            {children}
        </BoardStoreContext.Provider>
    )
}

export const useBoardStore = <T,>(
    selector: (store: TBoardStore) => T,
): T => {
    const boardStoreContext = useContext(BoardStoreContext)

    if (!boardStoreContext) {
        throw new Error(`useBoardStore must be use within BoardStoreProvider`)
    }

    return useStore(boardStoreContext, selector)
}