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
import Notifications from "../components/Notifications";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedButton, setSelectedButton] = useState("Feeds");
  const [selectedUserId, setSelectedUserId] = useState(null);

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
      case "Notifications":
        return <Notifications />
      default:
        return <Feeds />;
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-green-200 via-sky-200 to-green-100">
      <SideBar
        selectedButton={selectedButton}
        setSelectedButton={setSelectedButton}
        onLogout={handleLogout}
      />

      <div className="flex-1 p-2 overflow-y-auto h-screen text-darkBlue w-fit">
        {renderComponent()}
      </div>

      <div className="w-1/4 border-l border-blue-200 overflow-y-auto h-screen text-center bg-white/70 backdrop-blur-md text-darkBlue">
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
