import ProjectInterface from "@/interface/project";
import { useModalStore } from "../../state/modalProject"; // Import the Zustand store
import { Link } from "lucide-react";

const Modal = ({ data }: { data: ProjectInterface }) => {
  const { isModalOpen, closeModal } = useModalStore((state) => ({
    isModalOpen: state.isModalOpen,
    closeModal: state.closeModal,
  }));

  if (!isModalOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={closeModal}
    >
      <div
        className="bg-white dark:bg-[#1c1c1c] p-6 rounded-lg w-11/12 md:w-2/3 lg:w-1/2 xl:w-1/3 shadow-lg relative"
        onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
      >
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-xl text-gray-800 dark:text-gray-100"
        >
          ×
        </button>

        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
          {data.name}
        </h2>

        <div className="w-full h-56 overflow-hidden rounded-lg mb-4">
          <img
            src={data.imageUrl}
            height={300}
            width={600}
            className="w-full h-full object-cover rounded-lg"
            alt="project image"
          />
        </div>

        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
          {data.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {data.tags.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-xs font-medium bg-[#f8f8f8] dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-full shadow-inner"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center mt-4">
          <Link
            href={data.githubUrl}
            target="_blank"
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
          >
            View Code
          </Link>
          <Link
            href={data.liveLink}
            target="_blank"
            className="px-4 py-2 text-sm font-medium text-white dark:text-gray-200 bg-black/85 border-none rounded-lg hover:bg-black/90 transition-all duration-300"
          >
            Live Preview
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Modal;
