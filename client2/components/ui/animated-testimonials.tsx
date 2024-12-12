"use client";

import TestimonyInterface from "@/interface/testimony";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export const AnimatedTestimonials = ({
  autoplay,
  data,
}: {
  autoplay: boolean;
  data: TestimonyInterface[];
}) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % data.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + data.length) % data.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };
  return (
    <div className=" max-w-4xl mx-auto antialiased font-sans px-4 md:px-8 lg:px-12 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <div className="relative h-80 w-full md:h-80">
            <AnimatePresence>
              {data.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotateY(),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index) ? 999 : data.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotateY(),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom flex items-center justify-center md:justify-start"
                >
                  <Image
                    src={testimonial.imageUrl ? testimonial.imageUrl : "$"}
                    alt={testimonial.name}
                    width={500}
                    height={500}
                    draggable={false}
                    className="h-60 w-60 md:h-80 md:w-80 lg:h-80 lg:w-80 rounded-3xl object-cover object-center"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex justify-between flex-col py-4">
          <motion.div
            key={active}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
          >
            <h3 className="text-2xl font-bold dark:text-white text-black">
              {data[active].name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-neutral-500">
              {data[active].testimony}
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using Content here, content
              here, making it look like readable English. Many desktop
              publishing.
            </p>
            <hr className="my-6 border-dashed border-foreground/40 dark:border-foreground/20" />
            <p className="text-sm text-gray-500 dark:text-neutral-500">
              {data[active].name as string}
            </p>
            <p className="text-sm text-gray-500 dark:text-neutral-500">
              {data[active].role}
            </p>
          </motion.div>
          <div className="flex gap-4 mt-5">
            <button
              onClick={handlePrev}
              className="h-8 w-8 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button"
            >
              <IconArrowLeft className="h-8 w-8 text-black dark:text-neutral-400 group-hover/button:rotate-12 transition-transform duration-300" />
            </button>
            <button
              onClick={handleNext}
              className="h-10 w-10 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button"
            >
              <IconArrowRight className="h-10 w-10 text-black dark:text-neutral-400 group-hover/button:-rotate-12 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
