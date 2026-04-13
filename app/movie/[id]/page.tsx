import { log } from "console";
import { CircleArrowLeft, StepBack } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

async function getMovie(id: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}`,
    { cache: "no-store" },
  );

  if (!res.ok) throw new Error("Failed to fetch movie");

  return res.json();
}

export default async function MoviePage({
  params,
}: {
  params: Promise<{ id: string }>; // ✅ correct type
}) {
  const { id } = await params;
  const movie = await getMovie(id);
  {
    /* console.log(movie);*/
  } // to see what movie contain

  return (
    <div className="min-h-screen text-white p-6 relative">
      {/* Background */}
      {movie.backdrop_path && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20 -z-10"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
          }}
        />
      )}

      <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Back Button */}
        <Link href="/" className="inline-block mb-6">
          <button className="group bg-white/10 backdrop-blur-md text-white p-3 rounded-full shadow-lg hover:bg-blue-500/30 transition duration-300 hover:scale-110 active:scale-95 border border-white/20">
            <CircleArrowLeft className="w-6 h-6 transition-transform duration-300 group-hover:-translate-x-1" />
          </button>
        </Link>

        {/* Poster */}
        <div className="relative w-full md:w-1/3 h-[500px] rounded-xl overflow-hidden shadow-lg hover:scale-105 transition duration-300">
          <Image
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "/no-image.png"
            }
            alt={movie.title}
            fill
            className="object-cover opacity-0 animate-fadeIn"
            priority // ✅ THIS is the fix first appear
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAB..."
          />
        </div>

        {/* Info */}
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-3">{movie.title}</h1>

          {/* Rating + Year */}
          <div className="flex items-center gap-4 mb-4">
            <p className="text-yellow-400 text-lg">
              ⭐ {movie.vote_average?.toFixed(1)} / 10
            </p>

            <p className="text-gray-400">{movie.release_date?.split("-")[0]}</p>
          </div>

          {/* Genres */}
          <div className="flex flex-wrap gap-2 mb-4">
            {movie.genres?.map((g: any) => (
              <span
                key={g.id}
                className="bg-gray-800 px-3 py-1 rounded-full text-sm"
              >
                {g.name}
              </span>
            ))}
          </div>

          {/* Overview */}
          <p className="text-gray-300 leading-relaxed mb-6">
            {movie.overview || "No description available."}
          </p>

          {/* Extra Info */}
          <div className="space-y-2 text-sm text-gray-400">
            <p>🎬 Status: {movie.status}</p>
            <p>⏱ Runtime: {movie.runtime} min</p>
            <p>💰 Budget: ${movie.budget?.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
