import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";

const StackedAvatars = () => {

    const users = [
        { userId: 'uuu-000', profilePic: "https://i.pinimg.com/originals/69/a5/b8/69a5b866744ac56ca614e2a5a7d2c5dd.jpg" },
        { userId: 'uuu-001', profilePic: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60" },
        { userId: 'uuu-002', profilePic: "https://github.com/shadcn.png" },
    ];

    return (
        <div className="flex -space-x-2 rtl:space-x-reverse">
            {users.map((value, index) => {
                return (
                    <Avatar key={index} className="cursor-pointer w-7 h-7">
                        <AvatarImage
                            src={value.profilePic}
                            alt="@shadcn"

                        />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                );
            })}
        </div>
    );
}

export default StackedAvatars;