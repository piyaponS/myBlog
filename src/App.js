import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from "./Pages/SignupPage";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import AuthPage from "./Pages/AuthPage";
import ThankPage from "./Pages/ThankPage";
import ProfilePage from "./Pages/ProfilePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/auth/profile/:userId" element={<ProfilePage />} />
        <Route path="/thankyou" element={<ThankPage />} />
      </Routes>
    </Router>
  );
}

export default App;
