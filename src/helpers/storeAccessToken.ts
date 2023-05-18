const storeAccessToken = () => {
  const urlString = window.location.href;
  const url = new URL(urlString);
  const accessToken = url.searchParams.get("accessToken");
  if (accessToken !== null && accessToken !== undefined) {
    localStorage.setItem("accessToken", accessToken);
    window.location.href = "/profile";
  }
};

export default storeAccessToken;
