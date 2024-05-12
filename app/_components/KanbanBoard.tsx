"use client"

import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { useMemo, useState } from "react";
import AddColumnDialog from "./AddColumnDialog";
import Column from "./Column";
import { useColumnStore } from "../_providers/column-store-provider";

const KanbanBoard = ({ boardId }: { boardId: string }) => {

    const [openColumnDialog, setColumnDialog] = useState(false);

    const columns = useColumnStore(state => state.columns);
    let filtredColumns = useMemo(() => {
        return columns.filter(column => column.boardId == boardId);
    }, [columns, boardId]);

    return (
        <div className="overflow-x-auto w-full h-full">
            <div className="flex gap-5 p-5 w-full">
                {filtredColumns.map((column, index) => {
                    return (
                        <Column key={index} {...column} />
                    );
                })}
                <Button onClick={() => setColumnDialog(true)} className="w-[250px]" variant={"outline"}>
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Add Column
                </Button>
                <AddColumnDialog
                    boardId={boardId}
                    openColumnDialog={openColumnDialog}
                    setColumnDialog={setColumnDialog}
                />
                <div
                    id="fix-padding-with-overflow"
                    className="clear-both p-3"
                ></div>
            </div>
        </div>
    );
}

export default KanbanBoard;