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

    addEmptyExercise: (state, action) => {
      if (state.data) {
        state.data.exercises.push({});
      }
    },

    addExercise: (state, action) => {
      if (state.data) {
        state.data.exercises.push(action.payload);
        state.data.exercises = state.data.exercises.filter(
          (exercise) => Object.keys(exercise).length > 0
        );
      }
    },
    removeExercise: (state, action) => {
      if (state.data) {
        state.data.exercises = state.data.exercises.filter(
          (exercise) => exercise._id !== action.payload
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
          (exercise) => exercise._id === exerciseId
        );
        if (exercise) {
          if (exercise.sets) {
            exercise.sets.push(set);
          }
        }
      }
    },

    addPrefSets: (state, action) => {
      const { exerciseId } = action.payload;
      if (state.data) {
        const exercise = state.data.exercises.find(
          (exercise) => exercise._id === exerciseId
        );
        if (exercise) {
          if (exercise.sets) {
            exercise.sets.push({ _id: "1", repetitions: 0, weight_lifted: 0 });
          }
        }
      }
    },
    removeSet: (state, action) => {
      const { exerciseId, setId } = action.payload;
      console.log(exerciseId, setId);
      if (state.data) {
        const exercise = state.data.exercises.find(
          (exercise) => exercise._id === exerciseId
        );
        console.log(exercise);
        if (exercise) {
          if (exercise.sets) {
            exercise.sets = exercise.sets.filter((set) => set._id !== setId);
          }
        }
      }
    },
    removePrefSet: (state, action) => {
      const { exerciseId, setId } = action.payload;
      console.log(exerciseId, setId);
      if (state.data) {
        const exercise = state.data.exercises.find(
          (exercise) => exercise._id === exerciseId
        );
        console.log(exercise);
        if (exercise) {
          if (exercise.sets) {
            exercise.sets = exercise.sets.filter((set) => set._id !== setId);
          }
        }
      }
    },
  },
});

export const {
  setWorkout,
  clearWorkout,
  addExercise,
  addEmptyExercise,
  removeExercise,
  addSets,
  removeSet,
  removePrefExercise,
  removePrefSet,
  addPrefSets,
} = workoutSlice.actions;

export default workoutSlice.reducer;
