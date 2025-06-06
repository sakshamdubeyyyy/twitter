import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import {
  getAllUserNotifications,
  markNotificationSeen,
} from "../api/notificationApi";
import NotificationCard from "./shared/NotificationCard";
import SeenNotificationsModal from "./DeletedNotificationsModal"; // ✅ Make sure this exists
import { Trash } from "lucide-react";

const Notifications = () => {
  const [showSeenModal, setShowSeenModal] = useState(false);
  const userId = JSON.parse(localStorage.getItem("user_id"));
  const queryClient = useQueryClient();

  const { data: notifications, isLoading } = useQuery({
    queryKey: ["allnotifications", userId],
    queryFn: () => getAllUserNotifications(userId),
  });

  const { mutate } = useMutation({
    mutationFn: markNotificationSeen,
    onError: (err) => {
      console.error("Failed to mark notification as seen:", err);
      queryClient.invalidateQueries(["notifications", userId]);
    },
  });

  useEffect(() => {
    if (notifications && notifications.length > 0) {
      notifications
        .filter((n) => !n.seen)
        .forEach((n) => mutate(n.notification_id));
    }
  }, [notifications, mutate]);

  if (isLoading) return <div>Loading notifications...</div>;

  return (
    <div className="max-w-xl mx-auto mt-6 relative">
      <h2 className="text-xl font-bold">Notifications</h2>
      {notifications && notifications.length > 0 ? (
        notifications.map((notification) => (
          <NotificationCard
            key={notification.notification_id}
            notification={notification}
          />
        ))
      ) : (
        <p>No new notifications</p>
      )}

      {showSeenModal && (
        <SeenNotificationsModal onClose={() => setShowSeenModal(false)} />
      )}
    </div>
  );
};

export default Notifications;
