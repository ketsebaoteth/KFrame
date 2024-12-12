"use client";
import infoInterface from "@/interface/info";
import Image from "next/image";
// import Image from "next/image";

export default function AboutInfo({ data }: { data: infoInterface }) {
  return (
    <div className="py-12 px-4 sm:px-6">
      <div className="max-w-6xl  mx-auto">
        <div className="bg-background/50 backdrop-blur-xl rounded-2xl p-2 sm:p-4 shadow-lg">
          <div className="flex flex-col md:flex-row gap-5 items-center md:items-start">
            <div className="flex-shrink-0">
              <Image
                src={data.aboutImageUrl as string}
                alt="Profile picture"
                height={280}
                width={280}
                className="rounded-2xl object-cover shadow-md hover:shadow-xl transition-shadow duration-300 border border-foreground/10"
                priority
              />
            </div>

            <div className="flex-1 space-y-2">
              <p className="text-sm md:text-sm leading-relaxed text-muted-foreground">
                {data?.aboutDescription}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
