import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import studentJson from "../../data/studentData.json";

export const fetchStudentData = createAsyncThunk(
  "student/fetchStudentData",
  async () => {
    // Simulate async fetch
    return new Promise((resolve) => {
      setTimeout(() => resolve(studentJson), 500);
    });
  }
);

const studentSlice = createSlice({
  name: "student",
  initialState: {
    data: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStudentData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchStudentData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default studentSlice.reducer;
