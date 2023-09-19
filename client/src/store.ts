import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import streamReducer from "./features/stream/streamSlice";
import adminReducer from "./features/admin/adminSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    stream: streamReducer,
    admin: adminReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
