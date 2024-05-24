import { createStore } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const initBoardStore = (): TBoard[] => {
    return [
        {boardId: 'b-0', boardTitle: "TaskFlow", boardDescription: "test board one"},
        {boardId: 'b-1', boardTitle: "StackIntech", boardDescription: "test board two"},
        
        {boardId: 'b-2', boardTitle: "University", boardDescription: "test board three"},
    ];
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
                        const newData = boards.map((board) => {
                            return {
                                boardId: board.boardId,
                                board: board.boardId,
                            }
                        })
                        // set(({ boards: boards }));
                    } catch (err) {
                        console.error("Error fetching boards", err);
                    }
                }
            }
        );
    });
};