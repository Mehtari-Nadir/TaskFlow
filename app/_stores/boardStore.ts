import { createStore } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { persist, createJSONStorage } from "zustand/middleware";

export const initBoardStore = (): TBoard[] => {
    return [];
}

const supabase = createClientComponentClient();

const defaultInitialState: TBoard[] = [];

export const createBoardStore = (
    initState = defaultInitialState,
) => {
    return createStore<TBoardStore>()(
        persist(
            (set) => ({
                boards: [...initState],
                searchTerm: '',
                addBoard: (boardTitle: string, boardDescription?: string, boardColor?: string[]) => {
                    const newBoardId = uuidv4();
                    set((state) => ({
                        boards: [...state.boards, { boardId: newBoardId, boardTitle, boardDescription, boardColor }]
                    }))
                    return newBoardId;
                },
                deleteBoard: (boardId: string) => {
                    set((state) => ({
                        boards: state.boards.filter(board => board.boardId !== boardId)
                    }))
                },
                editBoard: (boardId: string, boardTitle: string, boardDescription?: string, boardColor?: string[]) => set(state => ({
                    boards: state.boards.map((board) => {
                        return board.boardId == boardId ? { ...board, boardTitle, boardDescription, boardColor } : board;
                    })
                })),
                setSearchTerm: (term: string) => {
                    set(({
                        searchTerm: term
                    }))
                },
                fetchBoards: async (userId: string) => {
                    try {
                        const { data: boards, error } = await supabase
                            .from('boards')
                            .select('*')
                            .eq('userId', userId);

                        if (error) {
                            throw new Error(error.message);
                        }

                        const fetchedBoards: TBoard[] = boards.map(({ boardId, boardTitle, boardColor, boardDescription }: TBoard) => ({
                            boardId: boardId,
                            boardTitle: boardTitle,
                            boardDescription: boardDescription || undefined,
                            boardColor: boardColor || undefined,
                        }));

                        set({ boards: fetchedBoards });

                        const boardIds: string[] = boards.map(board => board.boardId);
                        return boardIds;

                    } catch (err) {
                        console.error("Error fetching boards", err);
                    }
                }
            }),
            {
                name: "board-store", // name of the item in the storage (must be unique)
                // storage: createJSONStorage(() => sessionStorage)
                getStorage: () => localStorage,
                skipHydration: true,
            }
        )
    );
};