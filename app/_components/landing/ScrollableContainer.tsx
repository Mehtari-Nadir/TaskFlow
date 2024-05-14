"use client";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Image from "next/image";
import Landing from "/public/assets/landing-demo.webp";

const ScrollableContainer = () => (
  <ContainerScroll>
    <Image
      src={Landing}
      alt="hero"
      height={720}
      width={1400}
      className="mx-auto rounded-2xl object-cover h-full object-left-top"
      draggable={false}
      placeholder="blur"
    />
  </ContainerScroll>
);
export default ScrollableContainer;