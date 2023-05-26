import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Trash } from "react-bootstrap-icons";
import {
  addReps,
  addWeight,
  removeSet,
} from "../../../redux/reducers/workoutSlice";
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

  const handleReps = (reps: string, setId: string) => {
    dispatch(
      addReps({
        exerciseId: exerciseId,
        setId: setId,
        repetitions: Number(reps),
      })
    );
  };

  const handleWeight = (weight: string, setId: string) => {
    dispatch(
      addWeight({
        exerciseId: exerciseId,
        setId: setId,
        weightLifted: Number(weight),
      })
    );
  };

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
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const reps = e.target.value;
                      if (/^\d*$/.test(reps)) {
                        set._id && handleReps(reps, set._id);
                      }
                    }}
                  />
                </Col>
                <span className="text-left p-0 sets-col">Weight:</span>
                <Col className="weight-input-col">
                  <Form.Control
                    type="text"
                    placeholder="weight"
                    className="w-placeholder"
                    value={set.weight_lifted}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const weight = e.target.value;
                      if (/^\d*$/.test(weight)) {
                        set._id && handleWeight(weight, set._id);
                      }
                    }}
                  />
                </Col>
                <span>kg</span>
                <Button
                  variant="danger"
                  onClick={() => {
                    dispatch(
                      removeSet({ exerciseId: exerciseId, setId: set._id })
                    );
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

export default ExerciseSets;
