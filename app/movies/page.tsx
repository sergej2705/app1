import { MovieCard } from "@/components/MovieCard";
import { getMovies, Movie } from "./movies";

export default async function Movies() {
  const movies = await getMovies();

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
        Filmempfehlungen
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {movies.map((movie) => (
          <MovieCard key={movie._id.toString()} movie={movie} />
        ))}
      </div>
    </div>
  );
}
