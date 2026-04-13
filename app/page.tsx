import HeroSection from "@/components/HeroSection";
import MovieGrid from "@/components/MovieGrid";

async function getMovies(query: string) {
  const url = query
    ? `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${query}`
    : `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.TMDB_API_KEY}`;

  const res = await fetch(url, { cache: "no-store" });
  const data = await res.json();

  return data?.results ?? [];
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const params = await searchParams;
  const query = params?.query || "";

  const movies = await getMovies(query);

  return (
    <>
      <HeroSection movies={movies.slice(0, 5)} query={query} />
      <MovieGrid movies={movies} query={query} />
    </>
  );
}
