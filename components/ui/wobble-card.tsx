"use client";
import React, { useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

export const WobbleCard = ({
  children,
  containerClassName,
  className,
  index,
}: {
  children: React.ReactNode;
  containerClassName?: string;
  className?: string;
  index: number;
}) => {
  const mousePosition = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };
  const { x, y } = mousePosition;
  const [isHovering, setIsHovering] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = event;
    const { height, width, left, top } = containerRef.current!.getBoundingClientRect();
    const x = (clientX - (left + (width >> 1))) / 20;
    const y = (clientY - (top + (height >> 1))) / 20;
    mousePosition.x.set(x);
    mousePosition.y.set(y);
  };

  const [isClient, setIsClient] = useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <motion.section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(!isHovering)}
      onMouseLeave={() => {
        setIsHovering(!isHovering);
        mousePosition.x.set(0);
        mousePosition.y.set(0);
      }}
      style={{
        x,
        y,
        transform: isHovering
          ? `translate3d(${mousePosition.x.get()}px, ${mousePosition.y.get()}px, 0) scale3d(1, 1, 1)`
          : "translate3d(0px, 0px, 0) scale3d(1, 1, 1)",
        transition: "transform 0.1s ease-out",
      }}
      className={cn(
        "mx-auto w-full bg-persianGreen  relative rounded-2xl overflow-hidden",
        containerClassName,
      )}
      initial={{
        opacity: 0,
        x: (index & 1 || index === 3) ? 50 : -50,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.8,
        },
      }}
      viewport={{ once: true }}
    >
      <div
        className="relative h-full [background-image:radial-gradient(88%_100%_at_top,rgba(255,255,255,0.5),rgba(255,255,255,0))]  sm:mx-0 sm:rounded-2xl overflow-hidden"
        style={{
          boxShadow:
            "0 10px 32px rgba(34, 42, 53, 0.12), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.05), 0 4px 6px rgba(34, 42, 53, 0.08), 0 24px 108px rgba(47, 48, 55, 0.10)",
        }}
      >
        <motion.div
          style={{
            x,
            y,
            transform: isHovering
              ? `translate3d(${-mousePosition.x.get()}px, ${-mousePosition.y.get()}px, 0) scale3d(1.03, 1.03, 1)`
              : "translate3d(0px, 0px, 0) scale3d(1, 1, 1)",
            transition: "transform 0.1s ease-out",
          }}
          className={cn("h-full px-4 py-20 sm:px-10", className)}
        >
          <Noise />
          {children}
        </motion.div>
      </div>
    </motion.section>
  );
};

export const Noise = () => (
  <div
    className="pointer-events-none absolute inset-0 w-full h-full scale-[1.2] transform opacity-10 [mask-image:radial-gradient(#fff,transparent,75%)]"
    style={{
      backgroundImage: "url(/noise.webp)",
      backgroundSize: "30%",
    }}
  ></div>
);
