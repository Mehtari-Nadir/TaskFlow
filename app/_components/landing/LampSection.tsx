"use client";
import { motion } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";

const LampSection = () => (
  <div id="lamp-container" className="overflow-hidden h-full">
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.1,
          duration: 0.35,
          ease: "easeInOut",
        }}
        className="mt-0 bg-gradient-to-b from-black to-eerieBlack dark:from-neutral-50 dark:to-neutral-400  bg-clip-text text-center text-4xl font-semibold tracking-tight text-transparent md:text-5xl"
      >
        Streamline Your Workflow Like Never Before
        <p className="py-6 text-balance text-lg font-normal">
          Experience the power of visual project management with our intuitive
          Kanban board. Stay on top of tasks, collaborate seamlessly, and drive
          productivity to new heights.
        </p>
      </motion.h1>
    </LampContainer>
  </div>
);

export default LampSection;
