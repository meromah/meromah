import React from "react";
import { Routes, Route, Navigate, useNavigate, Outlet } from "react-router-dom";
import Feeds from "./feeds/Feeds";
import CreateAction from "./feeds/CreateAction";
import ExploreItem from "./feeds/ExploreItem";
import UserSidebar from "../../components/UserSidebar";
import Post from "./Post";
import UserProfile from "./UserProfile";
import BoardPage from "./BoardPage";
import EditProfile from "./EditProfile";
import { useGetMeQuery } from "../../services/userApi";
const UserPage = () => {
  const navigate = useNavigate();
  const {data, isLoading: isGetMeLoading} = useGetMeQuery();
  if(isGetMeLoading){
    return <div>Loading...</div>;
  }
  console.log(data.data);
  return (
    <div className="relative min-h-screen grid grid-cols-12">
      {/* Left Sidebar */}
      <aside className="col-span-12 md:col-span-4 lg:col-span-3 border-r border-neutral-200 md:h-screen md:sticky md:top-0 overflow-y-scroll scrollbar-hide">
        <UserSidebar onNavigate={(path) => navigate(path)} />
      </aside>

      {/* Main Section */}
      <main className="col-span-12 md:col-span-8 lg:col-span-9">
        <Outlet />
      </main>
    </div>
  );
};

export default UserPage;
