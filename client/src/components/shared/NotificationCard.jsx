import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getUserById } from "../../api/userApi";
import { getPostById } from "../../api/postApi";
import { deleteNotification } from "../../api/notificationApi";
import { MessageSquare, Heart, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NotificationCard = ({ notification }) => {
  const [isDeleted, setIsDeleted] = useState(false);

  const { data: senderResponse, isLoading: loadingSender } = useQuery({
    queryKey: ["user", notification.sender_id],
    queryFn: () => getUserById(notification.sender_id),
  });

  const { data: postResponse, isLoading: loadingPost } = useQuery({
    queryKey: ["post", notification.post_id],
    queryFn: () => getPostById(notification.post_id),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNotification,
    onSuccess: () => setIsDeleted(true),
    onError: (err) => console.error("Delete failed", err),
  });

  const handleDelete = () => {
    deleteMutation.mutate(notification.notification_id);
  };

  const sender = senderResponse?.data;
  const post = postResponse?.data;

  if (loadingSender || loadingPost)
    return <div className="text-sm text-gray-500">Loading...</div>;

  return (
    <AnimatePresence>
      {!isDeleted && (
        <motion.div
          key={notification.notification_id}
          initial={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -200, backgroundColor: "#fee2e2" }} // red-100 background fade on delete
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="flex gap-4 bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 mb-2 relative"
        >
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              {notification.type === "like" ? (
                <Heart className="w-4 h-4 text-red-500" />
              ) : (
                <MessageSquare className="w-4 h-4 text-blue-500" />
              )}
              <p className="text-sm text-gray-800">
                <strong className="text-blue-600">{sender?.name}</strong>{" "}
                {notification.type === "like" ? "liked" : "commented on"} your
                post
              </p>
            </div>

            <p className="text-xs text-gray-600 line-clamp-2">
              {post?.content?.slice(0, 120)}
              {post?.content?.length > 120 && "..."}
            </p>

            <p className="text-[11px] text-gray-400 mt-2">
              {new Date(notification.created_at).toLocaleString()}
            </p>
          </div>

          <button
            onClick={handleDelete}
            className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition-colors cursor-pointer"
            title="Delete Notification"
          >
            <Trash2 size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationCard;
