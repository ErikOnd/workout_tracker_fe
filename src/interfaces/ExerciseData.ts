export default interface ExerciseData {
  _id?: string;
  name?: string;
  gifUrl?: string;
  target?: string;
  sets?: Set[];
}

export interface Set {
  repetitions?: number;
  weight_lifted?: number;
  _id: string;
}
