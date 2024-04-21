import Navbar from "@/app/_components/Navbar";
import BoardsContainer from "@/app/_components/BoardsContainer";

const homePage = () => {
    return (
        <main className="w-full min-h-screen">
            <Navbar />
            <div className="w-full flex items-center justify-center">
                <BoardsContainer />
            </div>
        </main>
    );
}

export default homePage;