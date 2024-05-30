"use client";
import ProfileImage from "./ProfileImage";
import { motion } from "framer-motion";

const ProfileCard = (user: TUser) => {
  const animation = {
    initial: { y: "100%" },
    enter: (i: number) => ({
      y: "0",
      transition: {
        duration: 0.75,
        ease: [0.33, 1, 0.68, 1],
        delay: 0.075 * i,
      },
    }),
  };

  return (
    <div className="flex flex-col justify-center items-center gap-2 ">
      <ProfileImage {...user} />
      <div className="text-center">
        <motion.h2
          variants={animation}
          initial="initial"
          animate="enter"
          className="text-gray-800 dark:text-white text-3xl font-bold"
        >
          {`@${user.username}`}
        </motion.h2>
        <motion.h2 className="mt-2 text-gray-500 text-base font-semibold">
          {user.userEmail}
        </motion.h2>
      </div>
    </div>
  );
};

export default ProfileCard;
