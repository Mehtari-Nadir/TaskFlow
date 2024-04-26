import BoardNavbar from "@/app/_components/BoardNavbar";

const boardPage = ({params}: {params: {boardId: string}}) => {
    
    return (
        <main>
            <BoardNavbar />
        </main>
    );
}

export default boardPage;