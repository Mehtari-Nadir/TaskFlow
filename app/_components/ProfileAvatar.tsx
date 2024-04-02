import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

export function ProfileAvata({image_url}: {image_url: string}) {
    return (
        <Avatar>
            <AvatarImage src={image_url} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    )
}