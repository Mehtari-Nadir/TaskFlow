"use client"

import { Button } from "@/components/ui/button";
import { Share1Icon, StarIcon, StarFilledIcon } from "@radix-ui/react-icons";
import { useState } from "react";

const BoardNavbar = () => {

    const [isFav, setFav] = useState(false);

    const handleClick = () => {
        setFav(!isFav);
    }

    return (
        <nav
            className="w-full bg-[#092327] flex items-center justify-between py-2 px-5 border-b-[1px]"
        >
            <div className="flex items-center justify-center gap-x-3">
                <h1 className="font-bold text-2xl">Board Title</h1>
                <div>
                    {isFav && <StarFilledIcon onClick={handleClick} className="h-6 w-6 cursor-pointer" color="gold" />}
                    {!isFav && <StarIcon onClick={handleClick} className="h-6 w-6 cursor-pointer" color="gold" />}
                </div>
            </div>
            <div>
                <Button>
                    <Share1Icon className="mr-2 h-4 w-4" />
                    Share
                </Button>
            </div>
        </nav>
    );
}

export default BoardNavbar;