import React from "react";

const Navbar = () => {
  return (
    <div className="w-full bg-[#0a3161] text-white h-16 flex items-center justify-between px-6 shadow-md">
      <h1 className="text-2xl font-bold">Admin Login</h1>
      <div className="flex items-center space-x-4">
        <span className="text-lg">Welcome, Admin</span>
        <button className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded-full text-sm font-medium">
          Log out
        </button>
      </div>
    </div>
  );
};

export default Navbar;
