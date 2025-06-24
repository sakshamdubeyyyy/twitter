import React, { useState } from "react";
import Comments from "./Comments";
import ConfirmationModal from "./ConfirmationModal";
import { MessageSquare, Pencil, RotateCcw, Trash2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost, restorePost } from "../../api/postApi";
import MakePost from "../MakePost";
import { toast } from "react-toastify";
import Likes from "./Likes";

const PostCard = ({
  post,
  showOnlyReuse = false,
  refetchPosts,
  refetchDeletedPosts,
  refetchFeedPosts
}) => {
  const [showComments, setShowComments] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editPostData, setEditPostData] = useState(null);
  const queryClient = useQueryClient();

  const { mutate } = useMutation(deletePost, {
    onSuccess: () => {
      refetchPosts?.();
      refetchFeedPosts?.();
      toast.success("Post deleted");
    },
  });

  const { mutate: restore } = useMutation(restorePost, {
    onSuccess: () => {
      refetchDeletedPosts?.();
      queryClient.invalidateQueries(["deletedPosts", userId])
      toast.success("restored");
    },
  });

  const userId = localStorage.getItem("user_id");
  const isOwner = userId === String(post.user_id);

  const onDelete = () => {
    mutate(post.post_id);
  };

  const handleDeleteConfirm = () => {
    onDelete();
    setShowDeleteModal(false);
  };

  const openEdit = () => {
    setEditPostData(post);
    setEditMode(true);
  };

  const restoreUserPost = () => {
    restore(post.post_id);
  };

  return (
    <>
      <div className="bg-white border border-teal-200 rounded-2xl p-6 mb-6 hover:shadow-lg transition-shadow duration-300">
        <div className="text-xs text-teal-600 mb-2">
          {new Date(post.created_at).toLocaleString()}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-teal-700 font-bold text-lg">
              {post.name.charAt(0).toUpperCase()}
            </div>
            <h3 className="font-bold text-xl text-teal-800">{post.name}</h3>
          </div>

          {showOnlyReuse ? (
            <RotateCcw
              size={20}
              className="text-purple-500 hover:text-purple-700 cursor-pointer"
              title="Reuse this post"
              onClick={() => {
                restoreUserPost();
              }}
            />
          ) : (
            isOwner && (
              <div className="flex items-center gap-3">
                <Pencil
                  size={18}
                  className="text-blue-500 hover:text-blue-700 cursor-pointer"
                  onClick={openEdit}
                />
                <Trash2
                  size={18}
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                  onClick={() => setShowDeleteModal(true)}
                />
              </div>
            )
          )}
        </div>

        <p className="text-gray-700 mt-2 leading-relaxed">{post.content}</p>
        {post.photos && post.photos.length > 0 && (
          <div className="mt-4">
            {post.photos.map((photo, index) => (
              <img
                key={index}
                src={`http://localhost:3000${photo.url}`} 
                alt={`Post image ${index + 1}`}
                className="w-full max-h-[400px] object-cover rounded-lg border mt-2"
              />
            ))}
          </div>
        )}
        <div className="flex gap-4">
          <Likes post={post} userId={userId} refetchPosts={refetchPosts} />
          <button
            onClick={() => setShowComments((prev) => !prev)}
            className="mt-4 flex items-center gap-2 text-teal-600 hover:text-teal-800 transition-colors"
          >
            <MessageSquare size={20} />
            <span>{showComments ? "Hide Comments" : "Comments"}</span>
          </button>
        </div>
        <Comments
          postId={post.post_id}
          visible={showComments}
          postOwnerId={post.user_id}
        />
      </div>

      <ConfirmationModal
        visible={showDeleteModal}
        title="Delete Post"
        message="Are you sure you want to delete this post?"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setShowDeleteModal(false)}
      />

      {editMode && (
        <div className="fixed inset-0 bg-opacity-30 backdrop-blur-xs flex items-center justify-center z-50">
          <div className="w-full max-w-xl bg-white rounded-xl p-6 shadow-lg relative">
            <button
              className="absolute top-2 right-3 text-gray-600 cursor-pointer hover:text-gray-800 text-2xl"
              onClick={() => setEditMode(false)}
            >
              ×
            </button>
            <MakePost
              editData={editPostData}
              onClose={() => setEditMode(false)}
              isEdit={true}
              post={post}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PostCard;
