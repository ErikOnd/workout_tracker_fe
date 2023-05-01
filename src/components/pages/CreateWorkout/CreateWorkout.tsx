import React, { useState } from "react";
import "./CreateWorkout.css";
import { Container, Form, Row, Button, Col } from "react-bootstrap";
import Header from "../../layout/Header";
import Exercise from "./Exercise";
import ExerciseTable from "./ExerciseTable";
import WorkoutData from "../../../interfaces/WorkoutData";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const CreateWorkout = () => {
  const userData = useSelector((state: RootState) => state.user.data);

  const [workoutData, setWorkoutData] = useState<WorkoutData>({
    user_id: userData?._id,
    workout_name: "",
    focus: "",
    likes: 0,
    exercises: [],
  });

  const [exerciseCount, setExerciseCount] = useState(1);

  const exercise = { exercise_id: "", sets: [] };

  const handleAddExercise = () => {
    setExerciseCount(exerciseCount + 1);
    workoutData.exercises.push(exercise);
  };

  const exerciseComponents = [];

  for (let i = 0; i < exerciseCount; i++) {
    exerciseComponents.push(<Exercise key={i} />);
  }

  return (
    <Container fluid className="create-workout-con text-center">
      <Header></Header>
      <Row className="my-5">
        <Form.Control
          size="lg"
          type="text"
          placeholder="Workout Name"
          className="workout-name"
        />
      </Row>
      <Row>
        <Col className="col-3">
          <ExerciseTable />
        </Col>
        <Col className="col-9">
          {exerciseComponents}
          <Container>
            <Row>
              <span
                className="my-5 orange-btn mr-auto"
                onClick={handleAddExercise}
              >
                Add Exercise
              </span>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateWorkout;
