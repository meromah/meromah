import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/main/LandingPage";
import UserPage from "./pages/user/UserPage";
import AdminPage from "./pages/admin/AdminPage";

const App = () => {
  return (
    <Routes>
      <Route path="/*" element={<LandingPage />} />
      <Route path="/user/*" element={<UserPage />} />
      <Route path="/admin/*" element={<AdminPage />} />
    </Routes>
  );
};

export default App;
