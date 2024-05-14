"use client";
import { useState } from "react";
import { motion, useMotionValueEvent, useScroll, Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import TaskFlowLogo from "/public/assets/taskflow-logo.svg";
import { ArrowUpRight } from "lucide-react";

const NavBar = () => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  useMotionValueEvent(scrollY, "change", (latest) =>
    setHidden(latest > scrollY.getPrevious()! && latest > 150),
  );
  const staggerVariants: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: [0.6, 0.01, 0.05, 0.95] },
    },
    hidden: { opacity: 0, y: -200 },
  };

  return (
    <motion.nav
      variants={{
        visible: {
          y: 0,
          transition: { staggerChildren: 0.3 },
        },
        hidden: {
          y: "-100%",
          transition: { staggerChildren: 0.3 },
        },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="w-full flex items-center justify-between py-3 px-5 sticky top-0 z-[50] backdrop-filter backdrop-blur-lg bg-opacity-30 max-md:flex-col max-md:justify-center max-md:gap-4"
    >
      <motion.div variants={staggerVariants}>
        <Link href="./">
          <div className="flex items-center gap-x-2 transition-all duration-300 hover:scale-105">
            <Image src={TaskFlowLogo} alt="taskflow-logo" width={50} priority />
            <div className="font-bold text-xl">
              <span>Task</span>
              <span className="text-persianGreen">Flow</span>
            </div>
          </div>
        </Link>
      </motion.div>
      <motion.div
        variants={staggerVariants}
        className="flex item-center justify-end gap-1.5"
      >
        <Link
          href="../login"
          className="px-6 py-2  text-persianGreen rounded-lg font-bold transform hover:-translate-y-1 transition duration-400"
        >
          Login
        </Link>
        <Link
          href="../signup"
          className="px-4 py-2 bg-transparent border border-black dark:border-white dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400"
        >
          <div className="flex items-center justify-center gap-1.5">
            Get Started
            <ArrowUpRight className="transform hover:-translate-y-1 transition duration-400" />
          </div>
        </Link>
      </motion.div>
    </motion.nav>
  );
};

export default NavBar;
