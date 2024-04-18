import Image from "next/image";

import ProfileAvatar from "./ProfileAvatar";
import NavbarMenu from "./NavbarMenu";
import CreateBoardButton from "./CreateBoardButton";

import { FaSearch } from "react-icons/fa";
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
                <CreateBoardButton />
            </div>
            <div className="flex items-center gap-x-5">
                <Button variant={"outline"} size={"icon"}>
                    <FaSearch className="h-4 w-4" />
                </Button>
                <ProfileAvatar image_url="https://github.com/shadcn.png" />
            </div>
        </nav>
    )
}

export default Navbar;