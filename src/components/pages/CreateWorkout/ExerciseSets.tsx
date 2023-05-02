import React, { useEffect, useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addSets } from "../../../redux/reducers/workoutSlice";

interface ExerciseSet {
  exerciseId: string | undefined;
  setNumber: number;
}

const ExerciseSets = ({ exerciseId, setNumber }: ExerciseSet) => {
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const dispatch = useDispatch();

  const addSet = () => {
    console.log("reps:", reps, "weight:", weight);
    if (reps !== "" && weight !== "") {
      const newSet = {
        reps: parseInt(reps),
        weight: parseInt(weight),
      };
      dispatch(addSets({ exerciseId: exerciseId, set: newSet }));
    }
  };

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
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              onBlur={addSet}
            />
          </Col>
          <span className="text-left p-0 sets-col">Weight:</span>
          <Col className="weight-input-col">
            <Form.Control
              type="text"
              placeholder="Weight"
              className="w-placeholder"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              onBlur={addSet}
            />
          </Col>
          <span>kg</span>
        </Row>
      </Row>
    </div>
  );
};

export default ExerciseSets;
