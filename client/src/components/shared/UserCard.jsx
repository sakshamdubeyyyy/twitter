import React from "react";

const UserCard = ({ user }) => {
  return (
    <div className="bg-teal-50 border cursor-pointer border-teal-200 rounded-2xl shadow-md p-6 mb-6 transition-transform hover:scale-[1.02]">
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-teal-700 font-bold text-lg">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h2 className="text-xl font-bold text-teal-800">{user.name}</h2>
          <p className="text-sm text-teal-600">📧 {user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
