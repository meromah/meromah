import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/main/LandingPage";
import UserPage from "./pages/user/UserPage";
import AdminPage from "./pages/admin/AdminPage";
import HomePage from "./pages/main/HomePage";
import AboutUs from "./pages/main/AboutUs";
import Explore from "./pages/main/Explore";
import Libraries from "./pages/main/Libraries";
import Quizzes from "./pages/main/Quizzes";
import Boards from "./pages/main/Boards";
import Contact from "./pages/main/Contact";
import Login from "./pages/main/Login";
import Register from "./pages/main/Register";
import UserProfile from "./pages/user/UserProfile";
import EditProfile from "./pages/user/EditProfile";
import Feeds from "./pages/user/Feeds";
import Post from "./pages/user/Post";
import CreateAction from "./pages/user/CreateAction";
import ExploreItem from "./pages/user/components/ExploreItem";
import BoardPage from "./pages/user/BoardPage";
import MyProfile from "./pages/user/MyProfile";

const App = () => {
  return (
    <Routes>
      <Route element={<LandingPage />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/explore/libraries" element={<Libraries />} />
        <Route path="/explore/quizzes" element={<Quizzes />} />
        <Route path="/explore/boards" element={<Boards />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<UserPage />}>
        <Route path="profile" element={<MyProfile />} />
        <Route path="profile/edit" element={<EditProfile />} />
        <Route path="user/:username" element={<UserProfile />} />
        <Route path="home" element={<Feeds />} />
        <Route path="board/:board/post/:post" element={<Post />} />
        <Route path="create/:action" element={<CreateAction />} />
        <Route path="explore/:item" element={<ExploreItem />} />
        <Route path="board/:board" element={<BoardPage />} />
      </Route>
      <Route path="/admin/*" element={<AdminPage />} />
    </Routes>
  );
};

export default App;
