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

const CommentCount = z.object({
  _id: z.instanceof(ObjectId),
  count: z.number(),
});

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

export const getCommentCounts = async (): Promise<
  Partial<Record<string, number>>
> => {
  const mongoClient = await client.connect();

  try {
    const db = mongoClient.db("sample_mflix");

    const maybeCommentsByMovie = await db
      .collection("comments")
      .aggregate([
        {
          $group: { _id: "$movie_id", count: { $sum: 1 } },
        },
      ])
      .toArray();

    const commentsByMovie = CommentCount.array().parse(maybeCommentsByMovie);

    const result = commentsByMovie
      .map(
        (commentCount): Record<string, number> => ({
          [commentCount._id.toString()]: commentCount.count,
        })
      )
      .reduce((prev, curr) => ({
        ...prev,
        ...curr,
      }));

    // alternativ
    /*
    const result = Object.fromEntries(commentsByMovie
      .map(
        (commentCount) =>
          [commentCount._id.toString(), commentCount.count] as const
      ));
    */

    return result;
  } catch (error) {
    console.error(error);
    return {};
  }
};
