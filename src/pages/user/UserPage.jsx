import React, { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import UserSidebar from "../../components/UserSidebar";
import { useGetMeQuery } from "../../services/userApi";
import { useDispatch } from "react-redux";
import {
  setProfileData,
  setProfileError,
  setProfileLoading,
} from "../../app/myProfileSlice";

const UserPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetMeQuery();

  // When query state changes, update Redux slice
  useEffect(() => {
    dispatch(setProfileLoading(isLoading));
    if (data) {
      dispatch(setProfileData(data.data));
    }

    if (error) {
      dispatch(setProfileError(error));
    }
  }, [isLoading, data, error, dispatch]);
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
