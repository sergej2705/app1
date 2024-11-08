"use server";

import client from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { z } from "zod";

const MovieType = z.object({
  _id: z.instanceof(ObjectId),
  plot: z.string().optional(),
  genres: z.string().array().optional(),
  poster: z.string().optional(),
  title: z.string(),
  fullplot: z.string().optional(),
  released: z.date().optional(),
});

export type Movie = z.infer<typeof MovieType>;

const MoviesType = z.array(MovieType);

export const getMovies = async (): Promise<Movie[]> => {
  const mongoClient = await client.connect();

  try {
    const db = mongoClient.db("sample_mflix");

    const maybeMovies = await db
      .collection("movies")
      .find({ released: { $exists: true } })
      .sort({ released: -1 })
      .limit(12)
      .toArray();

    const movies = MoviesType.parse(maybeMovies);

    return movies;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getMovie = async (id: string) => {
  const mongoClient = await client.connect();

  try {
    const db = mongoClient.db("sample_mflix");

    const maybeMovie = await db
      .collection("movies")
      .findOne({ _id: new ObjectId(id) });

    if (!maybeMovie) {
      return null;
    }

    const movie = MovieType.parse(maybeMovie);

    return movie;
  } catch (error) {
    console.error(error);
    return null;
  }
};
