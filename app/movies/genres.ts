import client from "@/lib/mongodb";
import { z } from "zod";

export const getGenres = async (): Promise<string[]> => {
  const mongoClient = await client.connect();

  try {
    const db = mongoClient.db("sample_mflix");

    const maybeGenres = await db.collection("movies").distinct("genres");

    if (!maybeGenres) {
      return [];
    }

    const genres = z.string().array().parse(maybeGenres);

    return genres;
  } catch (error) {
    console.error(error);
    return [];
  }
};
