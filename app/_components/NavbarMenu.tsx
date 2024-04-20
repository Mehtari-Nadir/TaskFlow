import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from "@/components/ui/menubar"

const NavbarMenu = () => {
    return (
        <>
            <Menubar className="max-lg:hidden">
                <MenubarMenu>
                    <MenubarTrigger>Boards</MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem>
                            Code
                        </MenubarItem>
                        <MenubarItem>
                            Design
                        </MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger>Recent</MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem>
                            Design
                        </MenubarItem>
                        <MenubarItem>
                            Code
                        </MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger>Starred</MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem>
                            Code
                        </MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>
            <Menubar className="lg:hidden">
                <MenubarMenu>
                    <MenubarTrigger>More</MenubarTrigger>
                    <MenubarContent>
                        <MenubarSub>
                            <MenubarSubTrigger>Board</MenubarSubTrigger>
                            <MenubarSubContent>
                                <MenubarItem>Code</MenubarItem>
                                <MenubarItem>Design</MenubarItem>
                            </MenubarSubContent>
                        </MenubarSub>
                        <MenubarSub>
                            <MenubarSubTrigger>Recent</MenubarSubTrigger>
                            <MenubarSubContent>
                                <MenubarItem>Design</MenubarItem>
                                <MenubarItem>Code</MenubarItem>
                            </MenubarSubContent>
                        </MenubarSub>
                        <MenubarSub>
                            <MenubarSubTrigger>Starred</MenubarSubTrigger>
                            <MenubarSubContent>
                                <MenubarItem>Code</MenubarItem>
                            </MenubarSubContent>
                        </MenubarSub>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>
        </>
    );
}

export default NavbarMenu;