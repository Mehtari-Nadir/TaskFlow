import { createStore } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const initBoardStore = (): TBoard[] => {
    return [
        // {
        //     boardDescription: undefined,
        //     boardId: "86e27dda-e25b-4f80-9cc0-42b5c02d742e",
        //     boardTitle: "Test board",
        //     userId:"50fc6576-e81d-4c85-b08b-a834f32c6812",
        // }
    ]
}

const supabase = createClientComponentClient();

const defaultInitialState: TBoard[] = [];

export const createBoardStore = (
    initState = defaultInitialState,
) => {
    return createStore<TBoardStore>()((set) => {
        return (
            {
                boards: [...initState],
                searchTerm: '',
                addBoard: (boardTitle: string, boardDescription?: string) => {
                    set((state) => ({
                        boards: [...state.boards, { boardId: uuidv4(), boardTitle, boardDescription }]
                    }))
                },
                deleteBoard: (boardId: string) => {
                    set((state) => ({
                        boards: state.boards.filter(board => board.boardId !== boardId)
                    }))
                },
                editBoard: (boardId: string, boardTitle: string, boardDescription?: string) => {
                    set(state => ({
                        boards: state.boards.map((board) => {
                            return board.boardId == boardId ? { ...board, boardTitle, boardDescription } : board;
                        })
                    }));
                },
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
                        console.log(boards);
                        // set(({ boards: boards }));
                    } catch (err) {
                        console.error("Error fetching boards", err);
                    }
                }
            }
        );
    });
};