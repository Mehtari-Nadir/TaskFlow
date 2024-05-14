"use client";
import { useState } from "react";
import Image from "next/image";
import { Camera, X } from "lucide-react";

const DEFAULT_AVATAR = "/public/assets/default-avatar.svg";

type ProfileImageProps = {
  profileImage?: string;
};

const ProfileImage = ({ profileImage }: ProfileImageProps) => {
  const [selectedImage, setSelectedImage] = useState(
    profileImage || DEFAULT_AVATAR,
  );

  //TODO: Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;

    const reader = new FileReader();
    reader.onload = (event) => setSelectedImage(event.target?.result as string);
    reader.readAsDataURL(e.target.files[0]);
  };

  //TODO: Handle image removal
  const handleImageRemoval = () => {
    if (selectedImage === DEFAULT_AVATAR) return;
    setSelectedImage(DEFAULT_AVATAR);
  };

  return (
    <div className="pt-10">
      <div className="relative inline-block h-24 w-24 rounded-full ring ring-persianGreen ring-offset-4 dark:ring-offset-richBlack overflow-hidden">
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <Image
            alt="background-image"
            src={selectedImage}
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
