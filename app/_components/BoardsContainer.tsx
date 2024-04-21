import CreateBoardBtn_home from "./CreateBoardBtn_home";
import BoardCard from "./BoardCard";

const BoardsContainer = () => {
    return (
        <div className="flex items-center justify-start max-md:justify-center gap-3 flex-wrap p-10">
            <BoardCard />
            <BoardCard />
            <BoardCard />
            <BoardCard />
            <BoardCard />
            <BoardCard />
            <BoardCard />
            <CreateBoardBtn_home />
        </div>
    );
}

export default BoardsContainer;