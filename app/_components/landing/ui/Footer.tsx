"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import Link from "next/link";
import { ModeToggle } from "@/app/_components/Toggle";
import { Twitter, Github, Mail, Heart } from "lucide-react";
import MagneticFramer from "@/components/ui/framer";

const Footer = () => {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end end"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-200, 0]);
  return (
    <div ref={container}>
      <div className="min-h-full overflow-hidden">
        <div className="dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] relative">
          <div className="absolute pointer-events-none inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
          <motion.div
            style={{ y }}
            className="flex justify-center gap-10 items-center"
          >
            <footer className="w-full text-sm font-light py-12 ">
              <div className="flex flex-col gap-4 mx-auto max-w-7xl px-24 max-md:px-12 max-md:flex-col max-md:justify-start max-md:gap-4">
                <div className="flex justify-between gap-4 max-md:flex-col max-md:justify-start max-md:gap-4">
                  <div className="flex items-center gap-4 md:order-1">
                    <ModeToggle className="-mx-2" />
                    <span>|</span>
                    <MagneticFramer>
                      <Link href="mailto:task.flow@yahoo.com">
                        <Mail size={20} />
                      </Link>
                    </MagneticFramer>
                    <MagneticFramer>
                      <Link href="#">
                        <Twitter size={20} />
                      </Link>
                    </MagneticFramer>
                    <MagneticFramer>
                      <Link href="https://github.com/Mehtari-Nadir/TaskFlow">
                        <Github size={20} />
                      </Link>
                    </MagneticFramer>
                  </div>
                  <span className="flex items-center text-base">
                    Built with
                    <Heart className="w-4 h-4 mx-1 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110" />{" "}
                    by TaskFlow.
                  </span>
                </div>
                <div className="flex justify-between text-neutral-500 dark:text-neutral-400 max-md:flex-col max-md:justify-start max-md:gap-4">
                  <div className="flex gap-4">
                    <Link href="#">Terms of Service</Link>
                    <span>|</span>
                    <Link href="#">Privacy Policy</Link>
                  </div>
                  <div>
                    <p>&copy; {new Date().getUTCFullYear()} TaskFlow.</p>
                  </div>
                </div>
              </div>
            </footer>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
