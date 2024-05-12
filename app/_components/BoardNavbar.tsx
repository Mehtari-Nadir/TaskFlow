"use client"

import StackedAvatars from "./StackedAvatars";
import { Button } from "@/components/ui/button";
import { Share1Icon } from "@radix-ui/react-icons";
import { useMemo } from "react";
import { useBoardStore } from "../_providers/board-store-provider";
import { RiSparklingFill } from "react-icons/ri";

const BoardNavbar = ({ boardId }: { boardId: string }) => {

    const boards = useBoardStore(state => state.boards);
    const filtredBoard = useMemo(() => {
        return boards.filter(board => board.boardId == boardId);
    }, [boardId]);

    return (
        <nav
            className="w-full bg-[#092327] flex items-center justify-between py-2 px-5 border-b-[1px]"
        >
            <div className="flex items-center justify-center gap-x-3">
                <h1 className="font-bold text-2xl">{filtredBoard[0].boardTitle}</h1>
            </div>
            <div className="flex items-center justify-center gap-x-2">
                <StackedAvatars />
                <Button size={"icon"} variant={"outline"}>
                    <RiSparklingFill size={20} color="gold" />
                </Button>
                <Button variant={"outline"}>
                    <Share1Icon className="mr-2 h-4 w-4" />
                    Share
                </Button>
            </div>
        </nav>
    );
}

export default BoardNavbar;