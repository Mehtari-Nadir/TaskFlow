import { createStore } from "zustand";
import { v4 as uuidv4 } from "uuid";

export const initBoardStore = (): TBoard[] => {
    return [
        { boardId: "bbb-000", boardTitle: "TaskFlow code", boardDescription: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make" },
        { boardId: "bbb-001", boardTitle: "TaskFlow design", boardDescription: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make" },
        { boardId: "bbb-002", boardTitle: "Atqin", boardDescription: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make" },
        { boardId: "bbb-003", boardTitle: "Stackintech", boardDescription: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage" },
        { boardId: "bbb-004", boardTitle: "E-learn", boardDescription: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage" },
        { boardId: "bbb-005", boardTitle: "university", boardDescription: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage" },
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
                }
            }
        );
    });
};