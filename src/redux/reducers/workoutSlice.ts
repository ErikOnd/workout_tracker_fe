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
      console.log("addSets");
      const { exerciseId, set } = action.payload;

      if (state.data) {
        const exercise = state.data.exercises.find(
          (exercise) => exercise.exercise_id === exerciseId
        );

        if (exercise) {
          exercise.sets = exercise.sets.filter(
            (s) => Object.keys(s).length !== 0
          ); // filter out empty objects
          exercise.sets.push(set);
        }
      }
    },
    addSetsAndClear: (state, action) => {
      console.log("addSets");
      const { exerciseId, set } = action.payload;

      if (state.data) {
        const exercise = state.data.exercises.find(
          (exercise) => exercise._id === exerciseId
        );

        if (exercise) {
          exercise.sets = exercise.sets.filter(
            (s) => Object.keys(s).length !== 0
          ); // filter out empty objects
          exercise.sets.push(set);
        }
      }
    },

    addPrefSets: (state, action) => {
      const { exerciseId, set } = action.payload;
      console.log("exerciseId:", exerciseId);

      if (state.data) {
        const exercise = state.data.exercises.find(
          (exercise) => exercise._id === exerciseId
        );
        console.log("exercise:", exercise);
        if (exercise) {
          exercise.sets.push(set);
        }
      }
    },
    removeSet: (state, action) => {
      const { exerciseId, setId } = action.payload;
      console.log(exerciseId, setId);
      if (state.data) {
        const exercise = state.data.exercises.find(
          (exercise) => exercise.exercise_id === exerciseId
        );
        console.log(exercise);
        if (exercise) {
          exercise.sets = exercise.sets.filter((set) => set._id !== setId);
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
  removePrefSet,
  addPrefSets,
  addSetsAndClear,
} = workoutSlice.actions;

export default workoutSlice.reducer;
