import BoardsContainer from "@/app/_components/BoardsContainer";
import { BoardStoreProvider } from "@/app/_providers/board-store-provider";

const homePage = () => {
    return (
        <main className="w-full min-h-screen">
            <div className="w-full flex items-center justify-center">
                <BoardStoreProvider>
                    <BoardsContainer />
                </BoardStoreProvider>
            </div>
        </main>
    );
}

export default homePage;