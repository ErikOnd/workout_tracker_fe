import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import ExerciseSets from "./ExerciseSets";
import exercises from "../../../assets/exercises";
import getExercise from "../../../services/getExercise";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { addExercise } from "../../../redux/reducers/workoutSlice";
const exArray = exercises;
const Exercise = () => {
  const [setsCount, setSetsCount] = useState<number>(0);
  const [addSet, setAddSet] = useState<number>(0);
  const [setsComponents, setSetsComponents] = useState<React.ReactNode[]>([]);
  const [exerciseName, setExerciseName] = useState("");
  const [muscleGroups, setMuscleGroups] = useState("Focused Muscle groups");
  const [exerciseId, setExerciseId] = useState("");
  console.log(exerciseId);

  const workoutData = useSelector((state: RootState) => state.workout.data);
  const dispatch = useDispatch();
  console.log(workoutData);
  useEffect(() => {
    if (!isNaN(setsCount)) {
      const components = [];
      for (let i = 0; i < setsCount; i++) {
        components.push(
          <ExerciseSets
            key={i}
            exerciseId={exerciseId}
            setNumber={i}
            addSet={addSet}
          />
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
    }
  }, [exerciseId]);

  const handleExerciseNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExerciseName(e.target.value);
  };
  return (
    <Container>
      <div className="exercise-div mt-5">
        <Row>
          <input
            type="text"
            list="data"
            placeholder="Exercise Name"
            className="w-placeholder ex-name"
            value={exerciseName}
            onChange={handleExerciseNameChange}
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {
              e.target.id = e.target.value.replace(/\s+/g, "-").toLowerCase();
              getExercise(exerciseName, setMuscleGroups, setExerciseId);
            }}
          />

          <datalist id="data" className="datalist-style">
            {exArray.map((item, key) => (
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
        </Row>
      </div>
      {setsComponents}

      <Row>
        <span
          className="my-5 orange-btn mr-auto"
          onClick={() => {
            setAddSet(addSet + 1);
            setSetsCount(setsCount + 1);
          }}
        >
          Add Set
        </span>
      </Row>
    </Container>
  );
};

export default Exercise;
