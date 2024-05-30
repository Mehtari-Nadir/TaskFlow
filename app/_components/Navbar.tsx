"use client";
import Image from "next/image";
import Link from "next/link";
import TaskFlowLogo from "/public/assets/taskflow-logo.svg";
import ProfileAvatar from "./ProfileAvatar";
import NavbarMenu from "./NavbarMenu";
import CreateBoardBtn from "./CreateBoardBtn";
import { useUserStore } from "../_providers/user-store-provider";

const Navbar = () => {
    const user = useUserStore(state => state.users[0]);

    return (
        <nav className="w-full flex items-center justify-between py-3 px-5 border-b-[1px]">
            <div className="flex items-center gap-x-8">
                <Link href="/home">
                    <div className="flex items-center gap-x-2 transition-all duration-300 hover:scale-105">
                        <Image src={TaskFlowLogo} alt="taskflow-logo" width={50} priority />
                        <div className="font-bold text-lg md:text-xl">
                            <span>Task</span>
                            <span className="text-persianGreen">Flow</span>
                        </div>
                    </div>
                </Link>
                <div className="flex gap-3">
                    <NavbarMenu />
                    <CreateBoardBtn />
                </div>
            </div>
            <div className="flex items-center gap-x-5">
                <ProfileAvatar {...user} />
            </div>
        </nav>
    )
}

export default Navbar;