import React, { useRef, useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import jsPDF from "jspdf";
import studentData from "../../data/studentData.json";
import html2canvas from "html2canvas";
import Select from "react-select";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ModuleRegistry } from "ag-grid-community";
import { ClientSideRowModelModule } from "ag-grid-community";
import { ValidationModule } from "ag-grid-community";

ModuleRegistry.registerModules([ClientSideRowModelModule, ValidationModule]);

const phaseMap = {
  "1st Phase": "1st Year",
  "2nd Phase": "2nd Year",
  "3rd Phase": "3rd Year",
};

const StudentDashboard = () => {
  const [selectedPhase, setSelectedPhase] = useState({
    label: "1st Phase",
    value: "1st Phase",
  });
  const [selectedMonth, setSelectedMonth] = useState({
    label: "January",
    value: "January",
  });
  const [searchClicked, setSearchClicked] = useState(false);
  const reportRef = useRef();

  const phase1Months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
    "January (Year 2)",
    "February (Year 2)",
    "March (Year 2)",
    "April (Year 2)",
    "May (Year 2)",
    "June (Year 2)",
  ];

  const phaseOptions = Object.keys(phaseMap).map((key) => ({
    label: key,
    value: key,
  }));
  const monthOptions = phase1Months.map((month) => ({
    label: month,
    value: month,
  }));

  const selectedYear = phaseMap[selectedPhase.value];
  const monthData =
    searchClicked && selectedYear
      ? studentData.marks[selectedYear]?.[selectedMonth.value] || []
      : [];

  const feedback =
    searchClicked && selectedYear
      ? studentData.feedback[selectedYear]?.[selectedMonth.value] ||
        "No feedback available"
      : "";

  const attendance =
    searchClicked && selectedYear
      ? studentData.attendance[selectedYear]?.[selectedMonth.value]
      : null;

  const total = monthData.reduce((acc, curr) => acc + curr.marks, 0);
  const percentage = monthData.length > 0 ? total / monthData.length : 0;

  const handleSearch = () => {
    setSearchClicked(true);
  };

  const handlePrint = () => window.print();

  const exportToPDF = () => {
    html2canvas(reportRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("student-report.pdf");
    });
  };

  const columnDefs = useMemo(
    () => [
      {
        headerName: "Subject",
        field: "subject",
        sortable: true,
        filter: true,
        flex: 1,
      },
      {
        headerName: "Marks",
        field: "marks",
        sortable: true,
        filter: true,
        flex: 1,
      },
    ],
    []
  );

  return (
    <div
      className="p-6 max-w-6xl mx-auto bg-gray-50 min-h-screen"
      ref={reportRef}
    >
      <h1 className="text-3xl font-bold text-blue-800 border-b-2 pb-2 mb-6">
        🎓 Student Dashboard
      </h1>

      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 bg-white p-4 rounded shadow-md">
        <div>
          <h2 className="text-xl font-semibold">👤 {studentData.name}</h2>
          <p className="text-gray-600">
            Roll No: <strong>{studentData.rollNo}</strong>
          </p>
        </div>
        <img
          src={studentData.imageUrl}
          alt="Student"
          className="w-24 h-24 rounded-full shadow-md border"
        />
      </div>

      {/* External Dropdowns */}
      <div className="mb-4 flex flex-col sm:flex-row gap-4 items-center">
        <Select
          options={phaseOptions}
          value={selectedPhase}
          onChange={(option) => {
            setSelectedPhase(option);
            setSearchClicked(false); // reset search state when phase changes
          }}
          className="w-60"
        />

        <Select
          options={monthOptions}
          value={selectedMonth}
          onChange={(option) => {
            setSelectedMonth(option);
            setSearchClicked(false); // reset search state when month changes
          }}
          className="w-60"
        />

        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          🔍 Search
        </button>
      </div>

      {searchClicked && (
        <>
          {/* AG Grid Table */}
          <div
            className="ag-theme-alpine mb-6"
            style={{ height: 300, width: "100%" }}
          >
            <AgGridReact
              theme="legacy"
              rowData={monthData}
              columnDefs={columnDefs}
            />
          </div>

          {/* Performance Summary */}
          <div className="mb-4 p-4 bg-white rounded shadow-md">
            <h3 className="text-lg font-semibold mb-2 text-green-700">
              📊 Performance Summary
            </h3>
            <p>
              Total Marks: <strong>{total}</strong>
            </p>
            <p>
              Average Percentage: <strong>{percentage.toFixed(2)}%</strong>
            </p>
          </div>

          {/* Feedback */}
          <div className="mb-6 p-4 bg-white rounded shadow-md">
            <h3 className="text-lg font-semibold mb-2 text-purple-700">
              🗨️ Teacher Feedback
            </h3>
            <p>{feedback}</p>
          </div>

          {/* Attendance */}
          <div className="mb-6 p-4 bg-white rounded shadow-md">
            <h3 className="text-lg font-semibold mb-2 text-orange-700">
              📅 Attendance Summary
            </h3>
            {attendance ? (
              <>
                <p>
                  Present Days: <strong>{attendance.present}</strong>
                </p>
                <p>
                  Total Days: <strong>{attendance.total}</strong>
                </p>
                <p>
                  Attendance Percentage:{" "}
                  <strong>
                    {((attendance.present / attendance.total) * 100).toFixed(2)}
                    %
                  </strong>
                </p>
                <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                  <div
                    className="bg-orange-500 h-4 rounded-full"
                    style={{
                      width: `${
                        (attendance.present / attendance.total) * 100
                      }%`,
                    }}
                  ></div>
                </div>
              </>
            ) : (
              <p>No attendance data available for this month.</p>
            )}
          </div>

          {/* Chart */}
          <div className="bg-white p-4 rounded shadow-md mb-6">
            <h3 className="text-lg font-semibold mb-4 text-indigo-700">
              📈 Marks Distribution Chart
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="marks" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={handlePrint}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              🖨️ Print Report
            </button>
            <button
              onClick={exportToPDF}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              📄 Export to PDF
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default StudentDashboard;
