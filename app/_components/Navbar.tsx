import Image from "next/image";

import { ProfileAvata } from "./ProfileAvatar";
import NavbarMenu from "./NavbarMenu";
import NavbarMenu_Small from "./NavbarMenu_Small";

import { FaSearch } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";

import { Button } from "@/components/ui/button";

const Navbar = () => {
    return (
        <nav className="w-full bg-c-two flex items-center justify-between py-2 px-5 border-b-[1px]">
            <div className="flex items-center gap-x-2">
                <Image
                    alt="logo"
                    width={45}
                    height={45}
                    src={'/assets/logo.svg'}
                />
                <span className="text-2xl font-bold mr-5 max-md:hidden">
                    Task
                    <span className="text-c-one">Flow</span>
                </span>
                <NavbarMenu />
                <NavbarMenu_Small />
                <Button className="bg-c-one max-md:hidden" variant={"outline"}>Create Workspace</Button>
                <Button size={"icon"} className="bg-c-one md:hidden" variant={"outline"}>
                    <FaPlus className="h-4 w-4" />
                </Button>
            </div>
            <div className="flex items-center gap-x-5">
                <Button variant={"outline"} size={"icon"}>
                    <FaSearch className="h-4 w-4" />
                </Button>
                <ProfileAvata image_url="https://github.com/shadcn.png" />
            </div>
        </nav>
    )
}

export default Navbar;