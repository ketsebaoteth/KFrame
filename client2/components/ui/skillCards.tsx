"use client";

import SkillInterface from "@/interface/skills";
import { cn } from "@/lib/utils";

interface SkillCardsProps {
  data: SkillInterface[];
  className?: string;
}

export const SkillCards = ({ data, className }: SkillCardsProps) => {
  return (
    <div
      className={cn(
        "relative z-20 max-w-5xl mx-auto overflow-hidden",
        className
      )}
    >
      <ul className="flex flex-wrap justify-center gap-4 py-4">
        {data.map((item) => (
          <li
            key={item.id}
            className="relative w-12 h-12 md:w-20 md:h-20 rounded-2xl overflow-hidden border border-gray-200 dark:border-black shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="group flex flex-col items-center justify-center w-full h-full bg-white dark:bg-transparent  p-2 rounded-2xl cursor-pointer relative overflow-hidden">
              <img
                height={50}
                width={50}
                src={item.imageUrl}
                alt={item.name}
                className="w-4 h-4 md:w-14 md:h-14 grayscale hover:grayscale-0 transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
