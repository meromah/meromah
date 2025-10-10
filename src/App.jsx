import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/main/LandingPage";
import UserPage from "./pages/user/UserPage";
import AdminPage from "./pages/admin/AdminPage";

const App = () => {
  return (
    <div>
      <LandingPage />
      <UserPage />
      <AdminPage /> 
    </div>
  );
};

export default App;
