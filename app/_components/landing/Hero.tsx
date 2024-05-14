"use client";
import Link from "next/link";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const Hero = () => (
  <HeroHighlight>
    <motion.h1
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: [20, -5, 0],
      }}
      transition={{
        duration: 0.5,
        ease: [0.4, 0.0, 0.2, 1],
      }}
    >
      <header className="text-white">
        <div className="mx-auto max-w-screen-xl px-4 py-32 ">
          <div className="mx-auto max-w-6xl font-bold text-center">
            <h1 className="text-4xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-black to-eerieBlack dark:from-neutral-50 dark:to-neutral-400">
              Supercharge Your WorkFlow, <br />
              <div className="py-2">
                <Highlight className="text-background">
                  Boost Productivity
                </Highlight>{" "}
                <div className="pr-1 py-2 text-4xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-black to-eerieBlack dark:from-neutral-50 dark:to-neutral-400 inline-block">
                  with TaskFlow
                </div>
              </div>
            </h1>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="../signup"
                className="px-4 py-3 bg-background border border-black dark:border-white dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400"
              >
                <div className="flex items-center justify-center gap-1.5">
                  Get Started
                  <ArrowUpRight className="transform hover:-translate-y-1 transition duration-400" />
                </div>
              </Link>
              <button
                onClick={() =>
                  document
                    .getElementById("lamp-container")!
                    .scrollIntoView({ behavior: "smooth" })
                }
                type="submit"
                className="px-4 py-3 bg-black text-white dark:bg-white border border-black dark:border-white dark:text-black  rounded-lg font-bold transform hover:-translate-y-1 transition duration-400"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </header>
    </motion.h1>
  </HeroHighlight>
);

export default Hero;
