import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from "@/components/ui/menubar"


const NavbarMenu = () => {
    return (
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
                        TaskFlow
                    </MenubarItem>
                    <MenubarItem>
                        Code
                    </MenubarItem>
                    <MenubarItem>
                        Atqin
                    </MenubarItem>
                </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger>Starred</MenubarTrigger>
                <MenubarContent>
                    <MenubarItem>
                        TaskFlow
                    </MenubarItem>
                    <MenubarItem>
                        Atqin
                    </MenubarItem>
                    <MenubarItem>
                        stackinteck
                    </MenubarItem>
                    <MenubarItem>
                        design
                    </MenubarItem>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    );
}

export default NavbarMenu;