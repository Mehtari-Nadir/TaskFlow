"use client";
import React from "react";
import { Separator } from "@/components/ui/separator";
import Hero from "@/app/_components/landing/Hero";
import Features from "@/app/_components/landing/Features";
import ScrollableContainer from "@/app/_components/landing/ScrollableContainer";
import LampSection from "@/app/_components/landing/LampSection";
import WobbleCardFeatures from "@/app/_components/landing/WobbleCardFeatures";

const Page = () => (
  <div className="overflow-x-hidden max-w-screen">
    <Separator />
    <Hero />
    <Features />
    <ScrollableContainer />
    <LampSection />
    <WobbleCardFeatures />
    <Separator />
  </div>
);
export default Page;
