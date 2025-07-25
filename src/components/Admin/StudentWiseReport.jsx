import React, { useState, useEffect, useRef } from "react";
import studentData from "../../data/studentWiseData.json";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry } from "ag-grid-community";
import {
  ClientSideRowModelModule,
  PaginationModule,
  TextFilterModule,
  NumberFilterModule,
  ValidationModule,
} from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  PaginationModule,
  TextFilterModule,
  NumberFilterModule,
  ValidationModule,
]);

const StudentWiseReport = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudentOption, setSelectedStudentOption] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedPhase, setSelectedPhase] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [reportData, setReportData] = useState(null);

  const gridRef = useRef(null);

  useEffect(() => {
    setStudents(studentData);
  }, []);

  useEffect(() => {
    if (selectedStudentOption) {
      const student = students.find(
        (s) => s.id.toString() === selectedStudentOption.value
      );
      setSelectedStudent(student);
      setSelectedPhase(student?.phase || "");
      setSubjects(student?.subjects || []);
    } else {
      setSelectedStudent(null);
      setSelectedPhase("");
      setSubjects([]);
    }
  }, [selectedStudentOption, students]);

  const generateReport = () => {
    if (!selectedStudent || !fromDate || !toDate) {
      alert("Please select student and date range.");
      return;
    }

    const avg = (
      subjects.reduce((sum, s) => sum + s.attendance, 0) / subjects.length
    ).toFixed(1);

    setReportData({
      studentId: selectedStudent.id,
      studentName: selectedStudent.name,
      phase: selectedPhase,
      totalSubjects: subjects.length,
      summary: { averageAttendance: avg },
      subjects,
    });
  };

  const resetForm = () => {
    setSelectedStudentOption(null);
    setSelectedStudent(null);
    setSelectedPhase("");
    setSubjects([]);
    setFromDate(null);
    setToDate(null);
    setReportData(null);
  };

  const downloadPDF = () => {
    if (!reportData) return;

    const doc = new jsPDF();
    const margin = 15;
    let y = margin;

    doc.setFontSize(18).setTextColor(0).text("Student Wise Attendance Report", margin, y);
    y += 10;

    doc.setFontSize(12).setTextColor(0);
    doc.text(`Name: ${reportData.studentName}`, margin, (y += 6));
    doc.text(`ID: ${reportData.studentId}`, margin, (y += 6));
    doc.text(`Phase: ${reportData.phase}`, margin, (y += 6));
    doc.text(`From: ${fromDate.toDateString()}`, margin, (y += 6));
    doc.text(`To: ${toDate.toDateString()}`, margin, (y += 6));
    doc.text(`Subjects: ${reportData.totalSubjects}`, margin, (y += 6));
    doc.text(`Average Attendance: ${reportData.summary.averageAttendance}%`, margin, (y += 6));
    y += 4;

    autoTable(doc, {
      margin: { top: 20, bottom: 20, left: 20, right: 20 },
      startY: y,
      head: [["Subject", "Code", "Attendance (%)"]],
      body: reportData.subjects.map((s) => [
        s.name,
        s.code,
        `${s.attendance}%`,
      ]),
      styles: {
        fontSize: 11,
        halign: "center",
        textColor: 0,
        lineColor: 0,
      },
      headStyles: {
        fillColor: [255, 255, 255],
        textColor: 0,
        lineColor: 0,
      },
      bodyStyles: {
        fillColor: [255, 255, 255],
        lineColor: 0,
      },
      didDrawPage: () => {
        const page = doc.internal.getNumberOfPages();
        doc
          .setFontSize(10)
          .setTextColor(0)
          .text(`Page ${page}`, 105, 287, { align: "center" });
      },
    });

    doc.save("Student_Report.pdf");
    window.open(doc.output("bloburl"), "_blank");
  };

  const columnDefs = [
    { headerName: "Subject", field: "name", flex: 1 },
    { headerName: "Code", field: "code", flex: 1 },
    {
      headerName: "Attendance (%)",
      field: "attendance",
      flex: 1,
      valueFormatter: (params) => `${params.value}%`,
      filter: "agNumberColumnFilter",
    },
  ];

  const studentOptions = students.map((s) => ({
    value: s.id.toString(),
    label: `${s.name} (ID: ${s.id})`,
  }));

  const phaseOptions = [
    { value: "Phase 1", label: "Phase 1" },
    { value: "Phase 2", label: "Phase 2" },
    { value: "Phase 3", label: "Phase 3" },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-blue-700">
        📘 Student Wise Attendance Report
      </h1>

      <div className="flex flex-wrap gap-3 items-center">
        <div className="w-[200px]">
          <Select
            options={studentOptions}
            value={selectedStudentOption}
            onChange={setSelectedStudentOption}
            placeholder="Select Student"
            isClearable
            styles={{
              control: (base) => ({
                ...base,
                height: 38,
                minHeight: 38,
                borderRadius: 6,
              }),
            }}
          />
        </div>

        <div className="w-[200px]">
          <Select
            options={phaseOptions}
            value={phaseOptions.find((p) => p.value === selectedPhase)}
            onChange={(opt) => setSelectedPhase(opt?.value || "")}
            placeholder="Phase"
            isClearable
            styles={{
              control: (base) => ({
                ...base,
                height: 38,
                minHeight: 38,
                borderRadius: 6,
              }),
            }}
          />
        </div>

        <div className="w-[200px]">
          <DatePicker
            selected={fromDate}
            onChange={setFromDate}
            placeholderText="From Date"
            className="border border-gray-300 rounded-md px-2 h-[38px] w-full"
            dateFormat="yyyy-MM-dd"
          />
        </div>

        <div className="w-[200px]">
          <DatePicker
            selected={toDate}
            onChange={setToDate}
            placeholderText="To Date"
            className="border border-gray-300 rounded-md px-2 h-[38px] w-full"
            dateFormat="yyyy-MM-dd"
          />
        </div>

        <button
          onClick={generateReport}
          className="bg-blue-700 text-white text-sm rounded px-4 h-[38px] hover:bg-blue-800"
        >
          Search
        </button>
      </div>

      {reportData && (
        <>
          <div className="bg-gray-100 p-4 rounded shadow mt-6">
            <h2 className="text-xl font-semibold mb-2">📌 Summary</h2>
            <p>
              <strong>Student:</strong> {reportData.studentName} (ID:{" "}
              {reportData.studentId})
            </p>
            <p>
              <strong>Phase:</strong> {reportData.phase}
            </p>
            <p>
              <strong>Total Subjects:</strong> {reportData.totalSubjects}
            </p>
            <p>
              <strong>Average Attendance:</strong>{" "}
              {reportData.summary.averageAttendance}%
            </p>
          </div>

          <div className="ag-theme-alpine mt-6" style={{ width: "100%" }}>
            <AgGridReact
              theme="legacy"
              ref={gridRef}
              columnDefs={columnDefs}
              rowData={reportData.subjects}
              pagination={true}
              paginationPageSize={10}
              paginationPageSizeSelector={[5, 10, 20, 50]}
              defaultColDef={{ sortable: true, filter: true, resizable: true }}
              domLayout="autoHeight"
            />
          </div>

          <div className="flex justify-between mt-6 gap-4">
            <button
              onClick={resetForm}
              className="bg-gray-600 text-white rounded px-4 py-2 hover:bg-gray-700"
            >
              🔙 Back
            </button>
            <button
              onClick={downloadPDF}
              className="bg-blue-700 text-white rounded px-4 py-2 hover:bg-blue-800"
            >
              📄 Download PDF
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default StudentWiseReport;
