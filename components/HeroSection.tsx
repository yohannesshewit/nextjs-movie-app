"use client";

import { Popcorn, Search } from "lucide-react";
import Image from "next/image";
import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

type Movie = {
  poster_path: string | null;
};

export default function HeroSection({
  movies,
  query,
}: {
  movies: Movie[];  //movies = food(what we already fetched from kitchen based on order)   
  query: string;    //query = order reason(what the customer is searching for / ordering) (“I want burger”) to make our ui smart
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // 🔑 input is ONLY controlled by user (no fighting with URL)
  const [input, setInput] = useState(query || ""); //query if it has a value, null or error or undefined use an empty string ""
  const [debouncedQuery, setDebouncedQuery] = useState(query || "");

  // 🧠 debounce typing
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(input);
    }, 400);  //start timing 400ms when u stop typing

    return () => clearTimeout(timer);  //clear previous timing exist upto 400ms  while start typing
  }, [input]);

  // 🚀 update URL smoothly (non-blocking)
  useEffect(() => {
    if (debouncedQuery === query) return;  //Only update the URL if ( new input(debouncedQuery)!== current url(query)

    const params = new URLSearchParams(); //create new query string
    const cleanQuery = debouncedQuery.trim(); //remove or cut extra space both side

    if (cleanQuery) {
      params.set("query", cleanQuery);  //set or update query parameter by cleanQuery , with out url update
    }

    startTransition(() => {
      router.replace(params.toString() ? `/?${params}` : "/");  //This converts your URLSearchParams into a real query string.and update the url with out reload page
    });
  }, [debouncedQuery, query, router]);

  return (
    <div className="h-[40vh] relative overflow-hidden">
      {/* 🎬 BACKGROUND */}
      <div className="absolute inset-0 grid grid-cols-5 gap-1 opacity-50">
        {query && movies.length > 0
          ? movies.slice(0, 5).map((movie, index) => (
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

      {/* 🔥 GRADIENT */}
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
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setDebouncedQuery(input);
              }
            }}
            className="bg-transparent w-full px-3 outline-none text-white"
          />
        </div>

        {/* ⚡ optional loading indicator */}
        {isPending && (
          <p className="text-sm text-gray-300 mt-3">Searching...</p>
        )}
      </div>
    </div>
  );
}
