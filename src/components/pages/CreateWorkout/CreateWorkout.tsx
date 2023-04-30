import React, { useState } from "react";
import "./CreateWorkout.css";
import { Container, Form, Row, Button } from "react-bootstrap";
import Header from "../../layout/Header";
import Exercise from "./Exercise";

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
      <Row className="mt-5">
        <Form.Control
          size="lg"
          type="text"
          placeholder="Workout Name"
          className="workout-name"
        />
      </Row>
      {exerciseComponents}
      <Button className="mt-5 orange-btn" onClick={handleAddExercise}>
        Add Exercise
      </Button>
    </Container>
  );
};

export default CreateWorkout;
