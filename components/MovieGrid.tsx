import Image from "next/image";
import Link from "next/link";
import MovieSkeleton from "@/components/MovieSkeleton";

type Movie = {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string | null;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
};

export default function MovieGrid({
  movies,
  query,
}: {
  movies: Movie[];
  query: string;
}) {
  // Skeleton fallback
  if (!movies || movies.length === 0) return <MovieSkeleton />;

  return (
    <div className="px-6 py-10">
      {/* Title */}
      <h2 className="text-2xl font-bold mb-6 text-gray-300">
        {query ? `Results for "${query}"` : "Trending Movies"}
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {movies.map((movie) => {
          const title = movie.title || movie.name;
          const year =
            (movie.release_date || movie.first_air_date)?.split("-")[0] ||
            "N/A";

          return (
            <Link key={movie.id} href={`/movie/${movie.id}`}>
              <div className="group cursor-pointer">
                {/* Poster */}
                <div className="relative h-80 overflow-hidden rounded-xl">
                  <Image
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : "/placeholder-image.svg"
                    }
                    alt={title || "movie"}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                    className="object-cover group-hover:scale-110 transition duration-300"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition p-3 flex flex-col justify-end">
                    <h3 className="text-white text-sm font-semibold line-clamp-2">
                      {title}
                    </h3>

                    <p className="text-yellow-400 text-xs mt-1">
                      ⭐ {movie.vote_average?.toFixed(1)} / 10
                    </p>

                    <p className="text-gray-300 text-xs">{year}</p>

                    <p className="text-gray-400 text-xs mt-2 line-clamp-3">
                      {movie.overview || "No description available"}
                    </p>

                    <button className="mt-2 bg-red-500 text-white text-xs px-3 py-1 rounded-full w-fit">
                      ▶ Watch
                    </button>
                  </div>
                </div>

                {/* Bottom Info */}
                <div className="mt-2">
                  <p className="text-sm font-medium line-clamp-1">{title}</p>

                  <p className="text-xs font-bold text-gray-300">
                    ⭐ {movie.vote_average?.toFixed(1)} • {year}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
