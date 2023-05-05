const apiUrl = process.env.REACT_APP_API_URL;
const accessToken = localStorage.getItem("accessToken");

const getExercise = async (
  exercise: string,
  setMuscleGroups: React.Dispatch<React.SetStateAction<string>>,
  setExersiceId: React.Dispatch<React.SetStateAction<string>>,
  setGifLink: React.Dispatch<React.SetStateAction<string>>
) => {
  try {
    const res = await fetch(`${apiUrl}/exercises/${exercise}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res.ok) {
      throw new Error(await res.text());
    } else {
      const exercise = await res.json();
      const exerciseId = exercise._id;
      const bodyPart = exercise.bodyPart;
      const target = exercise.target;
      const gifLink = exercise.gifUrl;
      const focus = "Bodypart[" + bodyPart + "]\n" + "Target[" + target + "]";

      setExersiceId(exerciseId);
      setMuscleGroups(focus);
      setGifLink(gifLink);
    }
  } catch (error) {
    console.log(error);
  }
};

export default getExercise;
