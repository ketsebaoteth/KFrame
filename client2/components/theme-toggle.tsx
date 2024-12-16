"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  // const { toggleSidebar, state } = useSidebar();

  const handleToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // const handleSidebarToggle = () => {
  //   toggleSidebar();
  // };

  return (
    <div>
      {/* <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-20"
        onClick={handleSidebarToggle}
      >
        <Menu
          className={`  transition-all ${
            state ? "rotate-0 scale-100" : "rotate-90 scale-0"
          }`}
        />
      </Button> */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-12"
        onClick={handleToggle}
      >
        <Sun
          className={`  transition-all ${
            theme === "dark" ? "rotate-90 scale-0" : "rotate-0 scale-100"
          }`}
        />
        <Moon
          className={`absolute   transition-all ${
            theme === "dark" ? "rotate-0 scale-100" : "rotate-90 scale-0"
          }`}
        />
        <span className="sr-only">Toggle theme and sidebar</span>
      </Button>
    </div>
  );
}
