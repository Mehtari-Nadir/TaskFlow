import Navbar from "@/app/_components/Navbar";
import { BoardStoreProvider } from "@/app/_providers/board-store-provider";
import { ColumnStoreProvider } from "@/app/_providers/column-store-provider";
import { TaskStoreProvider } from "@/app/_providers/task-store-provider";
import { UserStoreProvider } from "@/app/_providers/user-store-provider";
import { Toaster } from "@/components/ui/sonner"

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";

const HomeLayout = async ({ children }: { children: React.ReactNode }) => {

    const cookieStore = cookies();
    const supabase = createServerComponentClient({ cookies: () => cookieStore });
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return (
            <main className="w-full h-screen flex items-center justify-center">
                <Link href={"/login"}>You are not logged in. click here to go login.</Link>
            </main>
        );
    }

    return (
        <>
            <UserStoreProvider>
                <BoardStoreProvider>
                    <Navbar />
                    <ColumnStoreProvider>
                        <TaskStoreProvider>
                            {children}
                        </TaskStoreProvider>
                    </ColumnStoreProvider>
                </BoardStoreProvider>
            </UserStoreProvider>
            <Toaster richColors />
        </>
    );
}

export default HomeLayout;