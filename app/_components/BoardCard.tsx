"use client";
import Link from "next/link";
import BoardCardMenu from "./BoardCardMenu";
import { AnimatePresence, motion } from "framer-motion";
import { Noise } from "@/components/ui/wobble-card";
const BoardCard = ({ boardId, boardTitle, boardDescription, boardColor }: TBoard) => {
    return (
        <AnimatePresence>
            <motion.div
                layout
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            >
                <div className="relative overflow-hidden flex items-start justify-between w-[250px] h-[130px] p-3 rounded-md shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)]"
                    style={{
                        backgroundImage: `linear-gradient(to right top, ${boardColor?.map(color => color).join(",")})`
                    }}>
                    <Noise />
                    <Link
                        href={`/home/board/${boardId}`}
                    >
                        <h1 className="text-lg text-balance font-bold truncate">{boardTitle}</h1>
                    </Link>
                    <BoardCardMenu
                        boardId={boardId}
                        boardDescription={boardDescription}
                        boardTitle={boardTitle}
                    />
                </div>
            </motion.div>
        </AnimatePresence>
    );
}

export default BoardCard;