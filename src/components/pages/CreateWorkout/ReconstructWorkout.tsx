import React, { useEffect, useState } from "react";
import getWorkoutById from "../../../services/getWorkoutById";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { PlusSquareFill, Trash } from "react-bootstrap-icons";
import PrefWorkout from "../../../interfaces/PrefWorkout";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import {
  removePrefExercise,
  removePrefSet,
  removeSet,
  setWorkout,
} from "../../../redux/reducers/workoutSlice";
import { removeExerciseName } from "../../../redux/reducers/exerciseListSlice";

//todo: make edit sets, add set and remove sets possible

const ReconstructWorkout = ({ workout_id }: { workout_id: string }) => {
  const workoutData = useSelector((state: RootState) => state.workout.data);
  const [prefWorkout, setPrefWorkout] = useState<PrefWorkout>();
  const dispatch = useDispatch();
  useEffect(() => {
    getWorkoutData();
  }, []);

  useEffect(() => {
    if (prefWorkout) {
      dispatch(
        setWorkout({
          ...workoutData,
          user_id: prefWorkout.user_id,
          focus: "",
          likes: 0,
          exercises: prefWorkout.exercises,
          workout_name: prefWorkout.workout_name,
        })
      );
    }
  }, [prefWorkout]);

  const getWorkoutData = async () => {
    setPrefWorkout(await getWorkoutById(workout_id));
  };

  const handleRemoveExercise = (exerciseId: string) => {
    dispatch(removePrefExercise(exerciseId));
    dispatch(removeExerciseName(exerciseId));
    const element = document.getElementById(exerciseId);
    element?.remove();
  };

  const handleRemoveSet = (exerciseId: string, setId: string) => {
    dispatch(removePrefSet({ exerciseId: exerciseId, setId: setId }));
    const element = document.getElementById(setId);
    element?.remove();
  };

  console.log("workoutData", workoutData);

  return (
    <>
      {prefWorkout?.exercises?.map((exercise, index) => (
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
                value={exercise.exercise_id.name}
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
                  value={exercise.exercise_id.target}
                />
              </Col>
              <Col>
                <Image
                  src={exercise.exercise_id.gifUrl}
                  alt=""
                  className="exercise-gif"
                />
              </Col>
            </Row>
            <Row>
              <Button
                variant="danger"
                className="remove-ex-btn trash-icon"
                onClick={() => {
                  handleRemoveExercise(exercise._id);
                }}
              >
                <Trash size={20}></Trash>
              </Button>
            </Row>
          </div>
          {exercise.sets.map((set, index) => (
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
                      handleRemoveSet(exercise._id, set._id);
                    }}
                  >
                    <Trash size={20}></Trash>
                  </Button>
                </Row>
              </Row>
            </div>
          ))}
          <Row>
            <span className="mb-4 orange-btn mr-auto d-flex align-items-center">
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
