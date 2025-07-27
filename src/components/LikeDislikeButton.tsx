import { useState } from "react";
import { ThumbsDown, ThumbsUp } from "lucide-react";

export function LikeDislikeButton() {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  return (
    <>
      {!disliked && (
        <button
          className="btn btn-ghost btn-xs rounded-md hover:bg-base-content/12"
          onClick={() => setLiked((prev) => !prev)}
        >
          <ThumbsUp size={14} fill={liked ? "currentColor" : "none"} />
        </button>
      )}
      {!liked && (
        <button
          className="btn btn-ghost btn-xs rounded-md hover:bg-base-content/12"
          onClick={() => setDisliked((prev) => !prev)}
        >
          <ThumbsDown size={14} fill={disliked ? "currentColor" : "none"} />
        </button>
      )}
    </>
  );
}
