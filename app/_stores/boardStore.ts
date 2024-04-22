import { createStore } from "zustand";
import { v4 as uuidv4 } from "uuid";

export const initBoardStore = (): TBoard[] => {
    return [
        { boardId: "bbb-000", boardTitle: "Board One", boardDescription: "bla bla bla" }
    ]
}

const defaultInitialState: TBoard[] = [
    { boardId: "bbb-000", boardTitle: "Board One", boardDescription: "bla bla bla" },
];

export const useBoardStore = (
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