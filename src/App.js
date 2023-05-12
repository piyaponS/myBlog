import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from "./Pages/SignupPage";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import ProHomePage from "./Pages/ProHomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/auth" element={<ProHomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
