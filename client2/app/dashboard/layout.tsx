import { MobileHeader } from "@/components/dashboard/mobile-header";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" overflow-hidden">
      <div className="relative h-full w-full bg-black">
        <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,255,230,.15),rgba(255,255,255,0))]"></div>
        <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,255,230,.15),rgba(255,255,255,0))]"></div>
        <SidebarProvider>
          <div className="flex h-screen w-full overflow-hidden">
            <DashboardSidebar />

            <div className="flex flex-col flex-1 overflow-hidden">
              <MobileHeader />
              <main className="flex-1 md:pl-20 w-full overflow-y-auto bg-background p-4 md:p-8 z-20">
                <ThemeToggle />
                {children}
              </main>
            </div>
          </div>
        </SidebarProvider>
      </div>
    </div>
  );
}
