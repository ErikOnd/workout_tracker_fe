export default interface ProgressItem {
  _id: string;
  user_id: string;
  exercise_id: Exercise;
  weight_lifted: number;
  createdAt: string;
  __v: number;
}

interface Exercise {
  _id: string;
  name: string;
}
