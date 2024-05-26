import { createStore } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { persist } from "zustand/middleware";

export const initUserStore = (): TUser[] => {
    return [
        // { userId: "u-0", username: "Nadir", userEmail: "nadir@gmail.com", userPassword: "Nadir45!" },
    ]
}

const defaultInitialState: TUser[] = [];

const supabase = createClientComponentClient();

export const createUserStore = (
    initState = defaultInitialState
) => {
    return createStore<TUserStore>()(
        persist(
            (set) => ({
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
                fetchUser: async (userId: string) => {
                    try {
                        const { data: user, error } = await supabase
                            .from('users')
                            .select('*')
                            .eq('userId', userId);

                        if (error) {
                            throw new Error(error.message);
                        }

                        // set((state) => ({
                        //     users: [...state.users, ...user]
                        // }))
                        set({users: user});

                    } catch (error) {
                        console.log("error fetching user ", error);
                    }
                }
            }),
            {
                name: "user-store",
                skipHydration: true,
                getStorage: () => localStorage,
            }
        )
    );
};