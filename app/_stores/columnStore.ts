import { createStore } from "zustand";
import { v4 as uuidv4 } from 'uuid';

export const initColumnStore = (): TColumn[] => {
    return [
        {columnId: "c-0", columnTitle: "Backlogs", boardId: "b-0"},
        {columnId: "c-1", columnTitle: "Testing", boardId: "b-0"},

        {columnId: "c-2", columnTitle: "Review", boardId: "b-2"},
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
                draggedColumn: null,
                addColumn: (boardId: string, columnTitle: string, columnId?: string) => {
                    set((state) => ({
                        columns: [...state.columns, { boardId, columnTitle, columnId: columnId ?? uuidv4() }],
                    }));
                },
                deleteColumn: (columnId: string) => {
                    set((state) => ({
                        columns: state.columns.filter(column => column.columnId !== columnId),
                    }));
                },
                editColumn: (columnId: string, columnTitle: string) => {
                    set(state => ({
                        columns: state.columns.map(column => {
                            return column.columnId == columnId ? { ...column, columnTitle } : column;
                        })
                    }))
                },
                dragColumn: (columnId: string | null) => {
                    set(() => ({
                        draggedColumn: columnId,
                    }));
                }
            }
        );
    })
};