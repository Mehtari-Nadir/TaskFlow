"use client";
import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { twMerge } from "tailwind-merge";

export function ModeToggle({
  className,
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      variant="link"
      size="icon"
      className={twMerge("bg-transparent", className)}
      onClick={toggleTheme}
    >
      <Sun className="hover:fill-black dark:hover:fill-white h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="hover:fill-black dark:hover:fill-white absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
