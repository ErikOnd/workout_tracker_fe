const apiUrl = process.env.REACT_APP_API_URL;
const accessToken = localStorage.getItem("accessToken");

const getWorkoutsAmount = async () => {
  try {
    const res = await fetch(`${apiUrl}/workouts/me/count`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res.ok) {
      throw new Error(await res.text());
    } else {
      const workoutNumber = await res.json();
      return workoutNumber;
    }
  } catch (error) {
    console.log(error);
  }
};

export default getWorkoutsAmount;
