const apiUrl = process.env.REACT_APP_API_URL;
const accessToken = localStorage.getItem("accessToken");

const getPublicWorkouts = async () => {
  try {
    console.log(`${apiUrl}/workouts/public`);
    const res = await fetch(`${apiUrl}/workouts/public`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res.ok) {
      throw new Error(await res.text());
    } else {
      const publicWorkouts = await res.json();
      return publicWorkouts;
    }
  } catch (error) {
    console.log(error);
  }
};

export default getPublicWorkouts;
