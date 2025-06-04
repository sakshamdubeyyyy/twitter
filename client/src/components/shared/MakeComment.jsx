import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { makeNewComment, updateComment } from "../../api/commentApi";
import { toast } from "react-toastify";

const MakeComment = ({ postId, onSuccess, editData, cancelEdit }) => {
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (editData) {
      setComment(editData.comment); 
    }
  }, [editData]);

  const { mutate: createComment, isLoading: isCreating } = useMutation(
    makeNewComment,
    {
      onSuccess: () => {
        setComment("");
        toast.success("Comment added successfully!");
        onSuccess && onSuccess();
      },
    }
  );

  const { mutate: updateExistingComment, isLoading: isUpdating } = useMutation(
    updateComment,
    {
      onSuccess: () => {
        setComment("");
        toast.success("Comment updated successfully!");
        onSuccess && onSuccess();
      },
    }
  );

  const handleSubmit = () => {
    if (!comment.trim()) return toast.error("Comment cannot be empty.");

    const payload = {
      user_id: JSON.parse(localStorage.getItem("user_id")),
      post_id: postId,
      name: JSON.parse(localStorage.getItem("name")),
      comment,
    };

    if (editData) {
      updateExistingComment({ ...payload, comment_id: editData.comment_id });
    } else {
      createComment(payload);
    }
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
      {editData && (
        <button
          onClick={() => {
            setComment("");
            cancelEdit();
          }}
          className="text-gray-500 text-sm"
        >
          Cancel
        </button>
      )}
      <button
        onClick={handleSubmit}
        disabled={isCreating || isUpdating}
        className="bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition disabled:opacity-50"
      >
        {isCreating || isUpdating
          ? "Saving..."
          : editData
          ? "Update"
          : "Comment"}
      </button>
    </div>
  );
};

export default MakeComment;
