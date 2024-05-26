import { BoardStoreProvider } from "../_providers/board-store-provider";
import { ColumnStoreProvider } from "../_providers/column-store-provider";
import { TaskStoreProvider } from "../_providers/task-store-provider";
import { UserStoreProvider } from "../_providers/user-store-provider";

export default function Home({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <UserStoreProvider>
        <BoardStoreProvider>
          <ColumnStoreProvider>
            <TaskStoreProvider>
              {children}
            </TaskStoreProvider>
          </ColumnStoreProvider>
        </BoardStoreProvider>
      </UserStoreProvider>
    </main>
  );
}