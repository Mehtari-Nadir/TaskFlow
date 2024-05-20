"use client";
import Link from "next/link";
import BoardCardMenu from "./BoardCardMenu";
import { AnimatePresence, motion } from "framer-motion"
const BoardCard = ({ boardId, boardTitle, boardDescription }: { boardId: string, boardTitle: string, boardDescription?: string }) => {

    // "#2e3192, #0068c7, #009ce8, #00cff9, #1bffff",
    // "#d4145a, #e8434d, #f56941, #fb8d3a, #fbb03b",
    // "#009245, #50ac3f, #86c435, #bfda28, #fcee21",
    // "#662d8c, #8c288e, #b0218c, #d01b84, #ed1e79",
    // "#764ba2, #7657b4, #7364c6, #6e71d8, #667eea"

    return (
        <AnimatePresence>
            <motion.div
                layout
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
            >
                <div className="flex items-start justify-between w-[250px] h-[130px] p-3 rounded-md shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)]"
                    style={{
                        backgroundImage: `linear-gradient(to right top, #764ba2, #7657b4, #7364c6, #6e71d8, #667eea`
                        // backgroundImage: `linear-gradient(to right top, ${colors[random]})`
                    }}>
                    <Link
                        href={`/home/board/${boardId}`}
                    >
                        <h1 className="text-lg font-bold truncate">{boardTitle}</h1>
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