import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const navLinkStyle = ({ isActive }) =>
    `block w-full text-left px-6 py-2 rounded-md text-white text-lg font-medium hover:bg-blue-800 transition ${
      isActive ? "bg-blue-700 font-bold" : ""
    }`;

  return (
    <div className="w-64 min-h-screen bg-[#0a3161] text-white flex flex-col items-center py-6">
      <img
        src="data:image/png;base64,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"
        alt="Profile"
        className="w-24 h-24 rounded-full object-cover mb-4"
      />
      <h2 className="text-xl font-semibold mb-8">ADMIN</h2>

      <div className="space-y-3 w-full px-4">
        <NavLink to="/admin/complete-report" className={navLinkStyle}>
          📊 Complete Report
        </NavLink>

        <NavLink to="/admin/teacher-wise" className={navLinkStyle}>
          👨‍🏫 Teacher Wise
        </NavLink>

        <NavLink to="/admin/student-wise" className={navLinkStyle}>
          👨‍🎓 Student Wise
        </NavLink>
        
      </div>
    </div>
  );
};

export default Sidebar;
