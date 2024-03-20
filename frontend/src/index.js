import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import LandingPage from "./LandingPage";
import SignUp from "./SignUp";
import LoginPage from "./LoginPage";
import ResetPassword from "./ResetPassword";
import reportWebVitals from "./reportWebVitals";
import TaskPage from "./TaskPage";
import ViewTaskPage from "./ViewTaskPage";
import { AuthProvider } from "./AuthContext";

export default function RouteApp() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/forgot" element={<ResetPassword />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/addtask" element={<TaskPage />} />
          <Route path="/viewtask" element={<ViewTaskPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouteApp />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
