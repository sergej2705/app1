import { Movie } from "@/app/movies/movies";
import Link from "next/link";
import { DateTime } from "luxon";

export type MovieProps = {
  movie: Movie;
};

export const MovieCard: React.FC<MovieProps> = ({ movie }) => {
  return (
    <div className="group relative shadow-lg rounded-lg overflow-hidden bg-white">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        {movie.poster && (
          <img
            alt={movie.title}
            src={movie.poster}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        )}
      </div>
      <div className="flex flex-col justify-between p-4 gap-2">
        <div>
          <h3 className="text-sm text-gray-700">
            <Link href={`/movies/${movie._id}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {movie.title}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{movie.plot}</p>
        </div>
        {movie.genres && (
          <div className="flex flex-wrap gap-2">
            {movie.genres.map((genre) => (
              <span className="rounded text-sm bg-green-700 text-white px-2 py-1">
                {genre}
              </span>
            ))}
          </div>
        )}
        <p className="text-sm font-medium text-gray-900">
          {movie.released &&
            DateTime.fromJSDate(movie.released).toLocaleString(
              DateTime.DATE_FULL
            )}
        </p>
      </div>
    </div>
  );
};
