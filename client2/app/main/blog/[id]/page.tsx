"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ArticlesInterface from "@/interface/articles";
import { XIcon } from "lucide-react";
import ErrorUi from "@/components/blocks/error";
import LoadingBlock from "@/components/blocks/loadingBlock";

const Blog = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const {
    data: blogs = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["fetchedBlogs", id],
    queryFn: async () => {
      const response = await axios.get(`${backendUrl}/public/articles/${id}`);
      return response.data;
    },
  });

  const [selectedBlog, setSelectedBlog] = useState<ArticlesInterface | null>(
    null
  );

  const truncateDescription = (description: string, maxLength: number) => {
    return description.length > maxLength
      ? description.slice(0, maxLength) + "..."
      : description;
  };

  if (isLoading) {
    return <LoadingBlock />;
  }

  if (isError) {
    return <ErrorUi />;
  }

  return (
    <div className="px-4 sm:px-8 md:px-14 mb-52">
      <div className="max-w-6xl mx-auto pt-10 sm:pt-16 md:pt-20">
        <h2 className="text-3xl sm:text-3xl md:text-4xl mb-3 md:mb-4 text-black dark:text-white mt-5">
          Some of my thoughts and learnings
        </h2>
        <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base max-w-sm">
          I write about my learnings and thoughts about the tech world.
        </p>
      </div>

      <div className="max-w-6xl mx-auto mt-8 flex flex-col gap-6">
        {blogs.length > 0 ? (
          blogs.map((blog: ArticlesInterface) => (
            <div
              key={blog.id}
              className="p-5 border rounded-lg shadow-sm hover:shadow-md transition-shadow dark:bg-white/5 dark:border-white/5"
            >
              <h3 className="text-2xl font-semibold text-black dark:text-white mb-2">
                {blog.title}
              </h3>
              <div
                className="text-neutral-700 dark:text-neutral-300 mb-3"
                dangerouslySetInnerHTML={{
                  __html: truncateDescription(blog.description, 150),
                }}
              />
              <button
                onClick={() => setSelectedBlog(blog)}
                className="text-gray-600 dark:text-gray-400 hover:underline"
              >
                Read More
              </button>
              <div className="flex gap-2 flex-wrap mt-2">
                {blog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 dark:bg-white/5 dark:text-gray-200 px-2 py-1 text-xs rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-neutral-500 dark:text-neutral-400">
            No articles found.
          </p>
        )}
      </div>

      {selectedBlog && (
        <Modal blog={selectedBlog} onClose={() => setSelectedBlog(null)} />
      )}
    </div>
  );
};

interface ModalProps {
  blog: ArticlesInterface;
  onClose: () => void;
}

const Modal = ({ blog, onClose }: ModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 scroll-smooth overflow-y-scroll">
      <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-lg w-full md:max-w-[80vw] md:max-h-[90vh] max-h-[80vh] overflow-y-scroll p-6 scroll-smooth">
        <button
          onClick={onClose}
          className="mt-4 p-1 bg-red-400 rounded-full text-white hover:bg-red-500 mb-5"
        >
          <XIcon size={18} />
        </button>
        <h2 className="text-3xl font-bold text-black dark:text-white mb-4">
          {blog.title}
        </h2>
        <div
          className="text-neutral-700 dark:text-neutral-300 mb-4"
          dangerouslySetInnerHTML={{ __html: blog.description }}
        />
        <div className="flex gap-2 flex-wrap mb-4">
          {blog.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-300 text-gray-900 dark:bg-neutral-800 dark:text-gray-200 px-2 py-1 text-base rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
