import LoginData from "../interfaces/LoginData";

const apiUrl = process.env.REACT_APP_API_URL;

const userGoogleLogin = async (
  loginData: LoginData,
  setRedirect: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const response = await fetch(`${apiUrl}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    if (response.ok) {
      const accessToken = await response.json();
      localStorage.setItem("accessToken", accessToken.accessToken);
      setRedirect(true);
    } else {
      console.error("Login information wrong");
    }
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
};

export default userGoogleLogin;
