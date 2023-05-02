const apiUrl = process.env.REACT_APP_API_URL;
const accessToken = localStorage.getItem("accessToken");

const getExercise = async (
  exercise: string,
  setMuscleGroups: React.Dispatch<React.SetStateAction<string>>,
  setExersiceId: React.Dispatch<React.SetStateAction<string>>
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
      const muscleGroupsArr = exercise.muscles;
      const exerciseId = exercise._id;
      const muscleGroup = muscleGroupsArr.join(", ");

      setExersiceId(exerciseId);
      setMuscleGroups(muscleGroup);
    }
  } catch (error) {
    console.log(error);
  }
};

export default getExercise;
