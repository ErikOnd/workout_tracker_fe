import WorkoutData from "../interfaces/WorkoutData";

const apiUrl = process.env.REACT_APP_API_URL;
const accessToken = localStorage.getItem("accessToken");

const saveWorkout = async (data: WorkoutData | null) => {
  try {
    console.log("data send:", data);
    const res = await fetch(`${apiUrl}/workouts`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error(await res.text());
    } else {
      return res.status === 201;
    }
  } catch (error) {
    console.log(error);
  }
};

export default saveWorkout;
