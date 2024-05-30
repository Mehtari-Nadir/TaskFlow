import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { useUserStore } from "../_providers/user-store-provider";

const StackedAvatars = () => {
    const { username, userPic } = useUserStore(state => state.users[0]);

    return (
        <div className="flex -space-x-2 rtl:space-x-reverse">
            <Avatar className="cursor-pointer w-7 h-7">
                <AvatarImage
                    src={userPic}
                    alt={`${username.slice(0, 2).toUpperCase()}`}
                />
                <AvatarFallback>{`${username.slice(0, 2).toUpperCase()}`}</AvatarFallback>
            </Avatar>
        </div>
    );
}

export default StackedAvatars;