"use client"

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { type StoreApi, useStore } from 'zustand'
import { useBoardStore, initBoardStore } from '../_stores/boardStore';

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
        storeRef.current = useBoardStore(initBoardStore())
    }

    return (
        <BoardStoreContext.Provider value={storeRef.current}>
            {children}
        </BoardStoreContext.Provider>
    )
}

export const useCounterStore = <T,>(
    selector: (store: TBoardStore) => T,
): T => {
    const boardStoreContext = useContext(BoardStoreContext)

    if (!boardStoreContext) {
        throw new Error(`useCounterStore must be use within CounterStoreProvider`)
    }

    return useStore(boardStoreContext, selector)
}