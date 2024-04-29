"use client"

import Column from "./Column";
import AddColumnBtn from "./AddColumnBtn";
import { useColumnStore } from "../_providers/column-store-provider";
import { useMemo } from "react";

const KanbanBoard = ({ boardId }: { boardId: string }) => {

    const columns = useColumnStore(state => state.columns);
    const filtredColumns = useMemo(() => {
        return columns.filter(column => column.boardId == boardId);
    }, [boardId]);

    return (
        <div className="overflow-x-auto w-full">
            <div className="flex gap-5 p-5 w-full">
                {filtredColumns.map((value, index) => {
                    return (
                        <Column key={index} {...value} />
                    );
                })}
                <AddColumnBtn />
                <div
                    id="fix-padding-with-overflow"
                    className="clear-both p-3"
                ></div>
            </div>
        </div>
    );
}

export default KanbanBoard;