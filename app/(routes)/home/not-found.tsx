"use client";
import { useRouter } from "next/navigation";
import { ArrowUpLeft } from "lucide-react";

const NotFound = () => {
  const router = useRouter();
  return (
    <div className="flex items-center h-screen overflow-y-hidden">
      <div className="h-[50rem] w-full dark:bg-dot-thick-white/[0.2] bg-dot-thick-black/[0.2] relative flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="grid h-screen place-content-center px-4">
          <div className="text-center">
            <h1 className="text-9xl font-black">404</h1>
            <p className="text-2xl font-bold tracking-tight text-persianGreen sm:text-4xl">Uh-oh!</p>
            <p className="mt-4 text-neutral-500 dark:text-neutral-400">We can&apos;t find that page.</p>
            <button
              className="mt-4 px-4 py-2 bg-background border border-black dark:border-white dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400"
              onClick={() => router.back()}>
              <div className="flex items-center justify-center gap-1.5">
                <ArrowUpLeft className="transform hover:-translate-y-1 transition duration-400" />
                Go Back Home
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default NotFound;