import ObjectId from "bson-objectid";

export default interface Workout {
  _id: ObjectId;
  user_id: ObjectId;
  workout_name: string;
  focus: string;
  likes: number;
  exercises: Array<{
    exercise_id: ObjectId;
    sets: Array<{
      repetitions: number;
      weight_lifted: number;
    }>;
  }>;
}
