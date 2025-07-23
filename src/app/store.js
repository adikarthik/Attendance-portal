import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "../Student/studentSlice";

export const store = configureStore({
  reducer: {
    student: studentReducer,
  },
});
