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

const NavbarMenu_Small = () => {
    return (
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
                            <MenubarItem>Code</MenubarItem>
                            <MenubarItem>TaskFlow</MenubarItem>
                            <MenubarItem>Atqin</MenubarItem>
                        </MenubarSubContent>
                    </MenubarSub>
                    <MenubarSub>
                        <MenubarSubTrigger>Starred</MenubarSubTrigger>
                        <MenubarSubContent>
                            <MenubarItem>Code</MenubarItem>
                            <MenubarItem>TaskFlow</MenubarItem>
                            <MenubarItem>Atqin</MenubarItem>
                        </MenubarSubContent>
                    </MenubarSub>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    );
}

export default NavbarMenu_Small;