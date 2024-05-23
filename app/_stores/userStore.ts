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
                addUser: (userId: string, username: string, userEmail: string, userPassword: string) => {
                    set((state) => ({
                        users: [...state.users, { userId, username, userEmail, userPassword }]
                    }))
                },
                removeUser: (userId: string) => {
                    set((state) => ({
                        users: state.users.filter(user => user.userId !== userId),
                    }));
                },
            }
        );
    });
};