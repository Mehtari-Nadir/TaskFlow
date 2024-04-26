import { createStore } from "zustand";
import { v4 as uuidv4 } from "uuid";

export const initBoardStore = (): TBoard[] => {
    return [
        { boardId: "bbb-000", boardTitle: "TaskFlow code", boardDescription: "bla bla bla" },
        { boardId: "bbb-001", boardTitle: "TaskFlow design", boardDescription: "bla bla bla" },
        { boardId: "bbb-002", boardTitle: "Atqin", boardDescription: "bla bla bla" },
        { boardId: "bbb-003", boardTitle: "Stackintech", boardDescription: "bla bla bla" },
        { boardId: "bbb-004", boardTitle: "E-learn", boardDescription: "bla bla bla" },
        { boardId: "bbb-005", boardTitle: "university", boardDescription: "bla bla bla" },
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
                addBoard: (boardTitle: string, boardDescription?: string) => {
                    set((state) => ({
                        boards: [...state.boards, { boardId: uuidv4(), boardTitle, boardDescription }]
                    }))
                },
                deleteBoard: (boardId: string) => {
                    set((state) => ({
                        boards: state.boards.filter(board => board.boardId !== boardId)
                    }))
                }
            }
        );
    });
};