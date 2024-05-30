import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar"
import { useBoardStore } from "../_providers/board-store-provider";
import Link from "next/link";

const NavbarMenu = () => {

    const boards = useBoardStore(state => state.boards);

    return (
        <Menubar>
            <MenubarMenu>
                <MenubarTrigger className="px-4 py-2 cursor-pointer font-bold" >Boards</MenubarTrigger>
                <MenubarContent>
                    {boards.map((board) => {
                        return (
                            <Link key={board.boardId} href={`/home/board/${board.boardId}`}>
                                <MenubarItem>{board.boardTitle}</MenubarItem>
                            </Link>
                        );
                    })}
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    );
}

export default NavbarMenu;