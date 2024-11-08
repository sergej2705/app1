import { Comment } from "@/app/movies/comments";
import { FC } from "react";
import { CommentDetails } from "./CommentDetails";
import { clsx } from "clsx";

type CommentsOverviewProps = {
  comments: Comment[];
  className?: string;
};

export const CommentsOverview: FC<CommentsOverviewProps> = ({
  comments,
  className,
}) => {
  return (
    <div className={clsx("bg-white rounded-lg shadow-lg divide-y", className)}>
      {comments.map((comment) => (
        <CommentDetails comment={comment} />
      ))}
    </div>
  );
};
