"use client"

import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import AddColumnDialog from "./AddColumnDialog";
import { DndContext } from "@dnd-kit/core";
import Columns from "./Columns";
import Column from "./Column";
import { useColumnStore } from "../_providers/column-store-provider";
import { useMemo, useState } from "react";

const KanbanBoard = ({ boardId }: { boardId: string }) => {

    const [openColumnDialog, setColumnDialog] = useState(false);

    // const columns = useColumnStore(state => state.columns);
    // let filtredColumns = useMemo(() => {
    //     return columns.filter(column => column.boardId == boardId);
    // }, [columns, boardId]);

    return (
        <div className="overflow-x-auto w-full h-full">
            <DndContext>
                <div className="flex gap-5 p-5 w-full">
                    {/* {filtredColumns.map((column, index) => {
                        return (
                            <Column key={index} {...column} />
                        );
                    })} */}
                    <Columns boardId={boardId} />
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
            </DndContext>
        </div>
    );
}

export default KanbanBoard;