"use client";
import Image from "next/image";
import React from "react";
import { WobbleCard } from "@/components/ui/wobble-card";

type Card = {
  id: number;
  containerClassName: string;
  title: string;
  text: string;
  imagePath?: string;
  imageClassName?: string;
};
type WobbleFeatureCardProps = Omit<Card, "id"> & { index: number };

const cardData: Card[] = [
  {
    id: 1,
    containerClassName: "col-span-1 min-h-[300px] bg-black dark:bg-eerie-black",
    title: "Prioritize, Organize, and Collaborate, your way",
    text: "Our AI-powered Kanban board helps you prioritize tasks, organize your projects, and foster collaboration among your team. Experience a new level of productivity today.",
  },
  {
    id: 2,
    containerClassName:
      "col-span-1 lg:col-span-2 h-full bg-persianGreen min-h-[500px] lg:min-h-[300px]",
    title: "Task Assignments",
    text: "Assign tasks to team members and track their progress. Ensure everyone knows their responsibilities.",
    imagePath: "/assets/landing-demo.webp",
    imageClassName:
      "absolute -right-4 lg:-right-[40%] filter -bottom-10 object-contain rounded-2xl",
  },
  {
    id: 3,
    containerClassName:
      "col-span-1 lg:col-span-3 bg-[#06161F] min-h-[400px] lg:min-h-[500px] xl:min-h-[200px]",
    title: "Drag and Drop Interface",
    text: "Easily move tasks around with our intuitive drag and drop interface. Organizing your projects has never been easier.",
    imagePath: "/assets/landing-demo.webp",
    imageClassName:
      "absolute -right-10 md:-right-[40%] lg:-right-[20%] -bottom-10 object-contain rounded-2xl",
  },
  {
    id: 4,
    containerClassName:
      "col-span-1 lg:col-span-2 h-full bg-darkJungleGreen min-h-[500px] lg:min-h-[300px]",
    title: "Align your teams with real-time collaboration",
    text: "Keep everyone in sync with real-time updates, and set board permissions to share your board with others.",
    imagePath: "/assets/landing-demo.webp",
    imageClassName:
      "absolute -right-4 lg:-right-[40%] filter -bottom-10 object-contain rounded-2xl",
  },
  {
    id: 5,
    containerClassName: "col-span-1 min-h-[300px] bg-black dark:bg-eerie-black",
    title: "Seamless Collaboration",
    text: "Foster a collaborative environment with our intuitive interface. Share ideas, assign tasks, and track progress in real time.",
  },
];

const WobbleFeatureCard = ({
  containerClassName,
  title,
  text,
  imagePath,
  imageClassName,
  index,
}: WobbleFeatureCardProps) => (
  <WobbleCard containerClassName={containerClassName} index={index}>
    <h2 className="max-w-80  text-left  text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
      {title}
    </h2>
    <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
      {text}
    </p>
    {!!imagePath && !!imageClassName && (
      <Image
        src={imagePath}
        width={500}
        height={500}
        alt="Kanban board features image"
        className={`${imageClassName} w-auto h-auto`}
        draggable={false}
      />
    )}
  </WobbleCard>
);
const WobbleCardFeatures = () => (
  <div className="px-5 grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-6xl mx-auto w-full relative -top-40">
    {cardData.map(({ id, ...card }: Card, index: number) => (
      <WobbleFeatureCard key={id} index={index} {...card} />
    ))}
  </div>
);

export default WobbleCardFeatures;
