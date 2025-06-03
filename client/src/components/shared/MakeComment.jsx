import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { makeNewComment } from "../../api/commentApi";

const MakeComment = ({ postId, onSuccess }) => {
  const [comment, setComment] = useState("");

  const { mutate, isLoading } = useMutation(makeNewComment, {
    onSuccess: (data) => {
      setComment("");
      alert("Comment added!");
      onSuccess && onSuccess();
    },
  });

  const handleComment = () => {
    if (!comment.trim()) return alert("Comment cannot be empty.");
    mutate({
      user_id: JSON.parse(localStorage.getItem("user_id")),
      post_id: postId,
      name: JSON.parse(localStorage.getItem("name")),
      comment,
    });
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="flex-grow border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
        placeholder="Write a comment..."
      />
      <button
        onClick={handleComment}
        disabled={isLoading}
        className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition disabled:opacity-50"
      >
        {isLoading ? "Posting..." : "Comment"}
      </button>
    </div>
  );
};

export default MakeComment;
