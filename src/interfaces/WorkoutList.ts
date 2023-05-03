export interface WorkoutList {
  _id: string;
  user_id: string;
  workout_name: string;
  focus: string;
  likes: number;
  exercises: Exercise[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface Exercise {
  exercise_id: ExerciseID;
  sets: Set[];
  _id: string;
}

export interface ExerciseID {
  _id: string;
  exercise: string;
  muscles: string[];
}

export interface Set {
  repetitions: number;
  weight_lifted: number;
  _id: string;
}
