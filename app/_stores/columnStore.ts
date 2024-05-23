import { createStore } from "zustand";
import { v4 as uuidv4 } from 'uuid';

export const initColumnStore = (): TColumn[] => {
    return [];
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