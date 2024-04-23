"use client"

import CreateBoardBtn_home from "./CreateBoardBtn_home";
import BoardCard from "./BoardCard";
import { useBoardStore } from "../_providers/board-store-provider";

const BoardsContainer = () => {

    const boards = useBoardStore(state => state.boards);

    return (
        <div className="flex items-center justify-start max-md:justify-center gap-3 flex-wrap p-10">
            {boards.map((_, index) => {
                return (
                    <BoardCard key={index} />
                );
            })}
            <CreateBoardBtn_home />
        </div>
    );
}

export default BoardsContainer;