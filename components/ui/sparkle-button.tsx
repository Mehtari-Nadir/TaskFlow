"use client";
import { Button } from "@/components/ui/button";
import { stagger, useAnimate, animate } from "framer-motion";
import { RiSparklingFill } from "react-icons/ri";

const randomNumberBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

type AnimationSequence = Parameters<typeof animate>[0];
type SparkleButtonProps = {
  title: string;
  children: React.ReactNode;
};
const SparkleButton = ({ title, children }: SparkleButtonProps) => {
  const [scope, animate] = useAnimate();

  const onButtonClick = () => {
    const sparkles = [...Array(16)];
    const sparklesAnimation: AnimationSequence = sparkles.map((_, index) => [
      `.sparkle-${index}`,
      {
        x: randomNumberBetween(-100, 100),
        y: randomNumberBetween(-100, 100),
        scale: randomNumberBetween(1.5, 2.5),
        opacity: 1,
      },
      {
        duration: 0.4,
        at: "<",
      },
    ]);

    const sparklesFadeOut: AnimationSequence = sparkles.map((_, index) => [
      `.sparkle-${index}`,
      {
        opacity: 0,
        scale: 0,
      },
      {
        duration: 0.3,
        at: "<",
      },
    ]);

    const sparklesReset: AnimationSequence = sparkles.map((_, index) => [
      `.sparkle-${index}`,
      {
        x: 0,
        y: 0,
      },
      {
        duration: 0.000001,
      },
    ]);

    animate([
      ...sparklesReset,
      [".letter", { y: -32 }, { duration: 0.2, delay: stagger(0.05) }],
      ["button", { scale: 0.8 }, { duration: 0.1, at: "<" }],
      ["button", { scale: 1 }, { duration: 0.1 }],
      ...sparklesAnimation,
      [".letter", { y: 0 }, { duration: 0.000001 }],
      ...sparklesFadeOut,
    ]);
  };

  return (
    <div ref={scope}>
      <Button
        type="submit"
        onClick={onButtonClick}
        className="dark:hover:bg-white hover:bg-persianGreen gap-2 group/button relative inline-flex items-center justify-center overflow-hidden rounded-md bg-persianGreen px-4 py-2 transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-persianGreen"
      >
        <span className="block h-8 overflow-hidden" aria-hidden>
          {title.split("").map((letter, index) => (
            <span
              data-letter={letter}
              className="text-black font-bold letter relative inline-block h-8 leading-8 after:absolute after:left-0 after:top-full after:h-8 after:content-[attr(data-letter)]"
              key={`${letter}-${index}`}
            >
              {letter}
            </span>
          ))}
        </span>
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 block"
        >
          {[...Array(16)].map((_, index) => (
            <RiSparklingFill
              className={`absolute left-1/2 top-1/2 opacity-0 sparkle-${index}`}
              key={index}
            />
          ))}
        </span>
        {children}
      </Button>
    </div>
  );
};

export default SparkleButton;
