import React, { useState } from "react";
import StudentWiseReport from "./StudentWiseReport";
// import TeacherWiseReport from "./TeacherWiseReport"; // Uncomment if needed

const CompleteReport = () => {
  const [visibleReport, setVisibleReport] = useState("");

  const toggleReport = (type) => {
    setVisibleReport((prev) => (prev === type ? "" : type));
  };

  return (
    <div className="min-h-screen h-full overflow-y-auto bg-white p-6">
      <h1 className="text-3xl font-bold text-[#0a3161] mb-2">Admin Login</h1>
      <h2 className="text-2xl font-semibold text-[#0a3161] mb-6">Complete Report</h2>

      <div className="space-y-6 text-[#0a3161]">
        {/* Student Wise */}
        <div>
          <div className="flex items-center gap-4">
            <span className="text-lg font-medium">Student wise</span>
            <button
              onClick={() => toggleReport("student")}
              className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Display
            </button>
            <button
              className="px-4 py-1 bg-gray-200 text-gray-600 rounded cursor-not-allowed"
              disabled
            >
              PDF
            </button>
          </div>

          {visibleReport === "student" && (
            <div className="mt-4 border border-gray-300 p-4 rounded">
              <StudentWiseReport />
            </div>
          )}
        </div>

        {/* Teacher Wise - optional */}
        {/* <div>...</div> */}
      </div>
    </div>
  );
};

export default CompleteReport;
