const apiUrl = process.env.REACT_APP_API_URL;
const accessToken = localStorage.getItem("accessToken");

const getWorkoutById = async (workoutId: string | undefined) => {
  try {
    const res = await fetch(`${apiUrl}/workouts/${workoutId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res.ok) {
      throw new Error(await res.text());
    } else {
      const workout = await res.json();
      return workout;
    }
  } catch (error) {
    console.log(error);
  }
};

export default getWorkoutById;
