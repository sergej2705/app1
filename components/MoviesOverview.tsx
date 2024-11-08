"use client";

import { FC } from "react";
import { MovieCard } from "./MovieCard";
import { Movie } from "@/app/movies/movies";
import { getCommentCounts } from "@/app/movies/comments";
import { getGenres } from "@/app/movies/genres";
import { useRouter } from "next/navigation";

type MoviesOverviewProps = {
  movies: Movie[];
  commentsByMovie: Awaited<ReturnType<typeof getCommentCounts>>;
  allGenres: Awaited<ReturnType<typeof getGenres>>;
  defaultGenre?: string;
};

export const MoviesOverview: FC<MoviesOverviewProps> = ({
  movies,
  commentsByMovie,
  allGenres,
  defaultGenre,
}) => {
  const router = useRouter();

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
        Filmempfehlungen
      </h2>
      <select
        onChange={(event) => {
          const genre = event.target.value;
          if (!genre) {
            return router.push("/movies");
          }
          router.push(`/movies?genre=${genre}`);
        }}
        defaultValue={defaultGenre}
      >
        <option value="">kein Genre</option>
        {allGenres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {movies.map((movie) => (
          <MovieCard
            key={movie._id}
            movie={movie}
            commentCount={commentsByMovie[movie._id]}
          />
        ))}
      </div>
    </div>
  );
};
