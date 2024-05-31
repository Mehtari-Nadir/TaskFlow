import { createStore } from "zustand";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { persist } from "zustand/middleware";

export const initUserStore = (): TUser[] => {
    return []
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
                addUser: (
                    userId: string,
                    username: string,
                    userEmail: string,
                    userPassword: string,
                    userPic: string = "/assets/default-avatar.svg"
                ) => {
                    set((state) => ({
                        users: [
                            ...state.users,
                            { userId, username, userEmail, userPassword, userPic },
                        ],
                    }));
                },
                updateUser: (
                    userId: string,
                    username: string,
                    userEmail: string,
                    userPassword: string,
                    userPic: string = "/assets/default-avatar.svg"
                ) => {
                    set((state) => {
                        const updatedUsers = state.users.map((user: TUser) =>
                            user.userId === userId
                                ? { userId, username, userEmail, userPassword, userPic }
                                : user
                        );
                        return { users: updatedUsers };
                    });
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
                        const fetchedUsers: TUser[] = user.map(
                            ({ userId, userEmail, userPassword, username, userPic }: TUser) => ({
                                userId,
                                username,
                                userEmail,
                                userPassword,
                                userPic: userPic || undefined,
                            })
                        );
                        set({ users: fetchedUsers });
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