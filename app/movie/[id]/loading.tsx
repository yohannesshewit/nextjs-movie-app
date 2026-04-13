export default function Loading() {
  return (
    <div className="min-h-screen p-6 animate-pulse">
      <div className="max-w-6xl mx-auto flex gap-6">
        {/* Poster skeleton */}
        <div className="w-1/3 h-[500px] bg-gray-800 rounded-xl" />

        {/* Text skeleton */}
        <div className="flex-1 space-y-4">
          <div className="h-10 bg-gray-800 rounded w-2/3" />
          <div className="h-6 bg-gray-800 rounded w-1/4" />
          <div className="h-4 bg-gray-800 rounded w-full" />
          <div className="h-4 bg-gray-800 rounded w-5/6" />
          <div className="h-4 bg-gray-800 rounded w-4/6" />
        </div>
      </div>
    </div>
  );
}
