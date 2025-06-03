import React from "react";
import { getAllUsers } from "../api/userApi";
import { useQuery } from "@tanstack/react-query";
import UserCard from "./shared/UserCard";

const People = ({ onSelectUser }) => {
  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold text-teal-700 bg-gray-50 z-10 pb-2">
        People You May Know
      </h1>
      {users.data.map((user) => (
        <div
          key={user.user_id}
          onClick={() => onSelectUser(user.user_id)}
          className="cursor-pointer"
        >
          <UserCard user={user} />
        </div>
      ))}
    </div>
  );
};

export default People;
