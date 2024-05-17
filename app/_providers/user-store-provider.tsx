"use client"

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { type StoreApi, useStore } from 'zustand'
import { createUserStore, initUserStore } from '../_stores/userStore'

// ! If there is an error will be the type down here
export const UserStoreContext = createContext<StoreApi<TUserStore> | null>(
    null,
)

export interface UserStoreProviderProps {
    children: ReactNode
}

export const UserStoreProvider = ({
    children,
}: UserStoreProviderProps) => {
    const storeRef = useRef<StoreApi<TUserStore>>()
    if (!storeRef.current) {
        // storeRef.current = useBoardStore(initBoardStore())
        storeRef.current = createUserStore(initUserStore())
    }

    return (
        <UserStoreContext.Provider value={storeRef.current}>
            {children}
        </UserStoreContext.Provider>
    )
}

export const useUserStore = <T,>(
    selector: (store: TUserStore) => T,
): T => {
    const userStoreContext = useContext(UserStoreContext)

    if (!userStoreContext) {
        throw new Error(`useUserStore must be use within UserStoreProvider`)
    }

    return useStore(userStoreContext, selector)
}