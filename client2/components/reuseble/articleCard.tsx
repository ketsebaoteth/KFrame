import Link from "next/link";
import ArticlesInterface from "@/interface/articles";

export default function ProjectCard({ data }: { data: ArticlesInterface }) {
  const truncateDescription = (description: string) => {
    const plainText = description.replace(/<[^>]+>/g, ""); // Strip HTML tags
    return plainText.length > 500 ? `${plainText.slice(0, 500)}...` : plainText;
  };

  return (
    <div className="bg-white/70 my-5 dark:bg-white/5 border border-gray-200 dark:border-white/5 shadow-lg rounded-xl overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl dark:hover:shadow-none w-auto h-auto p-6">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white transition-colors duration-300">
        {data.title}
      </h3>

      <p
        dangerouslySetInnerHTML={{
          __html: truncateDescription(data.description),
        }}
        className="text-gray-600 dark:text-gray-300 text-sm mt-3 leading-relaxed"
      />

      {/* Tags */}
      <div className="flex gap-2 mt-3 flex-wrap">
        {data.tags.map((tech) => (
          <span
            key={tech}
            className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-white/5 text-gray-800 dark:text-gray-100 rounded-full"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-4">
        <Link
          href="https://your-live-preview-url.com"
          target="__blank"
          className="inline-block px-4 py-2 bg-black text-white text-xs font-bold rounded-md transition-all duration-300"
        >
          Read More
        </Link>
      </div>
    </div>
  );
}
