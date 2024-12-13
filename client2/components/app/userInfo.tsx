"use client";

import infoInterface from "@/interface/info";
import Image from "next/image";

export default function AboutInfo({ data }: { data: infoInterface }) {
  return (
    <div className="py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-background/50 backdrop-blur-xl rounded-2xl p-4 sm:p-6 shadow-lg transition-shadow duration-300 hover:shadow-2xl">
          <div className="flex flex-col md:flex-row gap-5 items-center md:items-start">
            <div className="relative group flex-shrink-0">
              <Image
                src={data.aboutImageUrl as string}
                alt="Profile picture"
                height={280}
                width={250}
                className="rounded-2xl object-cover shadow-md border border-foreground/10 transition-transform duration-500 group-hover:scale-105"
                priority
              />

              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500"></div>
            </div>

            <div className="flex-1 space-y-2">
              <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                {data?.aboutDescription}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
