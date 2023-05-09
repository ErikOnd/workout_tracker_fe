import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";

const SetComponent = () => {
  return (
    <div className="set-div">
      <Row>
        <Row>Set </Row>
        <Row className="align-items-center mt-3">
          {" "}
          <span className="text-left p-0 sets-col">Reps:</span>
          <Col>
            <Form.Control
              type="text"
              placeholder="Reps"
              className=" w-placeholder"
              /*    value={set.repetitions} */
            />
          </Col>
          <span className="text-left p-0 sets-col">Weight:</span>
          <Col className="weight-input-col">
            <Form.Control
              type="text"
              placeholder="weight"
              className="w-placeholder"
              /*     value={set.weight_lifted} */
            />
          </Col>
          <span>kg</span>
          <Button
            variant="danger"
            className="remove-set-btn trash-icon"
            /*    onClick={() => {
              handleRemoveSet(exercise._id, set._id);
            }} */
          >
            <Trash size={20}></Trash>
          </Button>
        </Row>
      </Row>
    </div>
  );
};

export default SetComponent;
