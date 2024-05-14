import { createStore } from "zustand";
import { v4 as uuidv4 } from "uuid";

export const initBoardStore = (): TBoard[] => {
    return []
}

const defaultInitialState: TBoard[] = [];

export const createBoardStore = (
    initState = defaultInitialState
) => {
    return createStore<TBoardStore>()((set) => {
        return (
            {
                boards: [...initState],
                searchTerm: '',
                addBoard: (boardTitle: string, boardDescription?: string) => {
                    set((state) => ({
                        boards: [...state.boards, { boardId: uuidv4(), boardTitle, boardDescription, isStarred: false }]
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
                            return board.boardId == boardId ? {...board, boardTitle, boardDescription} : board;
                        })
                    }));
                },
                setSearchTerm: (term: string) => {
                    set( ({
                        searchTerm: term
                    }))
                },
            }
        );
    });
};