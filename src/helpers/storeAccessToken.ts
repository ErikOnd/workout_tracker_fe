const storeAccessToken = () => {
  const urlString = window.location.href;
  const url = new URL(urlString);
  const accessToken = url.searchParams.get("accessToken");
  if (accessToken !== null) {
    localStorage.setItem("accessToken", accessToken);
  }
};

export default storeAccessToken;
