import React from "react";
import { Container, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import saveWorkout from "../../../services/saveWorkout";

const ExerciseTable = () => {
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

        <div
          className="mt-4 orange-btn mr-auto save-workout-btn"
          onClick={() => {
            saveWorkout(workout);
          }}
        >
          Save Workout
        </div>
      </div>
    </Container>
  );
};

export default ExerciseTable;
