export default function MovieSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="h-80 bg-gray-800 rounded-xl animate-pulse" />
      ))}
    </div>
  );
}
