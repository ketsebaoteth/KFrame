"use client";

import AboutInfo from "@/components/app/userInfo";
import ErrorUi from "@/components/blocks/error";
import LoadingBlock from "@/components/blocks/loadingBlock";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { SkillCards } from "@/components/ui/skillCards";
import { useQueries } from "@tanstack/react-query";
import axios from "axios";

export default function About({ params }: { params: { id: string } }) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL as string;
  const id = params.id;

  const queries = [
    { key: "info", url: `${backendUrl}/public/info/${id}` },
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

  if (infoResult.isError) {
    return <ErrorUi />;
  }
  if (infoResult.isLoading) {
    return <LoadingBlock />;
  }
  return (
    <div className="py-6 md:py-12">
      <div className="max-w-6xl mx-auto py-5 md:py-14 px-4 md:px-8">
        <h2 className="text-3xl md:text-5xl mb-4 text-black dark:text-white max-w-4xl justify-start">
          Little about myself
        </h2>
        <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base max-w-sm">
          I have been working with computers ever since my childhood. Here is a
          timeline of my journey.
        </p>
      </div>

      <div className="mx-auto max-w-5xl px-4 md:px-8">
        {infoResult?.data && <AboutInfo data={infoResult.data} />}
      </div>

      <hr className="mx-4 md:mx-auto md:my-6 border-dashed border-foreground/40 dark:border-foreground/20 max-w-5xl" />

      <div className="md:mt-12 px-4 md:px-8">
        {skillResult?.data && (
          <SkillCards data={skillResult.data} className="bg-transparent" />
        )}
      </div>

      <hr className="mx-4 md:mx-auto md:my-6 border-dashed border-foreground/40 dark:border-foreground/20 max-w-5xl" />

      <div className="px-4 md:px-8">
        {testimonyResult?.data && (
          <AnimatedTestimonials data={testimonyResult?.data} />
        )}
      </div>
    </div>
  );
}
