"use client"

import CreateBoardBtn_home from "./CreateBoardBtn_home";
import { useBoardStore } from "../_providers/board-store-provider";
import BoardCard from "./BoardCard";

const BoardsContainer = () => {

    const boards = useBoardStore(state => state.boards);

    return (
        <div className="w-full flex items-start justify-start max-md:justify-center gap-3 flex-wrap p-10">
            {
                boards.map((board, index) => {
                    return (
                        <BoardCard key={index} {...board} />
                    );
                })
            }
            <CreateBoardBtn_home />
        </div>
    );
}

export default BoardsContainer;