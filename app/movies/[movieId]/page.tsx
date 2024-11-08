import { getMovie } from "../movies";

type MovieParams = {
  movieId: string;
};

type MovieProps = {
  params: MovieParams;
};

export default async function MovieById({ params }: MovieProps) {
  const { movieId } = await params;
  const movie = await getMovie(movieId);

  return movie?.fullplot;
}
