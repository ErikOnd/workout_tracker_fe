const apiUrl = process.env.REACT_APP_API_URL;
const accessToken = localStorage.getItem("accessToken");

const getLikesAmount = async () => {
  try {
    const res = await fetch(`${apiUrl}/workouts/me/likes/count`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res.ok) {
      throw new Error(await res.text());
    } else {
      const likesNumber = await res.json();
      return likesNumber;
    }
  } catch (error) {
    console.log(error);
  }
};

export default getLikesAmount;
