export default interface ExerciseData {
  exercise_id: string;
  sets: { repetitions: number; weight_lifted: number }[];
}
