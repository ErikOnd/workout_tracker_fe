import React, { useEffect, useState } from "react";
import { Container, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import saveWorkout from "../../../services/saveWorkout";
import { clearWorkout } from "../../../redux/reducers/workoutSlice";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";

import updateWorkout from "../../../services/updateWorkout";

const ExerciseTable = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { workout_id, importParam } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const workout = useSelector((state: RootState) => state.workout.data);
  const user = useSelector((state: RootState) => state.user.data);

  console.log("importParam:", importParam);

  const scrollToDiv = (exerciseId: string) => {
    const element = document.getElementById(exerciseId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSaveWorkout = () => {
    setIsLoading(true);
    saveWorkout(workout);
    dispatch(clearWorkout());
    setTimeout(() => {
      setIsLoading(false);
      navigate("/your-workouts/");
    }, 1000);
  };

  return (
    <Container className="exercise-list-container">
      <div className="exercise-div mt-5">
        <span className="ex-list-header">Exercise List</span>
        <ListGroup className="mt-3">
          {workout?.exercises.map((exercise) => (
            <ListGroup.Item
              className="exercise-list-item"
              onClick={() => exercise._id && scrollToDiv(exercise._id)}
            >
              {exercise.name}
            </ListGroup.Item>
          ))}
        </ListGroup>
        {isLoading && (
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        )}

        {workout_id && importParam === "import" ? (
          <>
            {" "}
            <div
              className="mt-5 orange-btn mr-auto save-workout-btn"
              onClick={() => {
                handleSaveWorkout();
              }}
            >
              Import
            </div>
            <div
              className="mt-1 orange-btn mr-auto go-back-btn"
              onClick={() => navigate(-1)}
            >
              Go Back
            </div>
          </>
        ) : workout_id ? (
          <div
            className="mt-5 orange-btn mr-auto save-workout-btn"
            onClick={() => {
              setIsLoading(true);
              updateWorkout(workout, workout_id);
              dispatch(clearWorkout());
              setTimeout(() => {
                setIsLoading(false);
                navigate("/your-workouts/");
              }, 1000);
            }}
          >
            Update Workout
          </div>
        ) : (
          <div
            className="mt-5 orange-btn mr-auto save-workout-btn"
            onClick={() => {
              handleSaveWorkout();
            }}
          >
            Save Workout
          </div>
        )}
      </div>
    </Container>
  );
};

export default ExerciseTable;
