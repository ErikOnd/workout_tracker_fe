import React from "react";
import "./CreateWorkout.css";
import { Container, Form, Row } from "react-bootstrap";
import Header from "../../layout/Header";
import Exercise from "./Exercise";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const CreateWorkout = () => {
  const userData = useSelector((state: RootState) => state.user.data);
  console.log(userData);
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
      <Exercise></Exercise>
    </Container>
  );
};

export default CreateWorkout;
