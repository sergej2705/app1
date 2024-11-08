"use server";

import client from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { z } from "zod";

const MovieType = z.object({
  _id: z.coerce.string(),
  plot: z.string().optional(),
  genres: z.array(z.string()).optional(),
  poster: z.string().optional(),
  title: z.string(),
  fullplot: z.string().optional(),
  year: z.number(),
  runtime: z.number().optional(),
  cast: z.array(z.string()).optional(),
  released: z.date().optional(),
  directors: z.array(z.string()),
  writers: z.array(z.string()).optional(),
  awards: z
    .object({
      wins: z.number(),
      nominations: z.number(),
      text: z.string(),
    })
    .optional(),
  lastupdated: z.string(),
  type: z.string(),
  countries: z.array(z.string()),
  languages: z.array(z.string()).optional(),
  rated: z.string().optional(),
  imdb: z
    .object({
      rating: z.union([z.number(), z.string()]),
      votes: z.union([z.number(), z.string()]),
      id: z.number(),
    })
    .optional(),
});

export type Movie = z.infer<typeof MovieType>;

const MoviesType = z.array(MovieType);

export const getMovies = async (genre?: string): Promise<Movie[]> => {
  const mongoClient = await client.connect();

  try {
    const db = mongoClient.db("sample_mflix");

    const maybeMovies = await db
      .collection("movies")
      .find({
        released: { $exists: true },
        ...(genre ? { genres: genre } : {}),
      })
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
