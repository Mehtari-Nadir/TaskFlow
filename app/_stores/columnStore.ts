import { createStore } from "zustand";
import { v4 as uuidv4 } from 'uuid';

export const initColumnStore = (): TColumn[] => {
    return [
        {
            columnId: "ccc-000",
            boardId: "bbb-000",
            columnTitle: "TODO",
        },
        {
            columnId: "ccc-002",
            boardId: "bbb-000",
            columnTitle: "DONE",
        },
    ];
}

const defaultInitialState: TColumn[] = [];

export const createColumnStore = (
    initState = defaultInitialState
) => {
    return createStore<TColumnStore>()((set) => {
        return (
            {
                columns: [...initState],
                addColumn: (boardId: string, columnTitle: string) => {
                    set((state) => ({
                        columns: [...state.columns, { boardId, columnTitle, columnId: uuidv4() }],
                    }));
                },
                deleteColumn: (columnId: string) => {
                    set((state) => ({
                        columns: state.columns.filter(column => column.columnId !== columnId),
                    }));
                }
            }
        );
    })
};