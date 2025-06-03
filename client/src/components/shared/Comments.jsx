import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { getPostComments } from "../../api/commentApi";
import { motion, AnimatePresence } from "framer-motion";
import MakeComment from "./MakeComment";

const Comments = ({ postId, visible }) => {
  const queryClient = useQueryClient();

  const {
    data: comments,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => getPostComments(postId),
  });

  const handleSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["comments", postId] });
  };

  if (isLoading) return null;
  if (isError) return <p className="text-red-500">Failed to load comments.</p>;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4 overflow-hidden"
        >
          <div className="bg-white p-4 rounded-lg shadow-md mb-4">
            <MakeComment postId={postId} onSuccess={handleSuccess} />
          </div>

          <div className="space-y-3">
            {comments.length === 0 ? (
              <p className="text-gray-600 italic">No comments on this post.</p>
            ) : (
              comments.map((comment) => (
                <div
                  key={comment.comment_id}
                  className="bg-teal-50 p-3 rounded-lg shadow-sm"
                >
                  <p className="text-teal-700 font-semibold">{comment.name}</p>
                  <p className="text-gray-800 text-sm">{comment.comment}</p>
                </div>
              ))
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Comments;
