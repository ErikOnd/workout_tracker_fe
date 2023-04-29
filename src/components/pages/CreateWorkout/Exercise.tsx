import React from "react";
import { Container, Row, Col, Form } from "react-bootstrap";

const Exercise = () => {
  return (
    <Container className="exercise-div mt-5">
      <Row>ExerciseName</Row>
      <Row className="mt-4">
        <Col className="text-left p-0 sets-col">Sets:</Col>
        <Col className="p-0">
          <Form.Control
            type="text"
            placeholder="Enter sets"
            className="sets-input"
          />
        </Col>
        <Col className="text-left p-0 focus-col">Focus:</Col>
        <Col className="p-0">
          <Form.Control
            as="textarea"
            rows={2}
            placeholder="Focused Muscle groups"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Exercise;
