import React, { useEffect, useState } from "react";
import getWorkoutById from "../../../services/getWorkoutById";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { PlusSquareFill, Trash } from "react-bootstrap-icons";
import PrefWorkout from "../../../interfaces/PrefWorkout";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import {
  addSets,
  removePrefExercise,
  removePrefSet,
  removeSet,
  setWorkout,
} from "../../../redux/reducers/workoutSlice";
import { removeExerciseName } from "../../../redux/reducers/exerciseListSlice";

//todo: make edit sets, add set and remove sets possible

const ReconstructWorkout = ({ workout_id }: { workout_id: string }) => {
  const workoutData = useSelector((state: RootState) => state.workout.data);

  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(getWorkoutById(workout_id));
  }, []);

  const handleRemoveExercise = (exerciseId: string) => {
    dispatch(removePrefExercise(exerciseId));
  };

  const handleRemoveSet = (exerciseId: string, setId: string) => {
    dispatch(removePrefSet({ exerciseId: exerciseId, setId: setId }));
  };

  console.log("workoutData", workoutData);

  return (
    <>
      {workoutData?.exercises?.map((exercise, index) => (
        <Container
          id={exercise._id}
          key={exercise._id}
          className="exercise-con"
        >
          <div className="exercise-div mt-5">
            <Row>
              <input
                type="text"
                list="data"
                placeholder="Exercise Name"
                className="w-placeholder ex-name w-100"
                value={exercise?.name}
              />
            </Row>
            <Row className="pt-4 align-items-start setsAndFocus">
              <span className="text-left p-0 sets-col">Focus:</span>
              <Col>
                <Form.Control
                  as="textarea"
                  rows={2}
                  placeholder="Focused Muscle groups"
                  className="w-placeholder focus-area pl-0"
                  readOnly
                  value={exercise?.target}
                />
              </Col>
              <Col>
                <Image src={exercise?.gifUrl} alt="" className="exercise-gif" />
              </Col>
            </Row>
            <Row>
              <Button
                variant="danger"
                className="remove-ex-btn trash-icon"
                onClick={() => {
                  if (exercise._id) {
                    handleRemoveExercise(exercise._id);
                  }
                }}
              >
                <Trash size={20}></Trash>
              </Button>
            </Row>
          </div>
          {exercise?.sets?.map((set, index) => (
            <div className="set-div" key={set._id} id={set._id}>
              <Row>
                <Row>Set {index + 1}</Row>
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
                    className="remove-set-btn trash-icon"
                    onClick={() => {
                      if (exercise._id && set._id) {
                        handleRemoveSet(exercise._id, set._id);
                      }
                    }}
                  >
                    <Trash size={20}></Trash>
                  </Button>
                </Row>
              </Row>
            </div>
          ))}
          <Row>
            <span
              className="mb-4 orange-btn mr-auto d-flex align-items-center"
              onClick={() => {
                dispatch(addSets({ exerciseId: exercise._id }));
              }}
            >
              <PlusSquareFill size={15} className="mr-2"></PlusSquareFill>
              Set
            </span>
          </Row>
        </Container>
      ))}
    </>
  );
};

export default ReconstructWorkout;
