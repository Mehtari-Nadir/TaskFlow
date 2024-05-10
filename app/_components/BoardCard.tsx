import { DropdownMenuIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import BoardCardMenu from "./BoardCardMenu";

const BoardCard = ({ boardId, boardTitle, boardDescription }: { boardId: string, boardTitle: string, boardDescription?: string }) => {

    // "#2e3192, #0068c7, #009ce8, #00cff9, #1bffff",
    // "#d4145a, #e8434d, #f56941, #fb8d3a, #fbb03b",
    // "#009245, #50ac3f, #86c435, #bfda28, #fcee21",
    // "#662d8c, #8c288e, #b0218c, #d01b84, #ed1e79",
    // "#764ba2, #7657b4, #7364c6, #6e71d8, #667eea"

    return (
        <div
            className="flex items-start justify-between w-[250px] h-[130px] p-3 rounded-md"
            style={{
                backgroundImage: `linear-gradient(to right top, #764ba2, #7657b4, #7364c6, #6e71d8, #667eea`
                // backgroundImage: `linear-gradient(to right top, ${colors[random]})`
            }}
        >
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
    );
}

export default BoardCard;