"use client";

import Image from "next/image";
import Link from "next/link";

import ProfileAvatar from "./ProfileAvatar";
import NavbarMenu from "./NavbarMenu";
import CreateBoardBtn from "./CreateBoardBtn";

import { FaSearch } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const Navbar = () => {
    return (
        <nav className="w-full bg-c-two flex items-center justify-between py-2 px-5 border-b-[1px]">
            <div className="flex items-center gap-x-2">
                <Link href={"/home"}>
                    <Image
                        alt="logo"
                        width={45}
                        height={45}
                        src={'/assets/logo.svg'}
                    />
                </Link>
                <span className="text-2xl font-bold mr-5 max-md:hidden">
                    Task
                    <span className="text-c-one">Flow</span>
                </span>
                <NavbarMenu />
                <CreateBoardBtn />
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