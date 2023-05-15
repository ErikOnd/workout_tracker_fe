import ObjectId from "bson-objectid";
import ExerciseData from "./ExerciseData";

export default interface WorkoutData {
  user_id: ObjectId | undefined;
  workout_name: string;
  focus: string;
  likes: number;
  exercises: ExerciseData[];
  _id?: string;
  public?: boolean;
}
