import RegisterData from "../interfaces/RegisterData";

const apiUrl = process.env.REACT_APP_API_URL;

const userRegistration = async (data: RegisterData) => {
  try {
    const res = await fetch(`${apiUrl}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error(await res.text());
    } else {
      const accessToken = await res.json();
      localStorage.setItem("accessToken", accessToken.accessToken);
      if (localStorage.getItem("accessToken")) {
        return "/profile";
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export default userRegistration;
