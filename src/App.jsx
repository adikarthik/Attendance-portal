import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import LoginPage from "./components/Common/LoginPage";
import StudentDashboard from "./components/Student/StudentDashboard";
import TeacherDashboard from "./components/Teacher/TeacherDashboard";
import AdminDashboard from "./components/Admin/AdminDashboard";

const App = () => {
  return (
    <Router>
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;