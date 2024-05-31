import BoardNavbar from "@/app/_components/BoardNavbar";
import KanbanBoard from "@/app/_components/KanbanBoard";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Metadata } from 'next';

type Props = {
    params: { boardId: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const supabase = createClientComponentClient();
    const { data: board } = await supabase
        .from('boards')
        .select('boardTitle')
        .eq('boardId', params.boardId)
        .single();

    return {
        title: board ? board.boardTitle : 'Board not found',
    };
}
const boardPage = ({ params }: Props) => {
    return (
        <main className="w-full">
            <BoardNavbar boardId={params.boardId} />
            <KanbanBoard boardId={params.boardId} />
        </main>
    );
}

export default boardPage;