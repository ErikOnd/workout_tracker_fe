import ObjectId from "bson-objectid";

export default interface FindWorkoutInterface {
  _id: string;
  user_id: UserID;
  workout_name: string;
  focus: string;
  exercises: Exercise[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  public: boolean;
  likes: string[];
}

export interface Exercise {
  gifUrl: string;
  name: string;
  target: string;
  trackExercise: boolean;
  exerciesId: string;
  sets: Set[];
  _id: string;
}

export interface Set {
  repetitions: number;
  weight_lifted: number;
  _id: string;
}

export interface UserID {
  _id: string;
  username: string;
}
