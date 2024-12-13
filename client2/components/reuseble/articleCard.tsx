import Link from "next/link";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import ArticlesInterface from "@/interface/articles";

export default function ProjectCard({ data }: { data: ArticlesInterface }) {
  // Function to trim the description to 500 characters
  const truncateDescription = (description: string) => {
    const plainText = description.replace(/<[^>]+>/g, ""); // Strip HTML tags
    return plainText.length > 500 ? `${plainText.slice(0, 500)}...` : plainText;
  };

  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gradient-to-r from-[#f4f4f9] to-[#fafafa] dark:from-[#1c1c1c] dark:to-[#333333] border border-gray-200 dark:border-gray-800 shadow-lg rounded-xl overflow-hidden group/card transition-transform duration-500 hover:scale-[1.05] hover:shadow-xl hover:shadow-[#dcdcdc] dark:hover:shadow-[#5a5a5a] w-auto h-auto p-6">
        <CardItem
          translateZ="50"
          className="text-xl font-semibold text-gray-800 dark:text-white text-shadow-md rounded-md transition-transform duration-300 group-hover/card:scale-105"
        >
          {data.title}
        </CardItem>

        <span
          dangerouslySetInnerHTML={{
            __html: truncateDescription(data.description),
          }}
          className="text-gray-600 dark:text-gray-300 text-xs max-w-xs mt-3 overflow-clip leading-relaxed transition-all duration-300 group-hover/card:text-gray-900 group-hover/card:dark:text-white"
        />

        <CardItem translateZ="40" className="flex gap-1.5 mt-3 flex-wrap">
          {data.tags.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs font-medium bg-[#f8f8f8] dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-full shadow-inner transition-all duration-300 group-hover/card:bg-gray-200 group-hover/card:dark:bg-gray-600 group-hover/card:text-gray-900"
            >
              {tech}
            </span>
          ))}
        </CardItem>

        <div className="flex justify-between items-center my-4">
          <CardItem
            translateZ={20}
            as={Link}
            href="https://your-live-preview-url.com"
            target="__blank"
            className="px-3 py-1.5 rounded-md bg-black/85 text-white hover:bg-black/60 dark:bg-background dark:text-white text-xs font-bold transition-all duration-300"
          >
            Read More
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
