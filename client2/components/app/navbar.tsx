"use client";

import { IconHome } from "@tabler/icons-react";
import { BookAIcon, InfoIcon, ProjectorIcon } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import ThemeToggle from "./theme-toggle";

export default function NavComponent({
  variant = "desktop",
}: {
  variant?: "mobile" | "desktop";
}) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    setMounted(true);
  }, []);

  const links = [
    {
      title: "Home",
      icon: <IconHome className="h-full w-full" />,
      href: `/main/home/${id}`,
    },
    {
      title: "About",
      icon: <InfoIcon className="h-full w-full" />,
      href: `/main/about/${id}`,
    },
    {
      title: "Projects",
      icon: <ProjectorIcon className="h-full w-full" />,
      href: `/main/projects/${id}`,
    },
    {
      title: "Blog",
      icon: <BookAIcon className="h-full w-full" />,
      href: `/main/blog/${id}`,
    },
    {
      title: "Theme",
      icon: mounted ? <ThemeToggle /> : null,
      href: "#",
    },
  ];

  if (variant === "mobile") {
    return (
      <nav className="w-full bg-cream dark:bg-black backdrop-blur-sm border-t border-foreground/10 pencil-effect">
        <div className="flex justify-around items-center py-2 px-4">
          {links.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.title}
                href={item.href}
                className="flex flex-col  items-center gap-0.5 nav-item"
              >
                <div
                  className={`h-5  w-5 sm:h-6 sm:w-6 flex items-center justify-center ${
                    isActive
                      ? "text-pencil-active dark:text-pencil-active-dark"
                      : "text-pencil dark:text-pencil-dark"
                  }`}
                >
                  {item.icon &&
                    React.cloneElement(item.icon, {
                      className: isActive
                        ? "text-pencil-active dark:text-pencil-active-dark"
                        : "text-pencil dark:text-pencil-dark",
                    })}
                </div>
                <span
                  className={`text-[10px] sm:text-xs  ${
                    isActive
                      ? "text-pencil-active dark:text-pencil-active-dark"
                      : "text-pencil dark:text-pencil-dark"
                  }`}
                >
                  {item.title}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    );
  }

  return (
    <nav className="flex flex-col items-center  dark:bg-black dark:shadow-none gap-8 py-4 px-2 rounded-2xl backdrop-blur-sm bg-cream dark:bg-cream-dark shadow-lg shadow-white/40">
      <div className=" p-2 flex flex-col gap-5 shadow-x; shadow-white/40 ">
        {links.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.title}
              href={item.href}
              className={`flex flex-col hover:scale-115 items-center gap-1 transition-colors nav-item ${
                isActive
                  ? "text-pencil-active dark:text-pencil-active-dark"
                  : "text-pencil dark:text-pencil-dark"
              }`}
            >
              <div
                className={`h-5 w-5 md:h-6 md:w-6 flex items-center justify-center ${
                  isActive
                    ? "text-pencil-active dark:text-pencil-active-dark"
                    : "text-pencil dark:text-pencil-dark"
                }`}
              >
                {item.icon &&
                  React.cloneElement(item.icon, {
                    className: isActive
                      ? "text-pencil-active dark:text-pencil-active-dark"
                      : "text-pencil dark:text-pencil-dark",
                  })}
              </div>
              <span className="text-[10px]">{item.title}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
