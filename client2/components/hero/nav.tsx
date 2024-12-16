import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "../theme-toggle";

export function Nav() {
  return (
    <nav className="flex z-10 items-center justify-between p-4 md:before:border-b border-border/40 mx-[5vw] md:mx-[10vw]">
      <div className="flex items-center gap-10">
        <Link
          href="https://github.com/yeabnoah/frame"
          className="flex items-center gap-2"
        >
          <div className=" flex flex-row items-center ">
            <Image
              src="/logo.png"
              alt="logo"
              height={30}
              width={30}
              className=" -rotate-[-20deg]"
            />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Frame
            </h2>
          </div>
        </Link>
      </div>
      <div className="flex gap-5 items-center ">
        <div className="  mt-0">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
