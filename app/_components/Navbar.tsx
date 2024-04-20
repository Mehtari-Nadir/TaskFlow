"use client"

import Image from "next/image";
import { useState } from "react";

import ProfileAvatar from "./ProfileAvatar";
import NavbarMenu from "./NavbarMenu";
import CreateBoardDialog from "./CreateBoardDialog";
import { PlusIcon } from "@radix-ui/react-icons";

import { FaSearch } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const Navbar = () => {

    const [open, setOpen] = useState(false);

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
                <Button
                    onClick={() => setOpen(true)}
                    className="bg-c-one max-md:hidden" variant={"outline"}
                >
                    Create Board
                </Button>
                <Button onClick={() => setOpen(true)} size={"icon"}
                    className="bg-c-one md:hidden" variant={"outline"}
                >
                    <PlusIcon className="h-4 w-4" />
                </Button>
                <CreateBoardDialog open={open} setOpen={setOpen} />
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