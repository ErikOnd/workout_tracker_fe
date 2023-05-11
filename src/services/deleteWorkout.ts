import ObjectID from "bson-objectid";

const apiUrl = process.env.REACT_APP_API_URL;
const accessToken = localStorage.getItem("accessToken");

const deleteWorkout = async (workoutId: ObjectID) => {
  try {
    const res = await fetch(`${apiUrl}/workouts/${workoutId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error(await res.text());
    }
  } catch (error) {
    console.log(error);
  }
};

export default deleteWorkout;
