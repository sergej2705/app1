import { MoviesOverview } from "@/components/MoviesOverview";
import { getCommentCounts } from "./comments";
import { getGenres } from "./genres";
import { getMovies } from "./movies";

type MoviesProps = {
  searchParams: Promise<{
    genre?: string;
  }>;
};

export default async function Movies({ searchParams }: MoviesProps) {
  const { genre } = await searchParams;
  const movies = await getMovies(genre);

  const movieIds: Parameters<typeof getCommentCounts>[0] = movies.map(
    (movie) => movie._id
  );

  const allGenres = await getGenres();

  const commentsByMovie: Awaited<ReturnType<typeof getCommentCounts>> =
    await getCommentCounts(movieIds);

  return (
    <MoviesOverview
      movies={movies}
      commentsByMovie={commentsByMovie}
      allGenres={allGenres}
      defaultGenre={genre}
    />
  );
}
