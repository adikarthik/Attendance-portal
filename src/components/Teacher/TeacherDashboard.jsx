import React, { useEffect, useRef, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry } from "ag-grid-community";
import {
  ClientSideRowModelModule,
  PaginationModule,
  TextFilterModule,
  NumberFilterModule,
  ValidationModule,
  CellStyleModule,
} from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import toast from "react-hot-toast";

import {
  setStudents,
  updateStudentField,
  submitAttendance,
} from "./attendanceSlice";

import attendanceData from "../../data/attendanceData.json";

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  PaginationModule,
  TextFilterModule,
  NumberFilterModule,
  ValidationModule,
  CellStyleModule,
]);

const TeacherDashboard = () => {
  const dispatch = useDispatch();
  const gridRef = useRef();
  const students = useSelector((state) => state.attendance.currentStudents);

  const [phases, setPhases] = useState([]);
  const [subjects, setSubjects] = useState({});
  const [studentsByPhase, setStudentsByPhase] = useState({});
  const [selectedPhase, setSelectedPhase] = useState(1);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [classTime, setClassTime] = useState("");
  const [customTime, setCustomTime] = useState("");
  const [classDate, setClassDate] = useState("");

  const predefinedTimings = [
    "9am to 10am",
    "10am to 11am",
    "11am to 12pm",
    "12pm to 1pm",
    "2pm to 3pm",
    "3pm to 4pm",
    "Others",
  ];

  useEffect(() => {
    try {
      const raw = attendanceData;
      const data = Array.isArray(raw) ? raw.find((d) => d.phases) : raw;

      if (!data) {
        toast.error("Invalid data format!");
        return;
      }

      const { phases, subjects, studentsByPhase } = data;
      setPhases(phases || []);
      setSubjects(subjects || {});
      setStudentsByPhase(studentsByPhase || {});

      const defaultPhase = phases?.[0] || 1;
      setSelectedPhase(defaultPhase);
      setSelectedSubject(subjects?.[defaultPhase]?.[0] || "");

      const initialStudents =
        studentsByPhase?.[defaultPhase]?.map((s) => ({
          ...s,
          attendance: "",
          credits: false,
        })) || [];

      dispatch(setStudents(initialStudents));

      const now = new Date();
      setClassDate(now.toISOString().split("T")[0]);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load student data.");
    }
  }, [dispatch]);

  const handleAttendanceChange = (id, value) => {
    dispatch(updateStudentField({ id, field: "attendance", value }));
  };

  const handleCreditsChange = (id, currentValue) => {
    dispatch(updateStudentField({ id, field: "credits", value: !currentValue }));
  };

  const columnDefs = useMemo(
    () => [
      {
        headerName: "Reg. No",
        field: "id",
        flex: 0.5,
        headerClass: "text-center text-lg font-bold",
        cellClass: "text-center text-base font-medium",
      },
      {
        headerName: "Student Name",
        field: "name",
        flex: 1.2,
        headerClass: "text-center text-lg font-bold",
        cellClass: "text-center text-base font-medium",
      },
      {
        headerName: "Attendance",
        field: "attendance",
        flex: 1.5,
        headerClass: "text-center text-lg font-bold",
        cellRenderer: (params) => (
          <div className="flex justify-center items-center py-2 space-x-8 md:space-x-12">
            <label className="inline-flex items-center gap-2">
              <input
                type="radio"
                name={`attendance-${params.data.id}`}
                checked={params.data.attendance === "Present"}
                onChange={() => handleAttendanceChange(params.data.id, "Present")}
                className="accent-green-500 w-5 h-5"
              />
              <span className="text-green-700 text-base font-medium">Present</span>
            </label>
            <label className="inline-flex items-center gap-2">
              <input
                type="radio"
                name={`attendance-${params.data.id}`}
                checked={params.data.attendance === "Absent"}
                onChange={() => handleAttendanceChange(params.data.id, "Absent")}
                className="accent-red-500 w-5 h-5"
              />
              <span className="text-red-700 text-base font-medium">Absent</span>
            </label>
          </div>
        ),
        cellClass: "text-center",
      },
      {
        headerName: "Credits",
        field: "credits",
        flex: 0.8,
        headerClass: "text-center text-lg font-bold",
        cellRenderer: (params) => (
          <div className="flex justify-center">
            <input
              type="checkbox"
              checked={params.data.credits}
              onChange={() =>
                handleCreditsChange(params.data.id, params.data.credits)
              }
              className="w-5 h-5 accent-blue-500"
            />
          </div>
        ),
        cellClass: "text-center",
      },
    ],
    []
  );

  const handleSubmit = () => {
    const finalTime = classTime === "Others" ? customTime : classTime;

    if (!selectedSubject || !topic || !finalTime || !classDate) {
      toast.error("Please fill all class details.");
      return;
    }

    if (!students || students.length === 0) {
      toast.error("No students to submit attendance for.");
      return;
    }

    const payload = {
      phase: selectedPhase,
      subject: selectedSubject,
      topic,
      classTime: finalTime,
      classDate,
      attendance: students,
    };

    dispatch(submitAttendance(payload));
    toast.success(" Attendance submitted successfully!", {
      style: {
        borderRadius: "10px",
        background: "#ecfdf5",
        color: "#065f46",
        border: "1px solid #34d399",
        fontWeight: "500",
      },
      iconTheme: {
        primary: "#10b981",
        secondary: "#f0fdf4",
      },
    });
  };

  const handlePhaseChange = (newPhase) => {
    setSelectedPhase(newPhase);
    const defaultSubject = subjects[newPhase]?.[0] || "";
    setSelectedSubject(defaultSubject);

    const newStudents = studentsByPhase[newPhase] || [];
    const updated = newStudents.map((s) => ({
      ...s,
      attendance: "",
      credits: false,
    }));
    dispatch(setStudents(updated));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-green-700">Mark Attendance</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="font-medium">Phase</label>
          <select
            className="w-full mt-1 p-2 border rounded"
            value={selectedPhase}
            onChange={(e) => handlePhaseChange(parseInt(e.target.value))}
          >
            {phases.map((phase) => (
              <option key={phase} value={phase}>
                Phase {phase}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-medium">Subject</label>
          <select
            className="w-full mt-1 p-2 border rounded"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            {(subjects[selectedPhase] || []).map((subject) => (
              <option key={subject}>{subject}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-medium">Class Date</label>
          <input
            type="date"
            className="w-full mt-1 p-2 border rounded"
            value={classDate}
            onChange={(e) => setClassDate(e.target.value)}
          />
        </div>

        <div>
          <label className="font-medium">Class Time</label>
          <select
            className="w-full mt-1 p-2 border rounded"
            value={classTime}
            onChange={(e) => setClassTime(e.target.value)}
          >
            <option value="">Select Class Time</option>
            {predefinedTimings.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
          {classTime === "Others" && (
            <input
              type="text"
              className="w-full mt-2 p-2 border rounded"
              placeholder="Enter custom time"
              value={customTime}
              onChange={(e) => setCustomTime(e.target.value)}
            />
          )}
        </div>

        <div>
          <label className="font-medium">Topic</label>
          <input
            type="text"
            className="w-full mt-1 p-2 border rounded"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Topic discussed"
          />
        </div>
      </div>

      <div className="ag-theme-alpine mt-6" style={{ width: "100%" }}>
        <AgGridReact
          ref={gridRef}
          columnDefs={columnDefs}
          rowData={students}
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={[10, 20, 50]}
          defaultColDef={{ sortable: true, filter: true, resizable: true }}
          domLayout="autoHeight"
          theme="legacy"
        />
      </div>

      <div className="mt-6">
        <button
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          onClick={handleSubmit}
        >
          Submit Attendance
        </button>
      </div>
    </div>
  );
};

export default TeacherDashboard;
