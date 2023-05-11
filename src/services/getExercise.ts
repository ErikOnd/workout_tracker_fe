import { ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";
import { RootState } from "../redux/store";
import { addExercise } from "../redux/reducers/workoutSlice";
import { v4 as uuid } from "uuid";

const apiUrl = process.env.REACT_APP_API_URL;
const accessToken = localStorage.getItem("accessToken");

const getExercise = (
  exerciseName: string,
  index: number
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    try {
      const res = await fetch(`${apiUrl}/exercises/${exerciseName}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const exerciseData = await res.json();

      const exerciseObj = {
        _id: uuid(),
        name: exerciseName,
        gifUrl: exerciseData.gifUrl,
        target: exerciseData.target,
        sets: [],
      };

      dispatch(addExercise(exerciseObj));
    } catch (error) {
      console.log(error);
    }
  };
};

export default getExercise;
