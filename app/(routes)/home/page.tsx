import BoardsContainer from "@/app/_components/BoardsContainer";
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Home',
}

const HomePage = () => {
    return (
        <main className="w-full">
            <BoardsContainer />
        </main>
    );
}

export default HomePage;