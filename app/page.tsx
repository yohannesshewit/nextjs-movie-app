import HeroSection from "@/components/HeroSection";
import MovieGrid from "@/components/MovieGrid";

async function getMovies(query: string) {
  const url = query
    ? `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${query}`
    : `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.TMDB_API_KEY}`;
//query is true ,url = search/movie API      query is false, url = trending/movie API

  
  const res = await fetch(url, { cache: "no-store" });  //Fresh data is fetched ,Makes search dynamic
  const data = await res.json(); //res is the response from fetch() then .json() reads the body and converts it into a JavaScript object

  return data?.results ?? []; //Give me the movie list if it exists, otherwise give me an empty list so nothing breaks or crash
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const params = await searchParams;  //searchParams is likely coming from props in Next.js (App Router).
  const query = params?.query || "";   //If params exists, get query. If not, return undefined."

  const movies = await getMovies(query); //blocks UI rendering until data is first ready

  return (
    <>
      <HeroSection movies={movies.slice(0, 5)} query={query} />
      <MovieGrid movies={movies} query={query} />
    </>
  );
}
