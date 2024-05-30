"use client";
import Image from "next/image";
import { Camera, X } from "lucide-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "sonner";
import { useUserStore } from "@/app/_providers/user-store-provider";

const DEFAULT_AVATAR = "/assets/default-avatar.svg";

const ProfileImage = ({
  userId,
  username,
  userEmail,
  userPassword,
  userPic,
}: TUser) => {
  const supabase = createClientComponentClient();
  const updateUser = useUserStore((state) => state.updateUser);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (event) => {
      const newProfilePic = event.target?.result as string;
      try {
        const { error } = await supabase
          .from("users")
          .update({
            userPic: newProfilePic,
          })
          .eq("userId", userId);
        updateUser(userId, username, userEmail, userPassword, newProfilePic);
        if (error) throw error;
        toast.success("Profile picture updated successfully.");
      } catch (error) {
        toast.error("Error updating profile picture.");
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleImageRemoval = async () => {
    if (!userPic) return;
    try {
      const { error } = await supabase
        .from("users")
        .update({
          userPic: null,
        })
        .eq("userId", userId);
      updateUser(userId, username, userEmail, userPassword);
      if (error) throw error;
      toast.success("Profile picture removed successfully.");
    } catch (error) {
      toast.error("Error removing profile picture.");
    }
  };

  return (
    <div className="pt-10">
      <div className="relative inline-block h-24 w-24 rounded-full ring ring-persianGreen ring-offset-4 dark:ring-offset-richBlack overflow-hidden">
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <Image
            alt={`${username.slice(0, 2).toUpperCase()}`}
            src={userPic ? userPic : DEFAULT_AVATAR}
            className="object-cover w-full h-full"
            width={96}
            height={96}
          />
        </div>
        <div className="opacity-0 hover:opacity-100 absolute top-0 h-full w-full rounded-full bg-opacity-25 flex items-center justify-center">
          <label
            htmlFor="fileUpload"
            className="cursor-pointer p-2 rounded-full hover:bg-white hover:bg-opacity-25 focus:outline-none transition duration-200"
          >
            <Camera size={24} />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="fileUpload"
            />
          </label>
          <button
            type="button"
            className="p-2 rounded-full hover:bg-white hover:bg-opacity-25 focus:outline-none transition duration-200"
            onClick={handleImageRemoval}
          >
            <X size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileImage;
