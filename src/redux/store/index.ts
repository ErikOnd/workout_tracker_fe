import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/userSlice";
import workoutReducer from "../reducers/workoutSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    workout: workoutReducer,

    // other reducers go here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
