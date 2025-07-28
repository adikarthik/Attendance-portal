import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/Common/LoginPage";
import StudentDashboard from "./components/Student/StudentDashboard";
import TeacherDashboard from "./components/Teacher/TeacherDashboard";
import AdminDashboard from "./components/Admin/AdminDashboard";
import StudentWiseReport from "./components/Admin/StudentWiseReport";
import CompleteReport from "./components/Admin/CompleteReport";
import Sidebar from "./Sidebar/Sidebar";
import Navbar from "./Navbar/Navbar";

const App = () => {
  // Common layout wrapper for admin routes
  const withAdminLayout = (Component) => (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-4">
          <Component />
        </div>
      </div>
    </div>
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="/admin" element={withAdminLayout(AdminDashboard)} />
        <Route path="/admin/student-wise" element={withAdminLayout(StudentWiseReport)} />
        <Route path="/admin/complete-report" element={withAdminLayout(CompleteReport)} />
      </Routes>
    </Router>
  );
};

export default App;
