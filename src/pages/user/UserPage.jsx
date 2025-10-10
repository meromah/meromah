import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Feeds from "./feeds/Feeds";
import CreateAction from "./feeds/CreateAction";
import ExploreItem from "./feeds/ExploreItem";
import UserSidebar from "../../components/UserSidebar";

const UserPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen grid grid-cols-12">
      {/* Left Sidebar */}
      <aside className="col-span-12 md:col-span-4 lg:col-span-3 border-r border-neutral-200 md:h-screen md:sticky md:top-0 overflow-y-scroll scrollbar-hide">
        <UserSidebar onNavigate={(path) => navigate(path)} />
      </aside>

      {/* Main Section */}
      <main className="col-span-12 md:col-span-8 lg:col-span-9">
        <Routes>
          <Route index element={<Navigate to="feeds" replace />} />
          <Route path="feeds" element={<Feeds />} />
          <Route path="create/:action" element={<CreateAction />} />
          <Route path="explore/:item" element={<ExploreItem />} />
          <Route path="*" element={<Navigate to="feeds" replace />} />
        </Routes>
      </main>
    </div>
  );
};

export default UserPage;
