import { setWorkout } from "../redux/reducers/workoutSlice";
import { ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";
import { RootState } from "../redux/store";

const apiUrl = process.env.REACT_APP_API_URL;
const accessToken = localStorage.getItem("accessToken");

const getWorkoutById = (
  workoutId: string | undefined
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    try {
      const res = await fetch(`${apiUrl}/workouts/${workoutId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      dispatch(setWorkout(await res.json()));
    } catch (error) {
      console.log(error);
    }
  };
};

export default getWorkoutById;
