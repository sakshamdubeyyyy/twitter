import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../api/postApi";
import PostCard from "./shared/PostCard";
import MakePost from "./MakePost";

import { ArrowUp, ArrowDown } from "lucide-react";

const Feeds = () => {
  const [sortOrder, setSortOrder] = useState("desc");

  const {
    data: posts,
    isLoading,
    isError,
    error,
    refetch: refetchFeedPosts
  } = useQuery({
    queryKey: ["posts"],
    queryFn: getAllPosts,
  });
  
  const sortedPosts = useMemo(() => {
    if (!posts?.data) return [];

    return [...posts.data].sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      if (sortOrder === "asc") {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });
  }, [posts, sortOrder]);

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  if (isLoading)
    return <p className="text-center mt-10 text-teal-600">Loading...</p>;
  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">Error: {error.message}</p>
    );

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <MakePost compact refetchFeedPosts={refetchFeedPosts} post={posts} />

        <div className="z-10 py-2 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-black border-b border-teal-200 pb-2">
            Recent Posts
          </h2>
          <button
            onClick={toggleSortOrder}
            className="text-teal-900 font-semibold flex items-center space-x-1 border border-teal-300 rounded px-3 py-1 hover:bg-sky-100 cursor-pointer"
            aria-label="Toggle sort order"
          >
            <span>Sort by Date</span>
            {sortOrder === "asc" ? (
              <ArrowUp className="h-5 w-5" />
            ) : (
              <ArrowDown className="h-5 w-5" />
            )}
          </button>
        </div>

        <div className="space-y-4">
          {sortedPosts.map((post) => (
            <PostCard key={post.post_id} post={post} refetchFeedPosts={refetchFeedPosts} />
          ))}
        </div>
        <div className="text-center">
            <h2>You are all caught up!</h2>
        </div>
      </div>
    </div>
  );
};

export default Feeds;
