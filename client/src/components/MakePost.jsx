import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { createPost, updatePost } from "../api/postApi";
import { toast } from "react-toastify";
import { Paperclip } from "lucide-react"; // or any other icon library

const MakePost = ({
  compact = false,
  isEdit = false,
  editData = null,
  onClose,
  post,
  refetchFeedPosts,
}) => {
  const [content, setContent] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const queryClient = useQueryClient();
  const userId = JSON.parse(localStorage.getItem("user_id"))

  useEffect(() => {
    if (isEdit && editData) {
      setContent(editData.content);
    }
  }, [isEdit, editData]);

  const createMutation = useMutation(createPost, {
    onSuccess: () => {
      refetchFeedPosts?.();
      toast.success("Posted successfully!");
      setContent("");
      setSelectedFile(null);
      onClose?.();
    },
    onError:(error)=> {
      toast.error(error.response.data.error)
    }
  });

  const updateMutation = useMutation((data) => updatePost(post.post_id, data), {
    onSuccess: () => {
      refetchFeedPosts?.();
      queryClient.invalidateQueries(["posts"]);
      queryClient.invalidateQueries(["userPosts", userId]);
      toast.success("Post updated successfully!");
      setContent("");
      onClose?.();
    },
    onError: (error) => {
      toast.error(error.response.data.error);
    }
  });

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("user_id", JSON.parse(localStorage.getItem("user_id")));
    formData.append("name", JSON.parse(localStorage.getItem("name")));
    formData.append("content", content);
    if (selectedFile) {
      formData.append("photo", selectedFile);
    }

    if (isEdit) {
      updateMutation.mutate({
        user_id: JSON.parse(localStorage.getItem("user_id")),
        name: JSON.parse(localStorage.getItem("name")),
        content: content,
      });
    } else {
      createMutation.mutate(formData);
    }
  };

  return (
    <div
      className={`w-full p-4 rounded-xl shadow-md transition-all duration-300 ${
        compact ? "bg-white" : "bg-gradient-to-br from-teal-100 to-green-100"
      } text-black`}
    >
      {compact && (
        <h1 className="text-black text-xl font-bold">
          {isEdit ? "Edit Post" : "Make new Post"}
        </h1>
      )}
      <textarea
        className={`w-full ${
          compact ? "h-24" : "h-40"
        } p-3 border border-gray-400 rounded-lg resize-none text-black focus:ring-2 focus:ring-blue-400 outline-none placeholder:text-gray-500`}
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="flex items-center justify-between mt-2">
        <label className="cursor-pointer flex items-center space-x-1 text-blue-700 hover:underline">
          <Paperclip size={18} />
          <span>Attach Photo</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => setSelectedFile(e.target.files[0])}
          />
        </label>
        {selectedFile && (
          <span className="text-sm text-gray-700">{selectedFile.name}</span>
        )}
      </div>
      <button
        onClick={handleSubmit}
        className="mt-3 w-full cursor-pointer py-2 bg-blue-800 text-white font-medium rounded-lg hover:bg-blue-900 transition"
      >
        {isEdit ? "Update Post" : "Post"}
      </button>
    </div>
  );
};

export default MakePost;
