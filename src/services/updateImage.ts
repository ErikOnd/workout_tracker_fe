import ObjectID from "bson-objectid";
const apiUrl = process.env.REACT_APP_API_URL;

const updateImage = async (newImage: File | undefined, userId: ObjectID) => {
  try {
    const data = new FormData();
    if (newImage !== undefined) {
      data.append("avatar", newImage);
    }
    await fetch(`${apiUrl}/users/image/${userId}`, {
      method: "PUT",
      body: data,
    });
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
};

export default updateImage;
