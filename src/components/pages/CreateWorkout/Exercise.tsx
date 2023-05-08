import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import ExerciseSets from "./ExerciseSets";
import getExercise from "../../../services/getExercise";
import { useDispatch } from "react-redux";
import { addExercise } from "../../../redux/reducers/workoutSlice";
import { removeExercise } from "../../../redux/reducers/workoutSlice";
import { PlusSquareFill, Trash } from "react-bootstrap-icons";
import { addExerciseName } from "../../../redux/reducers/exerciseListSlice";
import { removeExerciseName } from "../../../redux/reducers/exerciseListSlice";
import getAllExerciseNames from "../../../services/getAllExerciseNames";
const Exercise = () => {
  type ExerciseName = string;

  const [setsCount, setSetsCount] = useState<number>(0);
  const [setsComponents, setSetsComponents] = useState<React.ReactNode[]>([]);
  const [exerciseName, setExerciseName] = useState("");
  const [allNames, setAllNames] = useState<ExerciseName[]>([]);
  const [muscleGroups, setMuscleGroups] = useState("Focused Muscle groups");
  const [gifLink, setGifLink] = useState("");
  const [exerciseId, setExerciseId] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    if (!isNaN(setsCount)) {
      const components = [];
      for (let i = 0; i < setsCount; i++) {
        components.push(
          <ExerciseSets key={i} exerciseId={exerciseId} setNumber={i} />
        );
      }
      setSetsComponents(components);
    } else {
      setSetsComponents([]);
    }
  }, [setsCount]);

  useEffect(() => {
    if (exerciseId) {
      dispatch(
        addExercise({
          exercise_id: exerciseId,
          sets: [],
        })
      );
      dispatch(
        addExerciseName({
          exerciseId,
          exerciseName,
        })
      );
      //next dispatch
    }
  }, [exerciseId]);

  async function fetchExerciseNames() {
    const response = await getAllExerciseNames();
    setAllNames(response);
  }

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
    <Container id={exerciseId} className="exercise-con">
      <div className="exercise-div mt-5">
        <Row>
          <input
            type="text"
            list="data"
            placeholder="Exercise Name"
            className="w-placeholder ex-name w-100"
            value={exerciseName}
            onChange={handleExerciseNameChange}
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {
              //Set to read only to prevent bugs
              if (e.target.value !== "") {
                e.target.readOnly = true;
              }
              e.target.id = e.target.value.replace(/\s+/g, "-").toLowerCase();
              getExercise(
                exerciseName,
                setMuscleGroups,
                setExerciseId,
                setGifLink
              );
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
              value={muscleGroups}
            />
          </Col>
          <Col>
            <Image src={gifLink} alt="" className="exercise-gif" />
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
  );
};

export default Exercise;
