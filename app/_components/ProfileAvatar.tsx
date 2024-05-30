import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";

type ProfileAvatarProps = Omit<TUser, "userId" | "userPassword">;

const ProfileAvatar = ({ userEmail, username, userPic }: ProfileAvatarProps) => {
    const supabase = createClientComponentClient();
    const router = useRouter();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                    <AvatarImage src={userPic} alt={`@${username}`} />
                    <AvatarFallback>{`${username?.slice(0, 2).toUpperCase()}`}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel className="flex gap-x-3">
                    <Avatar>
                        <AvatarImage src={userPic} alt={`@${username}`} />
                        <AvatarFallback>{`${username?.slice(0, 2).toUpperCase()}`}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-1.5">
                        <h2>{`@${username}`}</h2>
                        <h2 className="text-gray-500 text-sm">{userEmail}</h2>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <Link href="/home/settings">
                        <DropdownMenuItem>
                            Settings
                        </DropdownMenuItem>
                    </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem
                        onClick={async () => {
                            await supabase.auth.signOut();
                            router.push("/login");
                        }}
                    >
                        Log-out
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ProfileAvatar;