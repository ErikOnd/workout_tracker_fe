import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import Sets from "../../../interfaces/Sets";

const ExerciseSets = ({ setNumber }: Sets) => {
  return (
    <div className="set-div">
      <Row>
        <Row>Set {setNumber + 1}</Row>
        <Row className="align-items-center mt-3">
          {" "}
          <span className="text-left p-0 sets-col">Reps:</span>
          <Col>
            <Form.Control
              type="text"
              placeholder="Reps"
              className=" w-placeholder"
            />
          </Col>
          <span className="text-left p-0 sets-col">Weight:</span>
          <Col className="weight-input-col">
            <Form.Control
              type="text"
              placeholder="Weight"
              className="w-placeholder "
            />
          </Col>
          <span>kg</span>
        </Row>
      </Row>
    </div>
  );
};

export default ExerciseSets;
