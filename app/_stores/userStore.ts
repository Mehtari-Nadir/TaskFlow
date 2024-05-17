import { createStore } from "zustand";
import { v4 as uuidv4 } from "uuid";

export const initUserStore = (): TUser[] => {
    return []
}

const defaultInitialState: TUser[] = [];

export const createUserStore = (
    initState = defaultInitialState
) => {
    return createStore<TUserStore>()((set) => {
        return (
            {
                users: [...initState],
            }
        );
    });
};