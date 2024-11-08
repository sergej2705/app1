import client from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { z } from "zod";

const CommentType = z.object({
  _id: z.instanceof(ObjectId),
  movie_id: z.instanceof(ObjectId),
  name: z.string(),
  email: z.string(),
  text: z.string(),
  date: z.date(),
});

export type Comment = z.infer<typeof CommentType>;

const CommentsType = z.array(CommentType);

export const getComments = async (movieId: string): Promise<Comment[]> => {
  const mongoClient = await client.connect();

  try {
    const db = mongoClient.db("sample_mflix");

    const maybeComments = await db
      .collection("comments")
      .find({ movie_id: new ObjectId(movieId) })
      .sort({ date: -1 })
      .limit(5)
      .toArray();

    const comments = CommentsType.parse(maybeComments);

    return comments;
  } catch (error) {
    console.error(error);
    return [];
  }
};
