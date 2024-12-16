"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Briefcase,
  FileText,
  FolderKanban,
  Info,
  Link,
  MessageSquare,
  User,
  X,
} from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navItems = [
  { icon: FileText, label: "Articles", href: "/dashboard/articles" },
  { icon: FolderKanban, label: "Projects", href: "/dashboard/projects" },
  {
    icon: MessageSquare,
    label: "Testimonials",
    href: "/dashboard/testimonials",
  },
  { icon: Briefcase, label: "Skills", href: "/dashboard/skills" },
  { icon: Info, label: "About", href: "/dashboard/about" },
  { icon: Link, label: "Links", href: "/dashboard/links" },
  { icon: User, label: "Profile", href: "/dashboard/" },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const { toggleSidebar } = useSidebar();

  return (
    <Sidebar className="border-r dark:bg-white/5 ">
      <div className="relative h-screen dark:bg-black ">
        <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,255,230,.15),rgba(255,255,255,0))]"></div>

        <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,255,230,.15),rgba(255,255,255,0))]"></div>
        <SidebarHeader className="border-b  dark:bg-white/5 bg-white flex-row px-6 py-4 flex items-center justify-between">
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

          <button
            onClick={toggleSidebar}
            className=" md:hidden z-50 border-none"
          >
            <X className="h-6 w-6 " />
          </button>
        </SidebarHeader>
        <SidebarContent className="flex flex-col h-[calc(100vh-5rem bg-transparent ">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className=" gap-3">
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.href} className="">
                    <SidebarMenuButton
                      className=" text-base py-5  dark:hover:bg-white/5 "
                      asChild
                      isActive={pathname === item.href}
                    >
                      <a
                        href={item.href}
                        className="flex items-center gap-3 px-4 text-sm py-2 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition duration-300 ease-in-out"
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </div>

      <SidebarRail />
    </Sidebar>
  );
}
