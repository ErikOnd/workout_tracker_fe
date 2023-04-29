import { UpdateUser } from "../interfaces/UpdateUser";

const apiUrl = process.env.REACT_APP_API_URL;
const accessToken = localStorage.getItem("accessToken");

const putUserData = async (data: UpdateUser) => {
  try {
    const res = await fetch(`${apiUrl}/users/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error(await res.text());
    } else {
      const userData = await res.json();
      return userData;
    }
  } catch (error) {
    console.log(error);
  }
};

export default putUserData;
