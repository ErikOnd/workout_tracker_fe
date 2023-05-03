import { createSlice } from "@reduxjs/toolkit";
interface Exercise {
  exerciseId: string;
  exerciseName: string;
}

interface ExerciseState {
  exercises: Exercise[];
}

const initialState: ExerciseState = {
  exercises: [],
};

const exerciseListSlice = createSlice({
  name: "exerciseList",
  initialState,
  reducers: {
    addExerciseName: (state, action) => {
      state.exercises.push(action.payload);
    },
    removeExerciseName: (state, action) => {
      const exerciseId = action.payload;
      state.exercises = state.exercises.filter(
        (exercise) => exercise.exerciseId !== exerciseId
      );
    },
  },
});

export const { addExerciseName, removeExerciseName } =
  exerciseListSlice.actions;

export default exerciseListSlice.reducer;
