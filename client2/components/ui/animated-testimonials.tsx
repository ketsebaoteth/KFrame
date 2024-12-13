"use client";

import TestimonyInterface from "@/interface/testimony";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

export const AnimatedTestimonials = ({
  data,
}: {
  data: TestimonyInterface[];
}) => {
  const [active, setActive] = useState(0);
  const handleNext = () => {
    setActive((prev) => (prev + 1) % data.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + data.length) % data.length);
  };

  return (
    <div className="max-w-4xl mx-auto antialiased font-sans px-4 md:px-8 lg:px-12 py-20">
      <div className="grid grid-cols-1 justify-center md:grid-cols-2 gap-4 md:gap-8 md:justify-normal items-center">
        {/* Image Section */}
        <div className="relative h-80 w-full">
          <motion.div
            key={data[active].id}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="h-full flex items-center justify-center"
          >
            <Image
              src={data[active].imageUrl}
              alt={data[active].name}
              width={320}
              height={320}
              className="md:h-72 md:w-72 h-52 w-52 rounded-3xl object-cover shadow-lg transition-transform duration-500 hover:scale-105"
              draggable={false}
            />
          </motion.div>
        </div>

        {/* Text Section */}
        <div className="flex flex-col text-center md:text-left gap-4">
          <div className="">
            <h3 className="text-2xl font-bold dark:text-white text-black">
              {data[active].name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-neutral-400 mt-2">
              {data[active].testimony}
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-700 dark:text-neutral-300">
              {data[active].role}
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4 mx-auto md:mx-0 mt-4">
            <button
              onClick={handlePrev}
              className="h-10 w-10 rounded-full bg-gray-200 dark:bg-neutral-700 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-neutral-600 transition-colors duration-300"
            >
              <IconArrowLeft className="h-6 w-6 text-black dark:text-white" />
            </button>
            <button
              onClick={handleNext}
              className="h-10 w-10 rounded-full bg-gray-200 dark:bg-neutral-700 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-neutral-600 transition-colors duration-300"
            >
              <IconArrowRight className="h-6 w-6 text-black dark:text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
