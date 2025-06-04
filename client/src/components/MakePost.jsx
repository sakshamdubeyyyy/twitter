import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { createPost, updatePost } from "../api/postApi";
import { toast } from "react-toastify";

const MakePost = ({
  compact = false,
  isEdit = false,
  editData = null,
  onClose,
  post
}) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    if (isEdit && editData) {
      setContent(editData.content);
    }
  }, [isEdit, editData]);

  const createMutation = useMutation(createPost, {
    onSuccess: () => {
      toast.success("Posted successfully!");
      setContent("");
      onClose?.();
    },
  });

  const updateMutation = useMutation((data) => updatePost(post.post_id, data), {
    onSuccess: () => {
      toast.success("Post updated successfully!");
      setContent("");
      onClose?.();
    },
  });

  const handleSubmit = () => {
    if (isEdit) {
      updateMutation.mutate({
        user_id: JSON.parse(localStorage.getItem("user_id")),
        name: JSON.parse(localStorage.getItem("name")),
        content: content,
      });
    } else {
      createMutation.mutate({
        user_id: JSON.parse(localStorage.getItem("user_id")),
        name: JSON.parse(localStorage.getItem("name")),
        content: content,
      });
    }
  };

  return (
    <div
      className={`w-full p-4 rounded-xl shadow-md transition-all duration-300 ${
        compact ? "bg-white" : "bg-gradient-to-br from-teal-100 to-green-100"
      }`}
    >
      {compact && (
        <h1 className="text-teal-800 text-xl font-bold">
          {isEdit ? "Edit Post" : "Make new Post"}
        </h1>
      )}
      <textarea
        className={`w-full ${
          compact ? "h-24" : "h-40"
        } p-3 border border-teal-300 rounded-lg resize-none text-gray-800 focus:ring-2 focus:ring-teal-400 outline-none placeholder:text-gray-400`}
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="mt-3 w-full cursor-pointer py-2 bg-teal-500 text-white font-medium rounded-lg hover:bg-teal-600 transition"
      >
        {isEdit ? "Update Post" : "Post"}
      </button>
    </div>
  );
};

export default MakePost;
