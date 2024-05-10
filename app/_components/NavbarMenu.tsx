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
                <MenubarTrigger>Boards</MenubarTrigger>
                <MenubarContent>
                    {boards.map((value, index) => {
                        return (
                            <Link key={index} href={`/home/board/${value.boardId}`}>
                                <MenubarItem>{value.boardTitle}</MenubarItem>
                            </Link>
                        );
                    })}
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    );
}

export default NavbarMenu;