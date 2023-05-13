const apiUrl = process.env.REACT_APP_API_URL;
const accessToken = localStorage.getItem("accessToken");

const deleteChart = async (workoutId: string) => {
  try {
    const res = await fetch(`${apiUrl}/progress/chart/${workoutId}`, {
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

export default deleteChart;
