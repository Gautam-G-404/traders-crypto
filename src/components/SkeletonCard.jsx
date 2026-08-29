const SkeletonCard = () => {
  return (
    <div className="relative flex flex-col justify-between overflow-hidden h-60 w-50 sm:h-70 sm:w-60 bg-blue-900 rounded px-2 py-1 animate-pulse">
      <div className="absolute top-4 right-4 mt-6 h-8 w-8 bg-slate-700"></div>

      <div className="flex justify-between gap-2 rounded-full bg-slate-700">
        <div className="w-16 h-16 mb-4"></div>
        <div className="h-6 w-24"></div>
      </div>

      <div className="h-4 w-12 sm:mb-2 bg-slate-700"></div>

      <div className="h-20 w-full mt-auto mx-1 bg-slate-700"></div>

      <div className="flex justify-between items-center sm:mt-6 bg-slate-700">
        <div className="flex flex-col items-center ml-2 gap-2">
          <div className="h-6 w-20"></div>
          <div className="h-4 w-16"></div>
        </div>

        <div className="h-8 w-16 bg-slate-700"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
