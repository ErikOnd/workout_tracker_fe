const apiUrl = process.env.REACT_APP_API_URL;
const accessToken = localStorage.getItem("accessToken");

const getAllExercies = async () => {
  try {
    const res = await fetch(`${apiUrl}/exercises/all`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res.ok) {
      throw new Error(await res.text());
    } else {
      const exerciseNames = await res.json();

      return exerciseNames;
    }
  } catch (error) {
    console.log(error);
  }
};

export default getAllExercies;
