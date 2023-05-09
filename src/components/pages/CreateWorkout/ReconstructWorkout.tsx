import React, { useEffect, useState } from "react";
import getWorkoutById from "../../../services/getWorkoutById";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { PlusSquareFill, Trash } from "react-bootstrap-icons";
import PrefWorkout from "../../../interfaces/PrefWorkout";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import {
  addPrefSets,
  addSets,
  addSetsAndClear,
  removePrefExercise,
  removePrefSet,
  setWorkout,
} from "../../../redux/reducers/workoutSlice";
import { removeExerciseName } from "../../../redux/reducers/exerciseListSlice";
import { v4 as uuidv4 } from "uuid";

const ReconstructWorkout = ({ workout_id }: { workout_id: string }) => {
  const workoutData = useSelector((state: RootState) => state.workout.data);
  const [prefWorkout, setPrefWorkout] = useState<any>();
  const [exRep, setexRep] = useState<string>("");
  const [exWeight, setExWeight] = useState<number>(0);
  const [readOnly, setReadOnly] = useState(false);
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
    const updatedExercises = prefWorkout?.exercises.filter(
      (exercise: any) => exercise._id !== exerciseId
    );
    setPrefWorkout((prevState: any) => ({
      ...prevState,
      exercises: updatedExercises,
    }));
  };

  const handleRemoveSet = (exerciseId: string, setId: string | undefined) => {
    dispatch(removePrefSet({ exerciseId: exerciseId, setId: setId }));
    const updatedExercises = prefWorkout?.exercises.map((exercise: any) => {
      if (exercise._id === exerciseId) {
        const updatedSets = exercise.sets.filter(
          (set: any) => set._id !== setId
        );
        return {
          ...exercise,
          sets: updatedSets,
        };
      }
      return exercise;
    });
    setPrefWorkout((prevState: any) => ({
      ...prevState,
      exercises: updatedExercises,
    }));
  };

  const handleAddSet = (exerciseId: string) => {
    dispatch(addPrefSets({ exerciseId: exerciseId, set: {} }));
  };

  const addSet = (exerciseId: string) => {
    if (exRep !== "" && exWeight !== 0) {
      const newSet = {
        repetitions: parseInt(exRep),
        weight_lifted: exWeight,
        set_id: uuidv4(),
      };
      dispatch(addSetsAndClear({ exerciseId: exerciseId, set: newSet }));
    }
  };

  const handleBlur = (exerciseId: string) => {
    if (exRep !== "" && exWeight !== 0) {
      setReadOnly(true);
      addSet(exerciseId);
    } else {
      setReadOnly(false);
    }
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
                      onChange={(e) => setexRep(e.target.value)}
                      onBlur={() => {
                        if (!readOnly) {
                          handleBlur(exercise._id);
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
                      value={set.weight_lifted}
                      onChange={(e) => setExWeight(parseFloat(e.target.value))}
                      onBlur={() => {
                        if (!readOnly) {
                          handleBlur(exercise._id);
                        }
                      }}
                      readOnly={readOnly}
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
            <span
              className="mb-4 orange-btn mr-auto d-flex align-items-center"
              onClick={() => {
                handleAddSet(exercise._id);
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
