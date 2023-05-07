import React, { useEffect, useState } from "react";
import getWorkoutById from "../../../services/getWorkoutById";

const ReconstructWorkout = ({ workout_id }: { workout_id: string }) => {
  const [prefWorkout, setPrefWorkout] = useState();

  useEffect(() => {
    loadWorkoutData();
  }, []);

  const loadWorkoutData = async () => {
    const workoutData = await getWorkoutById(workout_id);
    setPrefWorkout(workoutData);
  };

  console.log("prefWorkout:", prefWorkout);

  return <div>ReconstructWorkout</div>;
};

export default ReconstructWorkout;
