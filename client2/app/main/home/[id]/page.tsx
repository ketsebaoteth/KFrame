"use client";

import { ThreeDCardDemo } from "@/components/app/cardAnimated";
import { InfiniteMovingCardsDemo } from "@/components/app/horizontalScroll";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Cover } from "@/components/ui/cover";
import { DirectionAwareHover } from "@/components/ui/direction-aware-hover";
import {
  IconBrandGithub,
  IconBrandLinkedin,
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
import ProjectInterface from "@/interface/project";
import ArticlesInterface from "@/interface/articles";

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
  ] = results;

  if (results.some((result) => result.isLoading)) {
    return <div>Loading...</div>;
  }
  if (results.some((result) => result.isError)) {
    return <div>Error happened</div>;
  }

  return (
    <div className="min-h-screen text-foreground overflow-x-hidden">
      <main className="container max-w-full md:max-w-7xl xl:max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="min-h-[85vh] flex-1 w-full">
          <section className="pt-6 sm:pt-10 hidden md:block">
            {mounted && (
              <GitHubCalendar
                username="yeabnoah"
                theme={{
                  light: [
                    "#f0f0f0",
                    "#9be9a8",
                    "#40c463",
                    "#30a14e",
                    "#216e39",
                  ],
                  dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
                }}
                colorScheme={theme as "light" | "dark"}
              />
            )}
          </section>

          <hr className="my-6 border-dashed border-foreground/40 dark:border-foreground/20 hidden md:block" />

          <section
            id="about"
            className="flex justify-center flex-col-reverse md:flex-row items-center md:justify-between md:mr-[5rem] py-8 gap-6 md:gap-8"
          >
            <div className="w-full md:w-1/2 space-y-4 shrink-0 px-4 md:px-0">
              <div>
                <h1 className="text-2xl md:text-start text-center sm:text-3xl lg:text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
                  Hi, Im {userDataResult && userDataResult?.data?.name} a
                  <br />
                  <Cover className="text-teal-500">
                    {infoResult.data && infoResult.data.mainRole}
                  </Cover>{" "}
                  {infoResult.data && infoResult.data.word}
                </h1>
                <p className="text-sm text-center md:text-start sm:text-base text-foreground dark:text-foreground/80 mt-3">
                  {infoResult.data && infoResult.data.moto}
                </p>
              </div>

              <div className="flex justify-center md:justify-normal gap-4 sm:gap-6">
                <Link
                  href="#"
                  className="text-foreground dark:text-foreground/80 hover:text-teal-500 hover:scale-125 hover:rotate-6 transition-colors"
                >
                  <IconBrandGithub className="h-10 w-10" />
                  <span className="sr-only">GitHub</span>
                </Link>
                <Link
                  href="#"
                  className="text-foreground dark:text-foreground/80 hover:text-teal-500 hover:scale-125 hover:rotate-6 transition-colors"
                >
                  <IconBrandTwitter className="h-10 w-10" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link
                  href="#"
                  className="text-foreground dark:text-foreground/80 hover:text-teal-500 hover:scale-125 hover:rotate-6 transition-colors"
                >
                  <IconBrandLinkedin className="h-10 w-10" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
                <Link
                  href="#"
                  className="text-foreground dark:text-foreground/80 hover:text-teal-500 hover:scale-125 hover:rotate-6 transition-colors"
                >
                  <IconMail className="h-10 w-10" />
                  <span className="sr-only">Email</span>
                </Link>
              </div>
            </div>
            <DirectionAwareHover
              className="w-32 h-32 sm:w-40 sm:h-40 md:w-64 md:h-64"
              imageUrl={userDataResult.data && userDataResult?.data?.image}
            >
              <p className="font-bold text-lg md:text-xl">
                {infoResult.data && infoResult.data.mainRole}{" "}
                {infoResult.data && infoResult.data.word}
              </p>
            </DirectionAwareHover>
          </section>

          <InfiniteMovingCardsDemo
            data={skillResult.data && skillResult.data}
          />

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
              <Button
                variant="outline"
                className="dark:bg-background rounded-md bg-foreground/90 hover:bg-foreground/85 border-none text-xs text-white transition-colors"
              >
                View All Projects
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </section>

          <hr className="my-6 border-dashed border-foreground/40 dark:border-foreground/20" />

          <section id="articles" className="py-3 px-4 md:px-0">
            <h2 className="text-2xl font-semibold mb-4">Recent Articles</h2>
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
            <div className="mt-6">
              <Button
                variant="outline"
                className="dark:bg-background rounded-md bg-foreground/90 hover:bg-foreground/85 text-xs border-none text-white transition-colors"
              >
                View All Articles
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </section>

          <hr className="my-6 border-dashed border-foreground/40 dark:border-foreground/20" />

          <section id="contact" className="py-12">
            <Card className="bg-background/5 hover:bg-background/10 shadow-sm shadow-foreground/20 dark:shadow-foreground/5  text-foreground transition-colors">
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-base font-semibold mb-4">Get in Touch</h2>
                <p className="mb-6 text-foreground dark:text-foreground/80">
                  Im always open to new opportunities and collaborations. Feel
                  free to reach out!
                </p>
                <Button className="bg-foreground/90 dark:bg-background hover:bg-foreground/85 text-white transition-colors">
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
          <p className="text-sm text-muted-foreground text-center sm:text-left dark:text-foreground/80">
            Built by Yeabsra Ashebir. The source code is available on{" "}
            <Link
              href="#"
              className="font-medium underline underline-offset-4 hover:text-foreground"
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
