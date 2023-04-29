const apiUrl = process.env.REACT_APP_API_URL;

const getUserData = async (accessToken: string) => {
  try {
    const res = await fetch(`${apiUrl}/users/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
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

export default getUserData;
