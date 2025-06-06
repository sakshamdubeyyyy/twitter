import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../api/userApi";
import PostCard from "./shared/PostCard";
import { getUserPost } from "../api/postApi";

const UserProfile = ({ userId }) => {
  const {
    data: userData,
    isLoading: isUserLoading,
    isError: isUserError,
    error: userError,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId,
  });

  const {
    data: postsData,
    isLoading: isPostsLoading,
    isError: isPostsError,
    error: postsError,
  } = useQuery({
    queryKey: ["userPosts", userId],
    queryFn: () => getUserPost(userId),
    enabled: !!userId,
  });

  const {refetch: refetchPosts} = useQuery({
    queryKey: ["userPosts", userId],
    queryFn: () => getUserPost(userId),
    enabled: !!userId,
  })

  if (isUserLoading)
    return <p className="text-teal-600 font-medium">Loading profile...</p>;
  if (isUserError)
    return <p className="text-red-500 font-semibold">Error: {userError.message}</p>;

  const user = userData?.data;
  const userInitial = user.name?.charAt(0)?.toUpperCase() || "?";

  return (
    <div className="max-w-2xl mx-auto mt-10 space-y-8">
      <div className="bg-white shadow-xl rounded-2xl p-6 border border-green-100 text-gray-700">
        <div className="flex justify-center mb-6">
          <div className="h-20 w-20 rounded-full bg-teal-500 text-white flex items-center justify-center text-3xl font-bold shadow-lg">
            {userInitial}
          </div>
        </div>
        <div className="space-y-4">
          <Field label="Name" value={user.name} />
          <Field label="Email" value={user.email} />
          <Field label="Joined us since" value={formatDate(user.created_at)} />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-teal-700 mb-4">Posts by {user.name} - {postsData.data.length} Posts</h2>
        {isPostsLoading && <p className="text-teal-600">Loading posts...</p>}
        {isPostsError && <p className="text-red-500">Error: {postsError.message}</p>}
        {!isPostsLoading && postsData?.length === 0 && (
          <p className="text-gray-500">No posts yet.</p>
        )}
        {postsData?.data?.map((post) => (
          <PostCard key={post.post_id} post={post} refetchPosts={refetchPosts} />
        ))}
      </div>
    </div>
  );
};

const Field = ({ label, value }) => (
  <div className="flex justify-between bg-green-50 p-3 rounded-lg shadow-sm">
    <span className="font-medium text-teal-800">{label}</span>
    <span className="text-right text-green-700">{value}</span>
  </div>
);

const formatDate = (isoString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(isoString).toLocaleDateString(undefined, options);
};

export default UserProfile;
