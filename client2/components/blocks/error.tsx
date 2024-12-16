import { SearchCheckIcon } from "lucide-react";

const ErrorUi = () => {
  return (
    <div className="min-h-screen flex justify-center items-center ">
      <div className="flex flex-col justify-center items-center rounded-sm  p-8  w-96">
        <SearchCheckIcon className="text-red-500 h-24 w-24 mb-6" />
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white/70 mb-4">
          Something Went Wrong
        </h2>
        <p className="text-center text-gray-500 text-sm dark:text-white/80">
          Please verify the user exists, or check if the user information is
          properly filled in the Dashboard.
        </p>
        <button
          className="mt-6 px-6 py-2 bg-red-500 text-white rounded-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    </div>
  );
};
export default ErrorUi;
