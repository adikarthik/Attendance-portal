import { configureStore } from "@reduxjs/toolkit";
import attendanceReducer from "../components/Teacher/attendanceSlice";
import studentReducer from "../components/Student/studentSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  attendance: attendanceReducer,
  student: studentReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["attendance"], // only persist attendance slice
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);


export default store;
