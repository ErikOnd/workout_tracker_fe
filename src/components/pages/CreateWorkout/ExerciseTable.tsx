import React, { useState } from "react";
import { Container, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import saveWorkout from "../../../services/saveWorkout";
import { removeAllExerciseNames } from "../../../redux/reducers/exerciseListSlice";
import { clearWorkout } from "../../../redux/reducers/workoutSlice";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const ExerciseTable = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const exerciseList = useSelector(
    (state: RootState) => state.exerciseList.exercises
  );
  const workout = useSelector((state: RootState) => state.workout.data);

  function scrollToDiv(exerciseId: string) {
    const element = document.getElementById(exerciseId);
    element?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <Container className="exercise-list-container">
      <div className="exercise-div mt-5">
        <div className="exercise-list">Exercise List</div>
        <ListGroup>
          {exerciseList.map((exercise) => (
            <ListGroup.Item
              className="exercise-list-item"
              onClick={() => scrollToDiv(exercise.exerciseId)}
            >
              {exercise.exerciseName}
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
        <div
          className="mt-4 orange-btn mr-auto save-workout-btn"
          onClick={() => {
            setIsLoading(true);
            saveWorkout(workout);
            setTimeout(() => {
              setIsLoading(false);
              navigate("/your-workouts/");
            }, 1000);
            dispatch(removeAllExerciseNames());
            dispatch(clearWorkout());
          }}
        >
          Save Workout
        </div>
      </div>
    </Container>
  );
};

export default ExerciseTable;
