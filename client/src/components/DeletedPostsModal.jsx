import React from "react";
import { useQuery } from "@tanstack/react-query";
import PostCard from "./shared/PostCard";
import { getUsersDeletedPosts } from "../api/postApi";

const DeletedPostsModal = ({ onClose }) => {
  const userId = JSON.parse(localStorage.getItem("user_id"));

  const {
    data: post,
    isLoading,
    isError,
    error,
    refetch: refetchDeletedPosts,
  } = useQuery({
    queryKey: ["deletedPosts", userId],
    queryFn: () => getUsersDeletedPosts(userId),
  });

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-xs bg-opacity-40 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl relative max-h-[80vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-xl font-bold text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
        <h2 className="text-xl font-semibold mb-4">Deleted Posts</h2>

        {isLoading && <p>Loading...</p>}
        {isError && <p className="text-red-500">Error: {error.message}</p>}

        {!isLoading && !isError && (!post?.data || post.data.length === 0) && (
          <p className="text-gray-500">No deleted posts found.</p>
        )}

        {post?.data?.map((post) => (
          <PostCard
            key={post.post_id}
            post={post}
            showOnlyReuse
            refetchDeletedPosts={refetchDeletedPosts}
          />
        ))}
      </div>
    </div>
  );
};

export default DeletedPostsModal;
