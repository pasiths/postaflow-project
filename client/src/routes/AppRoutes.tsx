import SignInPage from "@/pages/auth/SignIn";
import SignUpPage from "@/pages/auth/SignUp";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route index element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        
      </Routes>
    </Router>
  );
};

export default AppRoutes;
