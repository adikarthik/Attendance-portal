// import React from "react";

// const studentData = {
//   name: "John Doe",
//   rollNo: "S101",
//   imageUrl: "https://via.placeholder.com/100",
//   marks: {
//     Aug: [
//       { subject: "X", marks: 96 },
//       { subject: "Y", marks: 70 },
//       { subject: "Z", marks: 80 },
//       { subject: "A", marks: 70 },
//       { subject: "B", marks: 60 },
//     ],
//   },
//   totalSummary: [
//     { subject: "X", percentage: 70 },
//     { subject: "Y", percentage: 60 },
//     { subject: "Z", percentage: 50 },
//   ],
// };

// const StudentDashboard = () => {
//   return (
//     <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md space-y-6">
//       <h1 className="text-2xl font-bold border-b pb-2">Student Login Page</h1>

//       <div className="flex items-center justify-between">
//         <div>
//           <p>
//             <strong>Name of the Student:</strong> {studentData.name}
//           </p>
//           <p>
//             <strong>Roll No:</strong> {studentData.rollNo}
//           </p>
//         </div>
//         <img
//           src={studentData.imageUrl}
//           alt="Student"
//           className="w-24 h-24 rounded-full"
//         />
//       </div>

//       <div>
//         <h2 className="text-lg font-semibold mt-4">Month-wise Subject Marks</h2>
//         <table className="w-full mt-2 border">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border px-4 py-2">Month</th>
//               <th className="border px-4 py-2">Subject</th>
//               <th className="border px-4 py-2">Marks</th>
//             </tr>
//           </thead>
//           <tbody>
//             {Object.entries(studentData.marks).map(([month, subjects]) =>
//               subjects.map((subject, index) => (
//                 <tr key={`${month}-${subject.subject}`}>
//                   {index === 0 && (
//                     <td
//                       rowSpan={subjects.length}
//                       className="border px-4 py-2 font-bold"
//                     >
//                       {month}
//                     </td>
//                   )}
//                   <td className="border px-4 py-2">{subject.subject}</td>
//                   <td className="border px-4 py-2">{subject.marks}</td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       <div>
//         <h2 className="text-lg font-semibold mt-6 underline">Total Summary</h2>
//         <table className="w-full mt-2 border">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border px-4 py-2">Subject</th>
//               <th className="border px-4 py-2">Total %</th>
//             </tr>
//           </thead>
//           <tbody>
//             {studentData.totalSummary.map((item, idx) => (
//               <tr key={idx}>
//                 <td className="border px-4 py-2">{item.subject}</td>
//                 <td className="border px-4 py-2">{item.percentage}%</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default StudentDashboard;

// import React, { useRef, useState } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   ResponsiveContainer,
// } from "recharts";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";

// const studentData = {
//   name: "Dark Knight",
//   rollNo: "S101",
//   imageUrl: "https://via.placeholder.com/100",
//   marks: {
//     "1st Year": {
//       August: [
//         { subject: "X", marks: 96 },
//         { subject: "Y", marks: 70 },
//         { subject: "Z", marks: 80 },
//       ],
//       September: [
//         { subject: "X", marks: 85 },
//         { subject: "Y", marks: 75 },
//         { subject: "Z", marks: 90 },
//       ],
//     },
//     "2nd Year": {
//       August: [
//         { subject: "X", marks: 67 },
//         { subject: "Y", marks: 89 },
//         { subject: "Z", marks: 71 },
//       ],
//       September: [
//         { subject: "X", marks: 85 },
//         { subject: "Y", marks: 75 },
//         { subject: "Z", marks: 90 },
//       ],
//     },
//     "3rd Year": {
//       August: [
//         { subject: "X", marks: 78 },
//         { subject: "Y", marks: 77 },
//         { subject: "Z", marks: 83 },
//       ],
//       September: [
//         { subject: "X", marks: 85 },
//         { subject: "Y", marks: 75 },
//         { subject: "Z", marks: 90 },
//       ],
//     },
//     "4th Year": {
//       August: [
//         { subject: "X", marks: 76 },
//         { subject: "Y", marks: 75 },
//         { subject: "Z", marks: 90 },
//       ],
//       September: [
//         { subject: "X", marks: 81 },
//         { subject: "Y", marks: 75 },
//         { subject: "Z", marks: 90 },
//       ],
//     },
//     "5th Year": {
//       August: [
//         { subject: "X", marks: 90 },
//         { subject: "Y", marks: 60 },
//         { subject: "Z", marks: 90 },
//       ],
//       September: [
//         { subject: "X", marks: 95 },
//         { subject: "Y", marks: 85 },
//         { subject: "Z", marks: 99 },
//       ],
//     },
//   },
//   feedback: {
//     "1st Year": {
//       August: "Great performance, keep it up!",
//       September: "Improved from last month. Good job!",
//     },
//     "2nd Year": {
//       August: "Great performance, keep it up!",
//       September: "Improved from last month. Good job!",
//     },
//     "3rd Year": {
//       August: "Great performance, keep it up!",
//       September: "Improved from last month. Good job!",
//     },
//     "4th Year": {
//       August: "Great performance, keep it up!",
//       September: "Improved from last month. Good job!",
//     },
//     "5th Year": {
//       August: "Needs improvement in time management.",
//     },
//   },
// };

// const StudentDashboard = () => {
//   const [selectedYear, setSelectedYear] = useState("1st Year");
//   const [selectedMonth, setSelectedMonth] = useState("August");
//   const reportRef = useRef();

//   const monthData = studentData.marks[selectedYear]?.[selectedMonth] || [];
//   const feedback =
//     studentData.feedback[selectedYear]?.[selectedMonth] ||
//     "No feedback available";
//   const total = monthData.reduce((acc, curr) => acc + curr.marks, 0);
//   const percentage = monthData.length > 0 ? total / monthData.length : 0;

//   const handlePrint = () => window.print();

//   const exportToPDF = () => {
//     html2canvas(reportRef.current).then((canvas) => {
//       const imgData = canvas.toDataURL("image/png");
//       const pdf = new jsPDF();
//       const imgProps = pdf.getImageProperties(imgData);
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
//       pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
//       pdf.save("student-report.pdf");
//     });
//   };

//   return (
//     <div
//       className="p-6 max-w-6xl mx-auto bg-gray-50 min-h-screen"
//       ref={reportRef}
//     >
//       <h1 className="text-3xl font-bold text-blue-800 border-b-2 pb-2 mb-6">
//         🎓 Student Dashboard
//       </h1>

//       <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 bg-white p-4 rounded shadow-md">
//         <div>
//           <h2 className="text-xl font-semibold">👤 {studentData.name}</h2>
//           <p className="text-gray-600">
//             Roll No: <strong>{studentData.rollNo}</strong>
//           </p>
//         </div>
//         <img
//           src={studentData.imageUrl}
//           alt="Student"
//           className="w-24 h-24 rounded-full shadow-md border"
//         />
//       </div>

//       <div className="mb-4 flex flex-col sm:flex-row gap-4">
//         <select
//           className="px-3 py-2 border rounded shadow-sm"
//           value={selectedYear}
//           onChange={(e) => {
//             setSelectedYear(e.target.value);
//             setSelectedMonth(Object.keys(studentData.marks[e.target.value])[0]);
//           }}
//         >
//           {Object.keys(studentData.marks).map((year) => (
//             <option key={year}>{year}</option>
//           ))}
//         </select>

//         <select
//           className="px-3 py-2 border rounded shadow-sm"
//           value={selectedMonth}
//           onChange={(e) => setSelectedMonth(e.target.value)}
//         >
//           {Object.keys(studentData.marks[selectedYear] || {}).map((month) => (
//             <option key={month}>{month}</option>
//           ))}
//         </select>
//       </div>

//       <table className="w-full border border-gray-300 shadow-sm mb-6">
//         <thead className="bg-blue-100">
//           <tr>
//             <th className="text-left px-4 py-2 border">Subject</th>
//             <th className="text-left px-4 py-2 border">Marks</th>
//           </tr>
//         </thead>
//         <tbody>
//           {monthData.map((item, idx) => (
//             <tr key={idx} className="hover:bg-blue-50">
//               <td className="px-4 py-2 border">{item.subject}</td>
//               <td className="px-4 py-2 border">{item.marks}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <div className="mb-4 p-4 bg-white rounded shadow-md">
//         <h3 className="text-lg font-semibold mb-2 text-green-700">
//           📊 Performance Summary
//         </h3>
//         <p>
//           Total Marks: <strong>{total}</strong>
//         </p>
//         <p>
//           Average Percentage: <strong>{percentage.toFixed(2)}%</strong>
//         </p>
//       </div>

//       <div className="mb-6 p-4 bg-white rounded shadow-md">
//         <h3 className="text-lg font-semibold mb-2 text-purple-700">
//           🗨️ Teacher Feedback
//         </h3>
//         <p>{feedback}</p>
//       </div>

//       <div className="bg-white p-4 rounded shadow-md mb-6">
//         <h3 className="text-lg font-semibold mb-4 text-indigo-700">
//           📈 Marks Distribution Chart
//         </h3>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={monthData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="subject" />
//             <YAxis />
//             <Tooltip />
//             <Bar dataKey="marks" fill="#3B82F6" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>

//       <div className="flex gap-4 mb-6">
//         <button
//           onClick={handlePrint}
//           className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
//         >
//           🖨️ Print Report
//         </button>
//         <button
//           onClick={exportToPDF}
//           className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
//         >
//           📄 Export to PDF
//         </button>
//       </div>
//     </div>
//   );
// };

// export default StudentDashboard;

import React, { useRef, useState } from "react";
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
import html2canvas from "html2canvas";

const studentData = {
  name: "John Doe",
  rollNo: "S101",
  imageUrl: "https://via.placeholder.com/100",
  marks: {
    "1st Year": {
      August: [
        { subject: "X", marks: 96 },
        { subject: "Y", marks: 70 },
        { subject: "Z", marks: 80 },
      ],
      September: [
        { subject: "X", marks: 85 },
        { subject: "Y", marks: 75 },
        { subject: "Z", marks: 90 },
      ],
    },
    "2nd Year": {
      August: [
        { subject: "X", marks: 67 },
        { subject: "Y", marks: 89 },
        { subject: "Z", marks: 71 },
      ],
      September: [
        { subject: "X", marks: 85 },
        { subject: "Y", marks: 75 },
        { subject: "Z", marks: 90 },
      ],
    },
    "3rd Year": {
      August: [
        { subject: "X", marks: 78 },
        { subject: "Y", marks: 77 },
        { subject: "Z", marks: 83 },
      ],
      September: [
        { subject: "X", marks: 85 },
        { subject: "Y", marks: 75 },
        { subject: "Z", marks: 90 },
      ],
    },
    "4th Year": {
      August: [
        { subject: "X", marks: 76 },
        { subject: "Y", marks: 75 },
        { subject: "Z", marks: 90 },
      ],
      September: [
        { subject: "X", marks: 81 },
        { subject: "Y", marks: 75 },
        { subject: "Z", marks: 90 },
      ],
    },
    "5th Year": {
      August: [
        { subject: "X", marks: 90 },
        { subject: "Y", marks: 60 },
        { subject: "Z", marks: 90 },
      ],
      September: [
        { subject: "X", marks: 95 },
        { subject: "Y", marks: 85 },
        { subject: "Z", marks: 99 },
      ],
    },
  },
  feedback: {
    "1st Year": {
      August: "Great performance, keep it up!",
      September: "Improved from last month. Good job!",
    },
    "2nd Year": {
      August: "Great performance, keep it up!",
      September: "Improved from last month. Good job!",
    },
    "3rd Year": {
      August: "Great performance, keep it up!",
      September: "Improved from last month. Good job!",
    },
    "4th Year": {
      August: "Great performance, keep it up!",
      September: "Improved from last month. Good job!",
    },
    "5th Year": {
      August: "Needs improvement in time management.",
    },
  },

  attendance: {
    "1st Year": {
      August: { present: 22, total: 26 },
      September: { present: 18, total: 22 },
    },
    "2nd Year": {
      August: { present: 19, total: 24 },
    },
  },
};

const StudentDashboard = () => {
  const [selectedYear, setSelectedYear] = useState("1st Year");
  const [selectedMonth, setSelectedMonth] = useState("August");
  const reportRef = useRef();

  const monthData = studentData.marks[selectedYear]?.[selectedMonth] || [];
  const feedback =
    studentData.feedback[selectedYear]?.[selectedMonth] ||
    "No feedback available";
  const attendance = studentData.attendance[selectedYear]?.[selectedMonth];
  const total = monthData.reduce((acc, curr) => acc + curr.marks, 0);
  const percentage = monthData.length > 0 ? total / monthData.length : 0;

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

      <div className="mb-4 flex flex-col sm:flex-row gap-4">
        <select
          className="px-3 py-2 border rounded shadow-sm"
          value={selectedYear}
          onChange={(e) => {
            setSelectedYear(e.target.value);
            setSelectedMonth(Object.keys(studentData.marks[e.target.value])[0]);
          }}
        >
          {Object.keys(studentData.marks).map((year) => (
            <option key={year}>{year}</option>
          ))}
        </select>

        <select
          className="px-3 py-2 border rounded shadow-sm"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          {Object.keys(studentData.marks[selectedYear] || {}).map((month) => (
            <option key={month}>{month}</option>
          ))}
        </select>
      </div>

      {/* Marks Table */}
      <table className="w-full border border-gray-300 shadow-sm mb-6">
        <thead className="bg-blue-100">
          <tr>
            <th className="text-left px-4 py-2 border">Subject</th>
            <th className="text-left px-4 py-2 border">Marks</th>
          </tr>
        </thead>
        <tbody>
          {monthData.map((item, idx) => (
            <tr key={idx} className="hover:bg-blue-50">
              <td className="px-4 py-2 border">{item.subject}</td>
              <td className="px-4 py-2 border">{item.marks}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Performance */}
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

      {/* Teacher Feedback */}
      <div className="mb-6 p-4 bg-white rounded shadow-md">
        <h3 className="text-lg font-semibold mb-2 text-purple-700">
          🗨️ Teacher Feedback
        </h3>
        <p>{feedback}</p>
      </div>

      {/* Attendance Summary */}
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
                {((attendance.present / attendance.total) * 100).toFixed(2)}%
              </strong>
            </p>
            <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
              <div
                className="bg-orange-500 h-4 rounded-full"
                style={{
                  width: `${(attendance.present / attendance.total) * 100}%`,
                }}
              ></div>
            </div>
          </>
        ) : (
          <p>No attendance data available for this month.</p>
        )}
      </div>

      {/* Marks Chart */}
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

      {/* Print / PDF */}
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
    </div>
  );
};

export default StudentDashboard;
