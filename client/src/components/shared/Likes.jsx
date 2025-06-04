import React, { useMemo } from "react";
import { Heart } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addLike, removeLike } from "../../api/likeApi";

const Likes = ({ post, userId, refetchPosts }) => {
  const queryClient = useQueryClient();
  const { post_id, likes = [] } = post;

  const isLiked = likes.some((like) => like.user_id === Number(userId));
  const likeCount = likes.length;

  const updateCache = (key, updater) => {
    queryClient.setQueryData(key, (old) => {
      if (!old?.data) return old;
      return {
        ...old,
        data: old.data.map((p) =>
          p.post_id === post_id ? updater(p) : p
        ),
      };
    });
  };

  const { mutate: likeMutate } = useMutation(addLike, {
    onMutate: async (likeData) => {
      await Promise.all([
        queryClient.cancelQueries(["posts"]),
        queryClient.cancelQueries(["userPosts", userId]),
      ]);

      const previousPosts = queryClient.getQueryData(["posts"]);
      const previousUserPosts = queryClient.getQueryData(["userPosts", userId]);

      const addLikeToPost = (p) => ({
        ...p,
        likes: [...p.likes, { user_id: likeData.user_id }],
      });

      updateCache(["posts"], addLikeToPost);
      updateCache(["userPosts", userId], addLikeToPost);

      return { previousPosts, previousUserPosts };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(["posts"], context.previousPosts);
      queryClient.setQueryData(["userPosts", userId], context.previousUserPosts);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
      queryClient.invalidateQueries(["userPosts", userId]);
      refetchPosts?.();
    },
  });

  const { mutate: dislikeMutate } = useMutation(removeLike, {
    onMutate: async (dislikeData) => {
      await Promise.all([
        queryClient.cancelQueries(["posts"]),
        queryClient.cancelQueries(["userPosts", userId]),
      ]);

      const previousPosts = queryClient.getQueryData(["posts"]);
      const previousUserPosts = queryClient.getQueryData(["userPosts", userId]);

      const removeLikeFromPost = (p) => ({
        ...p,
        likes: p.likes.filter(
          (like) => like.user_id !== dislikeData.user_id
        ),
      });

      updateCache(["posts"], removeLikeFromPost);
      updateCache(["userPosts", userId], removeLikeFromPost);

      return { previousPosts, previousUserPosts };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(["posts"], context.previousPosts);
      queryClient.setQueryData(["userPosts", userId], context.previousUserPosts);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
      queryClient.invalidateQueries(["userPosts", userId]);
      refetchPosts?.();
    },
  });

  const handleLikeToggle = () => {
    if (isLiked) {
      dislikeMutate({ user_id: userId, post_id: post.post_id });
    } else {
      likeMutate({ user_id: userId, post_id: post.post_id });
    }
  };

  return (
    <div
      className="flex items-center gap-1 cursor-pointer mt-4"
      onClick={handleLikeToggle}
    >
      <Heart
        size={20}
        className={isLiked ? "text-red-500 fill-red-500" : "text-gray-500"}
      />
      <span className="text-sm text-gray-600">{likeCount}</span>
    </div>
  );
};

export default Likes;
