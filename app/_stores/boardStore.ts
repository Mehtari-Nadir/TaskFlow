import { createStore } from "zustand";
import { v4 as uuidv4 } from "uuid";

export const initBoardStore = (): TBoard[] => {
    return [
        {boardId: "b-0", boardTitle: "TaskFlow"},
        {boardId: "b-1", boardTitle: "Project Management"},
        {boardId: "b-2", boardTitle: "Software Development"},
        {boardId: "b-3", boardTitle: "Marketing Campaign"},
        {boardId: "b-4", boardTitle: "Product Design"},
        {boardId: "b-5", boardTitle: "Customer Support"},
        {boardId: "b-6", boardTitle: "Human Resources"},
    ]
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