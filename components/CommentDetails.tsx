"use client";

import { Comment } from "@/app/movies/comments";
import { DateTime } from "luxon";
import { FC } from "react";

type CommentDetailsProps = {
  comment: Comment;
};

export const CommentDetails: FC<CommentDetailsProps> = ({ comment }) => {
  return (
    <div className="p-4 flex flex-col gap-2">
      <div>
        <a href={`mailto:${comment.email}`} className="font-medium">
          {comment.name}
        </a>{" "}
        <span className="text-gray-500 text-sm">
          am{" "}
          {DateTime.fromJSDate(comment.date).toLocaleString(
            DateTime.DATETIME_MED,
            { locale: "de-de" }
          )}
        </span>
      </div>
      <div>{comment.text}</div>
    </div>
  );
};
