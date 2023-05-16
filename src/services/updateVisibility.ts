import ObjectId from "bson-objectid";

const apiUrl = process.env.REACT_APP_API_URL;
const accessToken = localStorage.getItem("accessToken");

const updateVisibility = async (workout_id: ObjectId | undefined) => {
  try {
    const res = await fetch(`${apiUrl}/workouts/visibility/${workout_id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      method: "PUT",
    });
    if (!res.ok) {
      throw new Error(await res.text());
    }
  } catch (error) {
    console.log(error);
  }
};

export default updateVisibility;
