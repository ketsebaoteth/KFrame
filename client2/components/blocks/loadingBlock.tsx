const LoadingBlock = () => {
  return (
    <div className="min-h-screen flex justify-center items-center ">
      <div className="flex flex-col justify-center items-center  p-8 rounded-lg w-96">
        <div className="animate-spin rounded-full border-t-4 border-black dark:border-white h-16 w-16 mb-6"></div>
        <h2 className="text-xl font-normal dark:text-white/80 text-gray-800 mb-4">
          Loading...
        </h2>
      </div>
    </div>
  );
};
export default LoadingBlock;
