const boardPage = ({params}: {params: {boardId: string}}) => {
    
    return (
        <main>
            {params.boardId}
        </main>
    );
}

export default boardPage;