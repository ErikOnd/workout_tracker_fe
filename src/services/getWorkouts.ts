const apiUrl = process.env.REACT_APP_API_URL;
const accessToken = localStorage.getItem("accessToken");

const getWorkouts = async () => {
  try {
    const res = await fetch(`${apiUrl}/workouts/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res.ok) {
      throw new Error(await res.text());
    } else {
      const workouts = await res.json();
      return workouts;
    }
  } catch (error) {
    console.log(error);
  }
};

export default getWorkouts;
