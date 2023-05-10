import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import ExerciseSets from "./ExerciseSets";
import getExercise from "../../../services/getExercise";
import { useDispatch, useSelector } from "react-redux";
import { addExercise } from "../../../redux/reducers/workoutSlice";
import { removeExercise } from "../../../redux/reducers/workoutSlice";
import { PlusSquareFill, Trash } from "react-bootstrap-icons";
import { addExerciseName } from "../../../redux/reducers/exerciseListSlice";
import { removeExerciseName } from "../../../redux/reducers/exerciseListSlice";
import getAllExerciseNames from "../../../services/getAllExerciseNames";
import { AppDispatch, RootState } from "../../../redux/store";
const Exercise = () => {
  type ExerciseName = string;

  const [setsCount, setSetsCount] = useState<number>(0);
  const [setsComponents, setSetsComponents] = useState<React.ReactNode[]>([]);
  const [exerciseName, setExerciseName] = useState("");
  const [allNames, setAllNames] = useState<ExerciseName[]>([]);
  const [muscleGroups, setMuscleGroups] = useState("Focused Muscle groups");
  const [gifLink, setGifLink] = useState("");
  const [exerciseId, setExerciseId] = useState("");
  const workoutData = useSelector((state: RootState) => state.workout.data);

  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    if (exerciseId) {
      dispatch(
        addExercise({
          exercise_id: exerciseId,
          sets: [],
        })
      );

      setExerciseId("");
      setExerciseName("");
      setGifLink("");
      setMuscleGroups("Focused Muscle groups");

      dispatch(
        addExerciseName({
          exerciseId,
          exerciseName,
        })
      );
    }
  }, [exerciseId]);

  async function fetchExerciseNames() {
    const response = await getAllExerciseNames();
    setAllNames(response);
  }
  console.log("workoutData", workoutData);

  useEffect(() => {
    fetchExerciseNames();
  }, []);

  const handleExerciseNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExerciseName(e.target.value);
  };

  const handleRemoveExercise = () => {
    dispatch(removeExercise(exerciseId));
    dispatch(removeExerciseName(exerciseId));
    const element = document.getElementById(exerciseId);
    element?.remove();
  };
  return (
    <>
      {workoutData?.exercises.map((exerxise) => (
        <Container id={exerxise._id} className="exercise-con">
          <div className="exercise-div mt-5">
            <Row>
              <input
                type="text"
                list="data"
                placeholder="Exercise Name"
                className="w-placeholder ex-name w-100"
                value={exerxise.name}
                onChange={handleExerciseNameChange}
                onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.target.value !== "") {
                    e.target.readOnly = true;
                  }
                  e.target.id = e.target.value
                    .replace(/\s+/g, "-")
                    .toLowerCase();

                  dispatch(getExercise(exerciseName));
                }}
              />

              <datalist id="data" className="datalist-style">
                {allNames.map((item, key) => (
                  <option key={key} value={item} />
                ))}
              </datalist>
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
                  value={exerxise.target}
                />
              </Col>
              <Col>
                <Image src={exerxise.gifUrl} alt="" className="exercise-gif" />
              </Col>
            </Row>
            <Row>
              <Button
                variant="danger"
                onClick={handleRemoveExercise}
                className="remove-ex-btn trash-icon"
              >
                <Trash size={20}></Trash>
              </Button>
            </Row>
          </div>
          {setsComponents}

          <Row>
            <span
              className="mb-4 orange-btn mr-auto d-flex align-items-center"
              onClick={() => {
                setSetsCount(setsCount + 1);
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

export default Exercise;
