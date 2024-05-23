import { BoardStoreProvider } from "../_providers/board-store-provider";

export default function Home({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <BoardStoreProvider>
        {children}
      </BoardStoreProvider>
    </main>
  );
}