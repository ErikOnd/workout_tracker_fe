const apiUrl = process.env.REACT_APP_API_URL;
const accessToken = localStorage.getItem("accessToken");

const getProgressData = async () => {
  try {
    const res = await fetch(`${apiUrl}/progress/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res.ok) {
      throw new Error(await res.text());
    } else {
      const progressData = await res.json();
      return progressData;
    }
  } catch (error) {
    console.log(error);
  }
};

export default getProgressData;
