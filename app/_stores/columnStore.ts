import { createStore } from "zustand";
import { v4 as uuidv4 } from 'uuid';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { persist } from "zustand/middleware";

export const initColumnStore = (): TColumn[] => {
    return [
        // { columnId: "c-0", columnTitle: "Backlogs", boardId: "b-0" },
        // { columnId: "c-1", columnTitle: "Testing", boardId: "b-0" },

        // { columnId: "c-2", columnTitle: "Review", boardId: "b-2" },
    ];
}

const supabase = createClientComponentClient();

const defaultInitialState: TColumn[] = [];

export const createColumnStore = (
    initState = defaultInitialState
) => {
    return createStore<TColumnStore>()(
        persist(
            (set) => ({
                columns: [...initState],
                draggedColumn: null,
                addColumn: (boardId: string, columnTitle: string) => {
                    set((state) => ({
                        columns: [...state.columns, { boardId, columnTitle, columnId: uuidv4() }],
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
                },
                fetchColumns: async (boardsIds: string[]) => {
                    try {
                        const { data: columns, error } = await supabase
                            .from("columns")
                            .select("*")
                            .in("boardId", boardsIds);

                        if (error) {
                            throw new Error(error.message);
                        }

                        set({columns: columns});

                        const columnIds: string[] = columns.map(column => column.columnId);
                        return columnIds;

                    } catch (err) {
                        console.log("Error fetching columns ", err);
                    }
                }
            }),
            {
                name: "column-store",
                skipHydration: true,
                getStorage: () => localStorage,
            }
        )
    )
};