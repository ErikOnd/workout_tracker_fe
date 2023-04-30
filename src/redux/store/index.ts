import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    // other reducers go here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
