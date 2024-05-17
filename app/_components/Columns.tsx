import { SortableContext } from "@dnd-kit/sortable";
import { useColumnStore } from "../_providers/column-store-provider";
import { useMemo } from "react";
import Column from "./Column";
import React from "react";

const Columns = ({boardId}: {boardId: string}) => {

    const columns = useColumnStore(state => state.columns);

    const filtredColumns = useMemo(() => {
        return columns.filter(column => column.boardId == boardId);
    }, [columns, boardId]);

    const columnsIds = useMemo(() => {
        return filtredColumns.map((column) => {
            return column.columnId;
        })
    }, [filtredColumns]);

    return (
        <SortableContext items={columnsIds}>
            {filtredColumns.map((column, index) => {
                return (
                    <Column key={index} {...column} />
                );
            })}
        </SortableContext>
    );
}

export default Columns;