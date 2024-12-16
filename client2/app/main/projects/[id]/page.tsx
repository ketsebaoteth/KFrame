"use client";
import ErrorUi from "@/components/blocks/error";
import LoadingBlock from "@/components/blocks/loadingBlock";
import { Timeline } from "@/components/ui/timeline";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Page = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  //   const data = [
  //     {
  //       title: "AI Hackathon Assistant",
  //       content: (
  //         <TimelineEntryContent
  //           image="/telegram.jpg"
  //           description="An AI-powered assistant that helps developers during hackathons by providing real-time coding suggestions, project management, and resource optimization.An AI-powered assistant that helps developers during hackathons by providing real-time coding suggestions, project management, and resource optimization.An AI-powered assistant that helps developers during hackathons by providing real-time coding suggestions, project management, and resource optimization.An AI-powered assistant that helps developers during hackathons by providing real-time coding suggestions, project management, and resource optimization."
  //           techStack={[
  //             { name: "Next.js" },
  //             { name: "TypeScript" },
  //             { name: "OpenAI" },
  //             { name: "TailwindCSS" },
  //           ]}
  //           detailsLink="/projects/ai-hackathon-assistant"
  //         />
  //       ),
  //     },
  //     {
  //       title: "Early 2023 Project",
  //       content: (
  //         <TimelineEntryContent
  //           image="/telegram.jpg"
  //           description="A comprehensive web application that revolutionizes how developers approach project documentation and collaboration.An AI-powered assistant that helps developers during hackathons by providing real-time coding suggestions, project management, and resource optimization.An AI-powered assistant that helps developers during hackathons by providing real-time coding suggestions, project management, and resource optimization."
  //           techStack={[
  //             { name: "React" },
  //             { name: "Node.js" },
  //             { name: "MongoDB" },
  //             { name: "Docker" },
  //           ]}
  //           detailsLink="/projects/early-2023"
  //         />
  //       ),
  //     },
  //     {
  //       title: "Changelog Project",
  //       content: (
  //         <TimelineEntryContent
  //           image="/telegram.jpg"
  //           description="An automated changelog generation tool that integrates with Git repositories to create beautiful, organized release notes.An AI-powered assistant that helps developers during hackathons by providing real-time coding suggestions, project management, and resource optimization.An AI-powered assistant that helps developers during hackathons by providing real-time coding suggestions, project management, and resource optimization."
  //           techStack={[
  //             { name: "Python" },
  //             { name: "FastAPI" },
  //             { name: "PostgreSQL" },
  //             { name: "Redis" },
  //           ]}
  //           detailsLink="/projects/changelog"
  //         />
  //       ),
  //     },
  //   ];

  const {
    data: projects,
    isLoading,
    isError,
  } = useQuery({
    queryFn: async () => {
      const response = await axios.get(`${backendUrl}/public/projects/${id}`);
      return response.data;
    },
    queryKey: ["projectsFetched"],
  });

  if (isLoading) {
    return <LoadingBlock />;
  }

  if (isError) {
    return <ErrorUi />;
  }
  return (
    <div>
      <Timeline data={projects} />
    </div>
  );
};

export default Page;
