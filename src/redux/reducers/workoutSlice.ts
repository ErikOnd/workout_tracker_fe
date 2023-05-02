import { createSlice } from "@reduxjs/toolkit";
import WorkoutData from "../../interfaces/WorkoutData";

interface WorkoutState {
  data: WorkoutData | null;
}

const initialState: WorkoutState = {
  data: null,
};

export const workoutSlice = createSlice({
  name: "workout",
  initialState,
  reducers: {
    setWorkout: (state, action) => {
      state.data = action.payload;
    },
    clearWorkout: (state) => {
      state.data = null;
    },
    addExercise: (state, action) => {
      if (state.data) {
        state.data.exercises.push(action.payload);
      }
    },
    removeExercise: (state, action) => {
      if (state.data) {
        state.data.exercises = state.data.exercises.filter(
          (exercise) => exercise.exercise_id !== action.payload
        );
      }
    },
  },
});

export const { setWorkout, clearWorkout, addExercise } = workoutSlice.actions;

export default workoutSlice.reducer;
