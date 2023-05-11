import ObjectId from "bson-objectid";
export default interface ExerciseData {
  _id?: string;
  name?: string;
  gifUrl?: string;
  target?: string;
  trackExercise?: boolean;
  exerciesId?: ObjectId;
  sets?: Set[];
}

export interface Set {
  repetitions?: number;
  weight_lifted?: number;
  _id?: string;
}
