import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Trash } from "react-bootstrap-icons";
import { removeSet } from "../../../redux/reducers/workoutSlice";
import { RootState } from "../../../redux/store";

const ExerciseSets = ({
  exerciseId,
  exerciseIndex,
}: {
  exerciseId: string | undefined;
  exerciseIndex: number;
}) => {
  const workoutData = useSelector((state: RootState) => state.workout.data);
  const dispatch = useDispatch();

  return (
    <>
      {exerciseId &&
        workoutData?.exercises[exerciseIndex].sets?.map((set, setIndex) => (
          <div className="set-div" id={exerciseId + exerciseIndex}>
            <Row>
              <Row>Set {setIndex + 1}</Row>
              <Row className="align-items-center mt-3">
                {" "}
                <span className="text-left p-0 sets-col">Reps:</span>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="Reps"
                    className=" w-placeholder"
                    value={set.repetitions}
                  />
                </Col>
                <span className="text-left p-0 sets-col">Weight:</span>
                <Col className="weight-input-col">
                  <Form.Control
                    type="text"
                    placeholder="weight"
                    className="w-placeholder"
                    value={set.weight_lifted}
                  />
                </Col>
                <span>kg</span>
                <Button
                  variant="danger"
                  onClick={() => {
                    dispatch(removeSet(exerciseId + setIndex));
                  }}
                  className="remove-set-btn trash-icon"
                >
                  <Trash size={20}></Trash>
                </Button>
              </Row>
            </Row>
          </div>
        ))}
    </>
  );
};
//todo: when creating a set, generate an id with uuidv4 and give that set this is in the reudux store, also change the setID in the backend from an ObjectId to a string

export default ExerciseSets;
