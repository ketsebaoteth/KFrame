"use client";
import ProjectInterface from "@/interface/project";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

export const Timeline = ({ data }: { data: ProjectInterface[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className=" w-full md:w-[80vw] bg-white dark:bg-transparent font-sans md:px-10"
      ref={containerRef}
    >
      <div className="max-w-5xl md:max-w-7xl mx-auto py-10 mt-20 px-4 md:px-8 lg:px-10">
        <h2 className="text-3xl  md:text-4xl mb-4 text-black dark:text-white max-w-4xl">
          Some of my projects
        </h2>
        <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base max-w-sm">
          Here&apos;s a list of some of my projects i have worked on in the past
          hope you like them.
        </p>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-5 md:pt-32 md:gap-20 px-4 md:px-0"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-20 md:top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-8 md:h-10 absolute left-0 md:left-3 w-8 md:w-10 rounded-full bg-white dark:bg-black flex items-center justify-center">
                <div className="h-3 md:h-4 w-3 md:w-4 rounded-full bg-neutral-200 dark:bg-white/5 border border-neutral-300 dark:border-white/5 p-2" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-xl font-bold text-neutral-500 dark:text-neutral-500">
                {item.name}
              </h3>
            </div>

            <div className="relative pl-12 md:pl-4 w-full shadow-black/15 rounded-2xl shadow-xl p-5 group overflow-hidden bg-white dark:bg-white/5">
              {/* Image with Hover Effects */}
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={item.imageUrl}
                  className="object-cover h-64 w-full rounded-lg transition-transform duration-500 ease-out transform group-hover:scale-105 group-hover:shadow-2xl"
                  alt="thumbnail"
                />
                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
              </div>

              {/* Title */}
              <h3 className="md:hidden block pt-5 text-3xl mb-4 text-left font-bold text-neutral-700 dark:text-neutral-300">
                {item.name}
              </h3>

              {/* Description */}
              <div className="mt-5 text-gray-600 dark:text-gray-300">
                {item.description}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4 mt-5">
                {item.tags.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-xs font-medium bg-gray-100 dark:bg-white/5 text-gray-800 dark:text-gray-100 rounded-full shadow-inner transition-all duration-300 hover:bg-gray-700 hover:text-white dark:hover:bg-white/5"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex justify-between items-center mt-4">
                <Link
                  href={item.githubUrl}
                  target="_blank"
                  className="px-3 py-1 text-sm font-medium text-gray-700 dark:text-gray-200 border dark:border-none border-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 hover:shadow-md transition-all duration-300"
                >
                  View Code →
                </Link>
                <Link
                  href={item.liveLink}
                  target="_blank"
                  className="px-3 py-1 text-sm font-medium text-white bg-black dark:bg-white/5 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-700 hover:shadow-md transition-all duration-300"
                >
                  Live Preview
                </Link>
              </div>
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
