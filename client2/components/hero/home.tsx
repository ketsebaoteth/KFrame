"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import Link from "next/link";

export function Hero() {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    async function fetchStars() {
      try {
        const response = await fetch(
          "https://api.github.com/repos/yeabnoah/Frame"
        );
        if (response.ok) {
          const data = await response.json();
          setStars(data.stargazers_count);
        } else {
          console.error("Failed to fetch star count");
        }
      } catch (error) {
        console.error("Error fetching star count:", error);
      }
    }

    fetchStars();
  }, []);

  return (
    <div className="flex -mt-28 flex-col items-center justify-center flex-1 flex-grow px-4 text-center">
      <Link href={"https://github.com/yeabnoah/frame"} className="inline-flex items-center justify-center rounded-full bg-muted/50 px-3 py-1 text-sm mb-8">
        <Button variant="ghost" size="sm" className="h-5 gap-2 text-xs">
          <Github className="w-3 h-3" />
          Star
        </Button>
        <div className="h-3 w-[1px] mx-2 bg-border"></div>
        <span>{stars !== null ? stars.toLocaleString() : "..."}</span>
      </Link>
      <h1 className="text-2xl md:text-6xl font-semibold tracking-tight max-w-4xl mb-6">
        Craft. Publish. Showcase.
      </h1>
      <p className="md:text-base font-light max-w-[42rem] mb-6 text-sm">
        Frame empowers developers to create, manage, and showcase their work
        effortlessly. With a powerful dashboard, you can add projects, write
        articles, and preview your personalized portfolio—all in one streamlined
        platform.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Link
          href="/login"
          className=" dark:bg-white px-5 md:min-w-[140px] bg-black/90 dark:text-black/90 md:py-3 py-[5px]  rounded-md font-normal text-sm md:text-base md:font-medium text-white "
        >
          Get Started
        </Link>
      </div>
    </div >
  );
}
