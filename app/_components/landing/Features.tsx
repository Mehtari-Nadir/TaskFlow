"use client";
import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { LucideIcon, Rocket, Workflow, Handshake } from "lucide-react";

type Feature = {
  id: number;
  Icon: LucideIcon;
  title: string;
  description: string;
};
type FeatureCardProps = Omit<Feature, "id"> & { variant: Variants };

const featureCards: Feature[] = [
  {
    id: 1,
    Icon: Handshake,
    title: "Transform Your Project Management",
    description:
      "With our Kanban board, you can visualize progress, prioritize tasks, and collaborate effectively for seamless project execution.",
  },
  {
    id: 2,
    Icon: Workflow,
    title: "Stay on top of your workflow",
    description:
      "TaskFlow Kanban board brings order to your tasks, clarity to your projects, and efficiency to your team's workflow.",
  },
  {
    id: 3,
    Icon: Rocket,
    title: "Accelerate productivity",
    description:
      "TaskFlow helps you to centralize, plan, and track all your task in one place, helping your team stay coordinated to reach their goals more efficiently.",
  },
];
const FeatureCard = ({
  Icon,
  title,
  description,
  variant,
}: FeatureCardProps) => (
  <motion.div variants={variant} className="h-full">
    <div className="relative p-px overflow-hidden transition duration-300 transform border rounded shadow-sm hover:scale-105 group hover:shadow-xl h-full">
      <div className="absolute bottom-0 left-0 w-full h-1 duration-300 origin-left transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100" />
      <div className="absolute bottom-0 left-0 w-1 h-full duration-300 origin-bottom transform scale-y-0 bg-deep-purple-accent-400 group-hover:scale-y-100" />
      <div className="absolute top-0 left-0 w-full h-1 duration-300 origin-right transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100" />
      <div className="absolute bottom-0 right-0 w-1 h-full duration-300 origin-top transform scale-y-0 bg-deep-purple-accent-400 group-hover:scale-y-100" />
      <div className="relative p-5 rounded-sm">
        <div className="flex flex-col mb-2 lg:items-center lg:flex-row">
          <div className="flex items-center justify-center w-10 h-10 mb-4 mr-2 rounded-full  lg:mb-0">
            <Icon />
          </div>
          <h6 className="font-semibold leading-5">{title}</h6>
        </div>
        <p className="mb-2 text-sm">{description}</p>
      </div>
    </div>
  </motion.div>
);
const Features = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });
  const container: Variants = {
    show: {
      transition: {
        staggerChildren: 0.35,
      },
    },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 200 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        ease: [0.6, 0.01, 0.05, 0.95],
        duration: 1.6,
      },
    },
  };
  return (
    <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 ">
      <motion.div
        ref={containerRef}
        className="grid gap-8 row-gap-5 lg:grid-cols-3"
        variants={container}
        initial="hidden"
        animate={isInView ? "show" : ""}
      >
        {featureCards.map(({ id, ...feature }: Feature) => (
          <FeatureCard key={id} variant={item} {...feature} />
        ))}
      </motion.div>
    </div>
  );
};

export default Features;
