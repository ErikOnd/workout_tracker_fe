import { createSlice } from "@reduxjs/toolkit";
import WorkoutData from "../../interfaces/WorkoutData";
import ObjectId from "bson-objectid";

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
        const { id_ } = action.payload;
        state.data.exercises.push({ _id: id_ });
      }
    },

    addExercise: (state, action) => {
      if (state.data) {
        let exercise = state.data.exercises.find(
          (exercise) => exercise._id === action.payload._id
        );
        if (exercise) {
          exercise.name = action.payload.name;
          exercise.gifUrl = action.payload.gifUrl;
          exercise.target = action.payload.target;
          exercise.trackExercise = false;
          exercise.exerciesId = action.payload.exerciesId;
          exercise.sets = [];
        }
      }
    },
    setTrackExercise: (state, action) => {
      if (state.data) {
        const { exerciseId } = action.payload;
        const exercise = state.data.exercises.find(
          (exercise) => exercise._id === exerciseId
        );

        if (exercise) {
          exercise.trackExercise = !exercise.trackExercise;
        }
      }
    },

    removeExercise: (state, action) => {
      if (state.data) {
        state.data.exercises = state.data.exercises.filter(
          (exercise) => exercise._id !== action.payload
        );
      }
    },

    addSets: (state, action) => {
      const { exerciseId, setId } = action.payload;
      if (state.data) {
        const exercise = state.data.exercises.find(
          (exercise) => exercise._id === exerciseId
        );
        if (exercise) {
          if (exercise.sets) {
            exercise.sets.push({ _id: setId });
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
    addWeight: (state, action) => {
      const { exerciseId, setId, weightLifted } = action.payload;

      if (state.data) {
        const exercise = state.data.exercises.find(
          (exercise) => exercise._id === exerciseId
        );

        if (exercise) {
          if (exercise.sets) {
            const set = exercise.sets.find((set) => set._id === setId);

            if (set) {
              set.weight_lifted = weightLifted;
            }
          }
        }
      }
    },
    addReps: (state, action) => {
      const { exerciseId, setId, repetitions } = action.payload;

      if (state.data) {
        const exercise = state.data.exercises.find(
          (exercise) => exercise._id === exerciseId
        );

        if (exercise) {
          if (exercise.sets) {
            const set = exercise.sets.find((set) => set._id === setId);

            if (set) {
              set.repetitions = repetitions;
            }
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
  addWeight,
  addReps,
  setTrackExercise,
} = workoutSlice.actions;

export default workoutSlice.reducer;
