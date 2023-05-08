export default interface ExerciseData {
  exercise_id: ExerciseID;
  sets: Set[];
  _id: string;
}

export interface ExerciseID {
  _id: string;
  bodyPart: string;
  equipment: string;
  gifUrl: string;
  name: string;
  target: string;
}

export interface Set {
  repetitions: number;
  weight_lifted: number;
  _id: string;
}
