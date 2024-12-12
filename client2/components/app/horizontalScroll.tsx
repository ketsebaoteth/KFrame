"use client";

import SkillInterface from "@/interface/skills";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";
export function InfiniteMovingCardsDemo({ data }: { data: SkillInterface[] }) {
  return (
    <div className=" rounded-md grayscale flex flex-col antialiased  bg-transparent dark:bg-transparent dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        data={data}
        direction="right"
        speed="slow"
        className="w-full"
        pauseOnHover={true}
      />
    </div>
  );
}
