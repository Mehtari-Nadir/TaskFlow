"use client"
import CreateBoardBtn_home from "./CreateBoardBtn_home";
import { useBoardStore } from "../_providers/board-store-provider";
import BoardCard from "./BoardCard";
import { Input } from "@/components/ui/input";
import { useEffect, useMemo } from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion"
const BoardsContainer = () => {

    const { boards, searchTerm, setSearchTerm } = useBoardStore(state => ({
        boards: state.boards,
        searchTerm: state.searchTerm,
        setSearchTerm: state.setSearchTerm
    }));

    const filteredBoards = useMemo(() =>
        boards.filter(({ boardTitle }: TBoard) =>
            boardTitle.toLowerCase().includes(searchTerm.toLowerCase())
        ), [boards, searchTerm]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value);

    return (
        <>
            <div className="flex justify-end mx-6 mt-6 relative">
                <Input className="w-full md:w-1/3" placeholder="Search boards..." value={searchTerm} onChange={handleSearch} />
                <Search size={20} className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-3" />
            </div>
            <div className="w-full flex items-center justify-center">
                <motion.div layout className="w-full flex items-start justify-start max-md:justify-center gap-4 flex-wrap p-6">
                    {
                        filteredBoards.map((board: TBoard) => {
                            return (
                                <BoardCard key={board.boardId} {...board} />
                            );
                        })
                    }
                    {(!!filteredBoards.length && !!searchTerm) || <CreateBoardBtn_home key="create-board-btn" />}
                </motion.div>
            </div>
        </>
    );
}

export default BoardsContainer;