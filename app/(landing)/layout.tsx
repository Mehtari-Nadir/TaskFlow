"use client";
import React from "react";
import Lenis from "lenis";
import NavBar from "@/app/_components/landing/ui/NavBar";
import Footer from "@/app/_components/landing/ui/Footer";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  React.useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);
  return (
    <>
      <NavBar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default DefaultLayout;
