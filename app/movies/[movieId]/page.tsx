import { notFound } from "next/navigation";
import { getMovie } from "../movies";
import Link from "next/link";
import { getComments } from "../comments";
import { CommentsOverview } from "@/components/CommentsOverview";

type MovieParams = {
  movieId: string;
};

type MovieProps = {
  params: MovieParams;
};

export default async function MovieById({ params }: MovieProps) {
  const { movieId } = await params;
  const movie = await getMovie(movieId);

  if (!movie) {
    return notFound();
  }

  const comments = await getComments(movieId);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold p-6 text-center">{movie.title}</h1>

      <div className="flex bg-white m-5 p-5 shadow-xl">
        <div className="flex-none w-60">
          {movie.poster ? (
            <img
              src={movie.poster}
              alt={movie.title}
              width={200}
              height={300}
            />
          ) : (
            <div className="flex items-center justify-center h-full w-48 bg-gray-200 text-gray-500">
              �
            </div>
          )}
        </div>
        <div>
          <div className="grid grid-cols-[1fr_3fr]">
            <p className="font-bold">Veröffentlichung:</p>
            <p>{movie.year}</p>
            <p className="font-bold">Länge:</p>
            <p>{movie.runtime} Minuten</p>
            <p className="font-bold">Geschichte (eng):</p>
            <p>{movie.fullplot}</p>
            <p className="font-bold">Regisseur:</p>
            <p>{movie.directors.join(", ")}</p>
            <p className="font-bold">Besetzung:</p>
            <p>{movie.cast?.join(", ")}</p>
            <p className="font-bold">Genre:</p>
            <p>{movie.genres?.join(", ")}</p>
            <p className="font-bold">Sprache:</p>
            <p>{movie.languages?.join(", ")}</p>
            <p className="font-bold">Land:</p>
            <p>{movie.countries.join(", ")}</p>
            <p className="font-bold">Auszeichnungen:</p>
            <p>{movie.awards?.text}</p>
            <p className="font-bold">IMDB Bewertung:</p>
            <p>{movie.imdb?.rating}</p>
          </div>
        </div>
      </div>

      <CommentsOverview comments={comments} className="mx-5" />

      <div className="text-center mt-5">
        <Link
          href="/movies"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition ease-in-out duration-300"
        >
          Zurück zur Übersicht
        </Link>
      </div>
    </div>
  );
}
