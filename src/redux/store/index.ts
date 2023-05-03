import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/userSlice";
import workoutReducer from "../reducers/workoutSlice";
import exerciseListReducer from "../reducers/exerciseListSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    workout: workoutReducer,
    exerciseList: exerciseListReducer,

    // other reducers go here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
