import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { getPostComments, deleteComment } from "../../api/commentApi";
import { motion, AnimatePresence } from "framer-motion";
import MakeComment from "./MakeComment";
import ConfirmationModal from "./ConfirmationModal";
import { Pencil, Trash2 } from "lucide-react";

const Comments = ({ postId, visible, postOwnerId }) => {
  const currentUserId = JSON.parse(localStorage.getItem("user_id"));
  const queryClient = useQueryClient();
  const [editCommentData, setEditCommentData] = useState(null);
  const [commentToDelete, setCommentToDelete] = useState(null);

  const {
    data: comments,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => getPostComments(postId),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
  });

  const handleDelete = () => {
    if (commentToDelete) {
      deleteMutation.mutate(commentToDelete.comment_id);
      setCommentToDelete(null);
    }
  };

  const handleSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    setEditCommentData(null);
  };

  if (isLoading) return null;
  if (isError) return <p className="text-red-500">Failed to load comments.</p>;

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 overflow-hidden"
          >
            <div className="bg-white p-4 rounded-lg mb-4">
              <MakeComment
                postId={postId}
                onSuccess={handleSuccess}
                editData={editCommentData}
                cancelEdit={() => setEditCommentData(null)}
              />
            </div>

            <div className="space-y-3">
              {comments.length === 0 ? (
                <p className="text-gray-600 italic">
                  No comments on this post.
                </p>
              ) : (
                comments.map((comment) => {
                  const isOwnerOrAuthor =
                    comment.user_id === currentUserId ||
                    postOwnerId === currentUserId;
                  return (
                    <div
                      key={comment.comment_id}
                      className="border-b border-b-gray-200 p-3 flex justify-between items-start"
                    >
                      <div className="flex gap-2">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-teal-700 font-bold text-lg">
                          {comment.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-teal-700 font-semibold">
                            {comment.name}
                          </p>
                          <p className="text-gray-800 text-sm">
                            {comment.comment}
                          </p>
                        </div>
                      </div>
                      {isOwnerOrAuthor && (
                        <div className="flex space-x-2 mt-1">
                          <Pencil
                            className="w-4 h-4 text-teal-600 cursor-pointer"
                            onClick={() => setEditCommentData(comment)}
                            title="Edit Comment"
                          />
                          <Trash2
                            className="w-4 h-4 text-red-500 cursor-pointer"
                            onClick={() => setCommentToDelete(comment)}
                            title="Delete Comment"
                          />
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ConfirmationModal
        visible={!!commentToDelete}
        title="Delete Comment"
        message="Are you sure you want to delete this comment? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setCommentToDelete(null)}
      />
    </>
  );
};

export default Comments;
