"use client";

import { ThreeDCardDemo } from "@/components/app/cardAnimated";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Cover } from "@/components/ui/cover";
import { SkillCards } from "@/components/ui/skillCards";
import ArticlesInterface from "@/interface/articles";
import ProjectInterface from "@/interface/project";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandTelegram,
  IconBrandTwitter,
  IconMail,
} from "@tabler/icons-react";
import { useQueries } from "@tanstack/react-query";
import axios from "axios";
import { ExternalLink, Mail } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import GitHubCalendar from "react-github-calendar";
import ArticleCard from "../../../../components/reuseble/articleCard";

const HomeComponent = ({ params }: { params: { id: string } }) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const id = params.id;
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const queries = [
    { key: "userData", url: `${backendUrl}/public/user/${id}` },
    { key: "info", url: `${backendUrl}/public/info/${id}` },
    { key: "projects", url: `${backendUrl}/public/projects/${id}` },
    { key: "articles", url: `${backendUrl}/public/articles/${id}` },
    { key: "skills", url: `${backendUrl}/public/skills/${id}` },
    { key: "links", url: `${backendUrl}/public/links/${id}` },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  const results = useQueries({
    queries: queries.map((query) => ({
      queryKey: [query.key],
      queryFn: async () => {
        const response = await axios.get(query.url);
        return response.data;
      },
    })),
  });

  const [
    userDataResult,
    infoResult,
    projectsResult,
    articlesResult,
    skillResult,
    linksResult,
  ] = results;

  if (results.some((result) => result.isLoading)) {
    return <div>Loading...</div>;
  }
  if (results.some((result) => result.isError)) {
    return <div>Error happened</div>;
  }

  return (
    <div className="min-h-screen text-foreground overflow-x-hidden">
      <main className="container max-w-full md:max-w-7xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="min-h-[85vh] flex-1 w-full">
          <section className="pt-6 sm:pt-10 hidden md:block">
            {mounted && (
              <div className="relative group overflow-hidden rounded-3xl border border-gray-200 dark:border-white/5 shadow-lg transition-all duration-500 p-6 bg-white dark:bg-white/5 ">
                <GitHubCalendar
                  username="yeabnoah"
                  theme={{
                    light: [
                      "#f0f0f0",
                      "#d4d4d4",
                      "#a3a3a3",
                      "#737373",
                      "#525252",
                    ],
                    dark: [
                      "#161b22",
                      "#2d2d2d",
                      "#4b4b4b",
                      "#737373",
                      "#a3a3a3",
                    ],
                  }}
                  colorScheme={theme as "light" | "dark"}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-300 opacity-0  transition-opacity duration-500 pointer-events-none rounded-3xl"></div>
                <div className="absolute inset-0 scale-95 group-hover:scale-100 transition-transform duration-500"></div>
              </div>
            )}
          </section>

          <hr className="my-6 border-dashed border-foreground/40 dark:border-foreground/20 hidden md:block" />

          <section
            id="about"
            className="flex my-10 flex-col-reverse md:flex-row items-center md:justify-between md:mr-[5rem] py-8 gap-6 md:gap-8"
          >
            <div className="w-full md:w-1/2 space-y-4 shrink-0 px-4 md:px-0">
              <div>
                <h1 className="text-2xl md:text-start text-center sm:text-3xl lg:text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
                  Hi, I am {userDataResult?.data?.name}, a
                  <br />
                  <Cover className="text-teal-500">
                    {infoResult?.data?.mainRole}
                  </Cover>{" "}
                  {infoResult?.data?.word}
                </h1>
                <p className="text-sm text-center md:text-start sm:text-base text-foreground dark:text-foreground/80 mt-3">
                  {infoResult?.data?.moto}
                </p>
              </div>

              <div className="flex justify-center md:justify-normal gap-4 sm:gap-6 mt-6">
                {[
                  {
                    name: "GitHub",
                    href: linksResult?.data?.github,
                    icon: <IconBrandGithub className="h-10 w-10" />,
                  },
                  {
                    name: "Twitter",
                    href: linksResult?.data?.links?.x,
                    icon: <IconBrandTwitter className="h-10 w-10" />,
                  },
                  {
                    name: "LinkedIn",
                    href: linksResult?.data?.links?.linkedIn,
                    icon: <IconBrandLinkedin className="h-10 w-10" />,
                  },
                  {
                    name: "Telegram",
                    href: linksResult?.data?.links?.telegram,
                    icon: <IconBrandTelegram className="h-10 w-10" />,
                  },
                  {
                    name: "Email",
                    href: linksResult?.data?.email
                      ? `mailto:${linksResult.data.email}`
                      : "#",
                    icon: <IconMail className="h-10 w-10" />,
                  },
                ].map(({ name, href, icon }) => (
                  <Link
                    key={name}
                    href={href || "#"}
                    className="text-gray-700 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-white/5 hover:scale-110 hover:rotate-3 transition-all duration-300 rounded-full p-2"
                  >
                    {icon}
                    <span className="sr-only">{name}</span>
                  </Link>
                ))}
              </div>
            </div>

            <img
              src={userDataResult?.data?.image}
              height={230}
              width={230}
              className="object-cover rounded-lg transition-transform duration-500 ease-out transform group-hover:scale-105 group-hover:rotate-3 group-hover:shadow-lg group-hover:bg-gradient-to-r from-blue-500 to-purple-500"
              alt="thumbnail"
            />
          </section>

          <hr className="my-6 border-dashed border-foreground/40 dark:border-foreground/20 hidden md:block" />

          <SkillCards data={skillResult.data && skillResult.data} />

          <hr className="my-2 hidden md:block border-dashed border-foreground/40 dark:border-foreground/20" />

          <section id="projects" className="py-2 px-4 md:px-0">
            <h2 className="text-xl font-semibold mb-4">Recent Projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {projectsResult.data &&
                projectsResult.data.map(
                  (easy: ProjectInterface, index: number) => (
                    <div key={index}>
                      <ThreeDCardDemo data={easy} />
                    </div>
                  )
                )}
            </div>
            <div className="mt-6 flex justify-start">
              <Link
                href={`/main/projects/${id}`}
                className="dark:bg-background flex items-center justify-center p-2 rounded-md bg-foreground/90 hover:bg-foreground/85 border-none text-xs text-white transition-colors"
              >
                View All Projects
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </section>

          <hr className="my-6 border-dashed border-foreground/40 dark:border-foreground/20" />

          <section id="articles" className=" px-4 md:px-0">
            <h2 className="text-2xl font-semibold ">Recent Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {articlesResult.data &&
                articlesResult.data.map(
                  (data: ArticlesInterface, index: number) => (
                    <div key={index}>
                      <ArticleCard data={data} />
                    </div>
                  )
                )}
            </div>
            <div className="mt-2 flex justify-start">
              <Link
                href={`/main/blog/${id}`}
                className="dark:bg-background p-2 flex justify-center rounded-md bg-foreground/90 hover:bg-foreground/85 text-xs border-none text-white transition-colors"
              >
                View All Articles
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </section>

          <hr className=" mt-5 border-dashed border-foreground/40 dark:border-foreground/20" />

          <section id="contact" className="py-8">
            <Card className="bg-background/5 hover:bg-background/10 shadow-sm shadow-foreground/20 dark:shadow-foreground/5 text-foreground transition-all transform hover:scale- hover:shadow-lg">
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-base font-semibold mb-4 transition-colors group-hover:text-foreground/80">
                  Get in Touch
                </h2>
                <p className="mb-6 text-foreground dark:text-foreground/80 group-hover:text-foreground">
                  I am always open to new opportunities and collaborations. Feel
                  free to reach out!
                </p>
                <Button
                  onClick={() => {
                    if (linksResult.data.email) {
                      window.location.href = `mailto:${linksResult.data.email}?subject=Hello&body=I%20would%20like%20to%20contact%20you.`;
                    } else {
                      console.log("No email found");
                    }
                  }}
                  className="bg-foreground/90 dark:bg-background hover:bg-foreground/85 text-white transition-colors group hover:scale-105 transform"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Me
                </Button>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>

      <footer className="border-t py-6">
        <div className="container px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center sm:text-left dark:text-foreground/80 group">
            Built by Yeabsra Ashebir. The source code is available on{" "}
            <Link
              href="#"
              className="font-medium underline underline-offset-4 group-hover:text-foreground transition-all duration-300 ease-in-out"
            >
              GitHub
            </Link>
            .
          </p>

          <p className="text-sm text-muted-foreground text-center sm:text-left dark:text-foreground/80">
            © {new Date().getFullYear()} Yeabsra Ashebir. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomeComponent;
