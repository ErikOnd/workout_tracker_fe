import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addSets } from "../../../redux/reducers/workoutSlice";
import { Trash } from "react-bootstrap-icons";
import { removeSet } from "../../../redux/reducers/workoutSlice";

interface ExerciseSet {
  exerciseId: string | undefined;
  setNumber: number;
}

const ExerciseSets = ({ exerciseId, setNumber }: ExerciseSet) => {
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [readOnly, setReadOnly] = useState(false);
  const dispatch = useDispatch();
  const setId = exerciseId + "_" + setNumber;

  const addSet = () => {
    if (reps !== "" && weight !== "") {
      const newSet = {
        repetitions: parseInt(reps),
        weight_lifted: parseInt(weight),
        set_id: setId,
      };
      dispatch(addSets({ exerciseId: exerciseId, set: newSet }));
    }
  };

  const handleBlur = () => {
    if (reps !== "" && weight !== "") {
      setReadOnly(true);
      addSet();
    } else {
      setReadOnly(false);
    }
  };

  const handleRemoveSet = () => {
    dispatch(removeSet({ exerciseId: exerciseId, setId: setId }));
    const element = document.getElementById(setId);
    element?.remove();
  };

  return (
    <div className="set-div" id={setId}>
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
              onBlur={() => {
                if (!readOnly) {
                  handleBlur();
                }
              }}
              readOnly={readOnly}
            />
          </Col>
          <span className="text-left p-0 sets-col">Weight:</span>
          <Col className="weight-input-col">
            <Form.Control
              type="text"
              placeholder="weight"
              className="w-placeholder"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              onBlur={() => {
                if (!readOnly) {
                  handleBlur();
                }
              }}
              readOnly={readOnly}
            />
          </Col>
          <span>kg</span>
          <Button
            variant="danger"
            onClick={handleRemoveSet}
            className="remove-set-btn trash-icon"
          >
            <Trash size={20}></Trash>
          </Button>
        </Row>
      </Row>
    </div>
  );
};

export default ExerciseSets;
