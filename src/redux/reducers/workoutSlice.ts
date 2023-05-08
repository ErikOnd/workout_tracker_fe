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
    removePrefExercise: (state, action) => {
      if (state.data) {
        state.data.exercises = state.data.exercises.filter(
          (exercise) => exercise._id !== action.payload
        );
      }
    },
    addSets: (state, action) => {
      const { exerciseId, set } = action.payload;
      if (state.data) {
        const exercise = state.data.exercises.find(
          (exercise) => exercise.exercise_id === exerciseId
        );
        if (exercise) {
          exercise.sets.push(set);
        }
      }
    },
    removeSet: (state, action) => {
      const { exerciseId, setId } = action.payload;
      if (state.data) {
        const exercise = state.data.exercises.find(
          (exercise) => exercise.exercise_id === exerciseId
        );
        if (exercise) {
          exercise.sets = exercise.sets.filter((set) => set._id !== setId);
        }
      }
    },
  },
});

export const {
  setWorkout,
  clearWorkout,
  addExercise,
  removeExercise,
  addSets,
  removeSet,
  removePrefExercise,
} = workoutSlice.actions;

export default workoutSlice.reducer;
