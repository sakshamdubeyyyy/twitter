import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserById, updateUser } from "../api/userApi";
import SettingsModal from "./SettingsModal";
import DeletedPostsModal from "./DeletedPostsModal";

const Settings = () => {
  const userId = JSON.parse(localStorage.getItem("user_id"));
  const queryClient = useQueryClient();
  const [showDeletedModal, setShowDeletedModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  const {
    data: userData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId,
  });

  const mutation = useMutation({
    mutationFn: (updatedFields) => updateUser(userId, updatedFields),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      queryClient.invalidateQueries(["user", userId]);
      setModalData(null);
    },
  });

  const handleUpdate = (field, value) => {
    mutation.mutate({ [field]: value });
  };

  if (isLoading) return <div>Loading user info...</div>;
  if (isError) return <div>Error loading user info: {error.message}</div>;

  const user = userData?.data;

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded shadow-md space-y-6">
      <h1 className="text-2xl font-semibold">Settings</h1>

      <div className="space-y-4">
        <SettingBar
          label="Change Name"
          value={user?.name}
          onClick={() => setModalData({ field: "name", value: user?.name })}
        />
        <SettingBar
          label="Change Email"
          value={user?.email}
          onClick={() => setModalData({ field: "email", value: user?.email })}
        />
        <SettingBar
          label="View Deleted Posts"
          value={null}
          onClick={() => setShowDeletedModal(true)}
        />
      </div>

      {modalData && (
        <SettingsModal
          field={modalData.field}
          currentValue={modalData.value}
          onClose={() => setModalData(null)}
          onSubmit={handleUpdate}
          isLoading={mutation.isLoading}
        />
      )}
      {showDeletedModal && (
        <DeletedPostsModal
          userId={userId}
          onClose={() => setShowDeletedModal(false)}
        />
      )}
    </div>
  );
};

const SettingBar = ({ label, value, onClick }) => (
  <div
    onClick={onClick}
    className="flex justify-between items-center bg-teal-100 px-4 py-3 rounded hover:bg-teal-200 cursor-pointer"
  >
    <span className="text-gray-700 font-medium">{label}</span>
    <span className="text-sm text-gray-600">{value || ">"}</span>
  </div>
);

export default Settings;
