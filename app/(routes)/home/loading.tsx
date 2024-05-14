"use client";
import { motion } from "framer-motion";

const Loading = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="flex space-x-2">
      <motion.div
        className="h-3 w-3 rounded-full bg-persianGreen"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1,
          ease: 'easeInOut',
          repeat: Infinity,
        }}
      />
      <motion.div
        className="h-3 w-3 rounded-full bg-persianGreen"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1,
          ease: 'easeInOut',
          repeat: Infinity,
          delay: 0.3,
        }}
      />
      <motion.div
        className="h-3 w-3 rounded-full bg-persianGreen"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1,
          ease: 'easeInOut',
          repeat: Infinity,
          delay: 0.6,
        }}
      />
    </div>
  </div>
);

export default Loading;
