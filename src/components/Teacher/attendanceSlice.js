// attendanceSlice.js
import { createSlice } from "@reduxjs/toolkit";

const savedAttendance = JSON.parse(localStorage.getItem("attendanceRecords")) || [];

const attendanceSlice = createSlice({
  name: "attendance",
  initialState: {
    records: savedAttendance,
    currentStudents: [], 
  },
  reducers: {
    setStudents: (state, action) => {
      state.currentStudents = action.payload;
    },
    updateStudentField: (state, action) => {
      const { id, field, value } = action.payload;
      const student = state.currentStudents.find((s) => s.id === id);
      if (student) {
        student[field] = value;
      }
    },
    submitAttendance: (state, action) => {
      state.records.push(action.payload);
      localStorage.setItem("attendanceRecords", JSON.stringify(state.records));
    },
    clearAttendance: (state) => {
      state.records = [];
      localStorage.removeItem("attendanceRecords");
    },
  },
});

export const { setStudents, updateStudentField, submitAttendance, clearAttendance } = attendanceSlice.actions;
export default attendanceSlice.reducer;
