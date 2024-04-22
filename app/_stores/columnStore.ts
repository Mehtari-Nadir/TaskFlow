import { createStore } from "zustand";
import { v4 as uuidv4 } from 'uuid';

const defaultInitialState: TColumn[] = [
    {
        columnId: "ccc-000",
        boardId: "bbb-000",
        columnTitle: "TODO",
    },
    {
        columnId: "ccc-001",
        boardId: "bbb-000",
        columnTitle: "DOING",
    },
    {
        columnId: "ccc-002",
        boardId: "bbb-000",
        columnTitle: "DONE",
    },
];

const useColumnStore = (
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
}

export default useColumnStore;