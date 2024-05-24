import { createStore } from "zustand";
import { v4 as uuidv4 } from "uuid";

export const initUserStore = (): TUser[] => {
    return [
        {userId: "u-0", username: "Nadir", userEmail: "nadir@gmail.com", userPassword: "Nadir45!"},
        {userId: "u-1", username: "Mohammed", userEmail: "mohammed@gmail.com", userPassword: "Mohammed45!"},
    ]
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