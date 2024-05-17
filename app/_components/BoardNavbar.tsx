"use client"

import StackedAvatars from "./StackedAvatars";
import { Button } from "@/components/ui/button";
import { Share1Icon } from "@radix-ui/react-icons";
import { useMemo, useState } from "react";
import { useBoardStore } from "../_providers/board-store-provider";
import { RiSparklingFill } from "react-icons/ri";
import AiDialog from "./AiDialog";

const BoardNavbar = ({ boardId }: { boardId: string }) => {

    const [open, setOpen] = useState(false);

    const boards = useBoardStore(state => state.boards);
    const filtredBoard = useMemo(() => {
        return boards.filter(board => board.boardId == boardId);
    }, [boardId, boards]);

    return (
        <nav
            className="w-full bg-[#092327] flex items-center justify-between py-4 px-5 border-b-[1px]"
        >
            <div className="flex items-center justify-center gap-x-3">
                <h1 className="text-white font-bold text-2xl">{filtredBoard[0].boardTitle}</h1>
            </div>
            <div className="flex items-center justify-center gap-x-2">
                <StackedAvatars />
                <Button onClick={() => setOpen(true)} size={"icon"} variant={"outline"}>
                    <RiSparklingFill size={20} color="gold" />
                </Button>
                <AiDialog open={open} setOpen={setOpen} />
                <Button variant={"outline"}>
                    <Share1Icon className="mr-2 h-4 w-4" />
                    Share
                </Button>
            </div>
        </nav>
    );
}

export default BoardNavbar;