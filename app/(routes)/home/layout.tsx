import Navbar from "@/app/_components/Navbar";
import { BoardStoreProvider } from "@/app/_providers/board-store-provider";
import { ColumnStoreProvider } from "@/app/_providers/column-store-provider";
import { TaskStoreProvider } from "@/app/_providers/task-store-provider";
import { Toaster } from "@/components/ui/sonner"

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <BoardStoreProvider>
                <Navbar />
                <ColumnStoreProvider>
                    <TaskStoreProvider>
                        {children}
                    </TaskStoreProvider>
                </ColumnStoreProvider>
            </BoardStoreProvider>
            <Toaster />
        </>
    );
}

export default HomeLayout;