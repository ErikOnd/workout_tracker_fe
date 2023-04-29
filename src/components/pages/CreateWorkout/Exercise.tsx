import React from "react";
import { Container, Row, Col, Form } from "react-bootstrap";

const Exercise = () => {
  return (
    <Container>
      <div className="exercise-div mt-5">
        <Row>
          <Form.Control
            type="text"
            placeholder="Exercise Name"
            className="w-placeholder ex-name"
          />
        </Row>
        <Row className="pt-4 align-items-center setsAndFocus">
          <span className="text-left p-0 sets-col">Sets:</span>
          <Col>
            <Form.Control
              type="text"
              placeholder="Sets"
              className=" w-placeholder"
            />
          </Col>
          <span className="text-left p-0 sets-col">Focus:</span>
          <Col>
            <Form.Control
              as="textarea"
              rows={1}
              placeholder="Focused Muscle groups"
              className="w-placeholder focus-area pl-0"
              readOnly
            />
          </Col>
        </Row>
      </div>
      <div className="set-div">
        <Row>
          <Row>Set 1</Row>
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
    </Container>
  );
};

export default Exercise;
