import BoardNavbar from "@/app/_components/BoardNavbar";
import KanbanBoard from "@/app/_components/KanbanBoard";

const boardPage = ({params}: {params: {boardId: string}}) => {
    
    return (
        <main className="w-full">
            <BoardNavbar boardId={params.boardId} />
            <KanbanBoard boardId={params.boardId} />
        </main>
    );
}

export default boardPage;