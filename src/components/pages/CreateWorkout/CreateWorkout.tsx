import React, { useState } from "react";
import "./CreateWorkout.css";
import { Container, Form, Row, Button, Col } from "react-bootstrap";
import Header from "../../layout/Header";
import Exercise from "./Exercise";
import ExerciseTable from "./ExerciseTable";

const CreateWorkout = () => {
  const [exerciseCount, setExerciseCount] = useState(1);

  const handleAddExercise = () => {
    setExerciseCount(exerciseCount + 1);
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
          {" "}
          {exerciseComponents}
          <Row>
            <span
              className="mt-5 ml-3 orange-btn mr-auto"
              onClick={handleAddExercise}
            >
              Add Exercise
            </span>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateWorkout;
