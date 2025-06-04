import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../api/authApi";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../app/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import Feeds from "../components/Feeds";
import UserProfile from "../components/UserProfile";
import MakePost from "../components/MakePost";
import Settings from "../components/Settings";
import People from "../components/People";
import { toast } from "react-toastify";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedButton, setSelectedButton] = useState("Feeds");
  const [selectedUserId, setSelectedUserId] = useState(null); // null means no profile selected yet

  const { mutate } = useMutation(logoutUser, {
    onSuccess: () => {
      dispatch(logout());
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      localStorage.removeItem("user_id");
      toast.success("Logged out successfully!");
      navigate("/");
    },
  });

  const handleLogout = () => {
    mutate();
  };

  const renderComponent = () => {
    switch (selectedButton) {
      case "Feeds":
        return <Feeds />;
      case "Your Profile":
        return (
          <UserProfile userId={parseInt(localStorage.getItem("user_id"))} />
        );
      case "Make new Post":
        return <MakePost />;
      case "Settings":
        return <Settings />;
      case "UserProfile":
        return <UserProfile userId={selectedUserId} />;
      default:
        return <Feeds />;
    }
  };

  return (
    <div className="flex h-screen">
      <SideBar
        selectedButton={selectedButton}
        setSelectedButton={setSelectedButton}
        onLogout={handleLogout}
      />

      <div className="flex-1 p-6 bg-gray-50 overflow-y-auto h-screen">
        {renderComponent()}
      </div>

      <div className="w-1/4 p-6 bg-gray-50 border border-l-gray-200 border-t-0 overflow-y-auto h-screen text-center">
        <People
          onSelectUser={(id) => {
            setSelectedUserId(id);
            setSelectedButton("UserProfile");
          }}
        />
      </div>
    </div>
  );
};

export default Home;
