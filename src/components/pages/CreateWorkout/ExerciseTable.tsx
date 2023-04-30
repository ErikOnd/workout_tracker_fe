import React from "react";
import { Container, ListGroup } from "react-bootstrap";

const ExerciseTable = () => {
  return (
    <Container className="exercise-list-container">
      <div className="exercise-div mt-5">
        <div className="exercise-list">Exercise List</div>
        <ListGroup>
          <ListGroup.Item>Item 1</ListGroup.Item>
          <ListGroup.Item>Item 2</ListGroup.Item>
          <ListGroup.Item>Item 3</ListGroup.Item>
        </ListGroup>
      </div>
    </Container>
  );
};

export default ExerciseTable;
