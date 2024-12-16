import { Hero } from "@/components/hero/home";
import { Nav } from "@/components/hero/nav";

export default function Home() {
  return (
    <div className=" max-h-screen bg-background max-w-screen overflow-x-hidden">
      <div className="relative h-full w-full bg-white dark:bg-white/5">
        <div className=" z-10 flex flex-col w-full min-h-screen">
          <Nav />
          <Hero />
        </div>

        <div className="absolute bottom-0 left-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,255,230,.15),rgba(255,255,255,0))] dark:bg-[radial-gradient(circle_farthest-side,rgba(255,255,230,.15),rgba(0,0,0,0))]"></div>

        <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,255,230,.15),rgba(255,255,255,0))] dark:bg-[radial-gradient(circle_farthest-side,rgba(255,255,230,.15),rgba(0,0,0,0))]"></div>
      </div>
    </div>
  );
}
