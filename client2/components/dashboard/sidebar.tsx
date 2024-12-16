"use client";

import { Button } from "@/components/ui/button";
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
  SquareDashedBottomCodeIcon,
  User,
  X,
} from "lucide-react";
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
    <Sidebar className="border-r !zbg-black">
      <SidebarHeader className="border-b px-6 py-4 flex items-center justify-between">
        <div className=" flex flex-row gap-3 items-center">
          <SquareDashedBottomCodeIcon />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Frame
          </h2>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="md:hidden"
        >
          <X className="h-6 w-6 text-gray-900 dark:text-white" />
          <span className="sr-only">Close Sidebar</span>
        </Button>
      </SidebarHeader>
      <SidebarContent className="flex flex-col h-[calc(100vh-5rem)]">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className=" gap-3">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    className=" text-base py-5"
                    asChild
                    isActive={pathname === item.href}
                  >
                    <a
                      href={item.href}
                      className="flex items-center gap-3 px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition duration-300 ease-in-out"
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
      <SidebarRail />
    </Sidebar>
  );
}
