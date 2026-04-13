"use client";

import { Popcorn, Search } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Movie = {
  poster_path: string | null;
};

export default function HeroSection({
  movies,
  query,
}: {
  movies: Movie[];
  query: string;
}) {
  const router = useRouter();

  const [input, setInput] = useState(query || "");
  const [debouncedQuery, setDebouncedQuery] = useState(query || "");

  // sync input with URL

  useEffect(() => {
    if (query !== input) {
      setInput(query || "");
    }
  }, [query]);

  // debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (input !== query) {
        setDebouncedQuery(input);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [input, query]);

  // update URL
  useEffect(() => {
    if (debouncedQuery === query) return;

    const params = new URLSearchParams();
    const cleanQuery = debouncedQuery.trim();

    if (cleanQuery) {
      params.set("query", cleanQuery);
    }

    router.replace(params.toString() ? `/?${params}` : "/");
  }, [debouncedQuery, query, router]);

  return (
    <div className={`h-[40vh] relative overflow-hidden `}>
      <div className="absolute inset-0 flex flex-row justify-end p-7 z-10  "></div>
      {/* 🎬 BACKGROUND IMAGES */}
      <div className="absolute inset-0 grid grid-cols-5 gap-1 opacity-50">
        {query && movies.length > 0
          ? movies.map((movie, index) => (
              <div key={index} className="relative">
                <Image
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "/fallback.jpg"
                  }
                  alt="movie"
                  fill
                  sizes="20vw"
                  priority={index < 2}
                  className="object-cover"
                />
              </div>
            ))
          : Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="relative">
                <Image
                  src={`/movie-img/movie-${index + 1}.webp`}
                  alt={`movie-${index + 1}`}
                  fill
                  sizes="20vw"
                  priority={index < 2}
                  className="object-cover"
                />
              </div>
            ))}
      </div>

      {/* 🔥 GRADIENT FADE (KEY PART) */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/40 to-black z-10" />

      {/* 🎯 CONTENT */}
      <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-4">
        <div className="bg-red-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
          <Popcorn className="h-7 w-7 text-white" />
        </div>

        <h1 className="font-bold text-6xl text-white">MovieBox</h1>

        <p className="opacity-70 font-medium mb-6 text-white font-serif mt-2">
          Discover trending movies and search instantly
        </p>

        {/* 🔍 SEARCH */}
        <div className="flex items-center bg-black/50 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 w-[80%] md:w-100">
          <Search className="h-5 w-5 text-gray-300" />

          <input
            type="search"
            placeholder="Search movies..."
            value={input}
            autoFocus
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setDebouncedQuery(input);
              }
            }}
            className="bg-transparent w-full px-3 outline-none text-white"
          />
        </div>
      </div>
    </div>
  );
}
