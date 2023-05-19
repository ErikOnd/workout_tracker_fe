import WorkoutData from "../interfaces/WorkoutData";

const apiUrl = process.env.REACT_APP_API_URL;
const accessToken = localStorage.getItem("accessToken");

const updateWorkout = async (data: WorkoutData | null, workout_id: string) => {
  try {
    const res = await fetch(`${apiUrl}/workouts/${workout_id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
};

export default updateWorkout;
