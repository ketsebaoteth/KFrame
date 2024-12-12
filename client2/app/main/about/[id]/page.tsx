"use client";

import { InfiniteMovingCardsDemo } from "@/components/app/horizontalScroll";
import AboutInfo from "@/components/app/userInfo";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { useQueries } from "@tanstack/react-query";
import axios from "axios";

export default function About({ params }: { params: { id: string } }) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const id = params.id;

  const queries = [
    // { key: "userData", url: `${backendUrl}/public/user/${id}` },
    { key: "info", url: `${backendUrl}/public/info/${id}` },
    // { key: "projects", url: `${backendUrl}/public/projects/${id}` },
    // { key: "articles", url: `${backendUrl}/public/articles/${id}` },
    { key: "skills", url: `${backendUrl}/public/skills/${id}` },
    { key: "testimony", url: `${backendUrl}/public/testimony/${id}` },
  ];

  const results = useQueries({
    queries: queries.map((query) => ({
      queryKey: [query.key],
      queryFn: async () => {
        const response = await axios.get(query.url);
        return response.data;
      },
    })),
  });
  const [infoResult, skillResult, testimonyResult] = results;

  if (infoResult.isLoading || skillResult.isLoading) {
    return <div>Loading...</div>;
  }

  if (infoResult.isError || skillResult.isError) {
    return (
      <div>
        Error: {infoResult.error?.message || skillResult.error?.message}
      </div>
    );
  }

  return (
    <div className="py-6 md:py-12">
      <div className="max-w-5xl mx-auto py-5 md:py-14 px-4 md:px-8">
        <h2 className="text-3xl md:text-5xl mb-4 text-black dark:text-white max-w-4xl justify-start">
          Little about my self
        </h2>
        <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base max-w-sm">
          I&apos;ve been working with computers eversince my childhood.
          Here&apos;s a timeline of my journey.
        </p>
        <div>
          {infoResult?.data?.mainRole && <div>{infoResult.data.mainRole}</div>}
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 md:px-8">
        {infoResult?.data && <AboutInfo data={infoResult.data} />}
      </div>

      <hr className="mx-4 md:mx-auto md:my-6 border-dashed border-foreground/40 dark:border-foreground/20 max-w-5xl" />

      <div className=" md:mt-12 px-0 md:px-0">
        {skillResult?.data && (
          <InfiniteMovingCardsDemo data={skillResult.data} />
        )}
      </div>

      <hr className="mx-4 md:mx-auto md:my-6 border-dashed border-foreground/40 dark:border-foreground/20 max-w-5xl" />

      <div className="px-4 md:px-8">
        <AnimatedTestimonials autoplay={true} data={testimonyResult.data} />
      </div>
    </div>
  );
}
