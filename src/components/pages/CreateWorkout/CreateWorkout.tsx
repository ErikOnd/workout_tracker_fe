import React, { useEffect, useState } from "react";
import "./CreateWorkout.css";
import { Container, Form, Row, Col } from "react-bootstrap";
import Header from "../../layout/Header";
import Exercise from "./Exercise";
import ExerciseTable from "./ExerciseTable";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { setWorkout } from "../../../redux/reducers/workoutSlice";
import { PlusSquareFill } from "react-bootstrap-icons";
import { useParams } from "react-router-dom";
import getWorkoutById from "../../../services/getWorkoutById";
import { PrefWorkout } from "../../../interfaces/PrefWorkout";

const CreateWorkout = () => {
  const workoutData = useSelector((state: RootState) => state.workout.data);
  const user_id = useSelector((state: RootState) => state.user.data?._id);
  const dispatch = useDispatch();
  const [exerciseCount, setExerciseCount] = useState(0);
  const [prefWorkout, setPrefWorkout] = useState<PrefWorkout>();
  const { id } = useParams();
  const workout_id: string | undefined = id;

  useEffect(() => {
    if (workout_id) {
      loadWorkoutData();
    }
    if (!workout_id) {
      dispatch(
        setWorkout({
          ...workoutData,
          user_id: user_id,
          focus: "",
          likes: 0,
          exercises: [],
        })
      );
    }
  }, []);

  useEffect(() => {
    if (prefWorkout) {
      dispatch(
        setWorkout({
          ...workoutData,
          user_id: user_id,
          workout_name: prefWorkout?.workout_name,
          focus: "",
          likes: 0,
          exercises: prefWorkout?.exercises,
        })
      );
    }
  }, [prefWorkout]);

  const loadWorkoutData = async () => {
    const workoutData = await getWorkoutById(workout_id);
    setPrefWorkout(workoutData);
  };

  console.log("Reducer Object", workoutData);

  const handleAddExercise = () => {
    setExerciseCount(exerciseCount + 1);
  };

  const handleSetWorkoutName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const workoutName = e.target.value;
    dispatch(setWorkout({ ...workoutData, workout_name: workoutName }));
  };

  const exerciseComponents = [];

  if (prefWorkout) {
    for (let i = 0; i < exerciseCount + prefWorkout.exercises.length; i++) {
      exerciseComponents.push(<Exercise key={i} exIndex={i} />);
    }
  } else {
    for (let i = 0; i < exerciseCount + 1; i++) {
      exerciseComponents.push(<Exercise key={i} exIndex={i} />);
    }
  }

  return (
    <Container fluid className="create-workout-con text-center">
      <Header></Header>
      <Row className="my-5">
        {workout_id ? (
          <Form.Control
            size="lg"
            type="text"
            placeholder="Workout Name"
            value={workoutData?.workout_name}
            className="workout-name"
            onChange={handleSetWorkoutName}
          />
        ) : (
          <Form.Control
            size="lg"
            type="text"
            placeholder="Workout Name"
            className="workout-name"
            onChange={handleSetWorkoutName}
          />
        )}
      </Row>
      <Row>
        <Col className="col-3">
          <ExerciseTable />
        </Col>
        <Col className="col-9">
          {exerciseComponents}
          <Container>
            <Row>
              <span
                className="my-4 orange-btn mr-auto add-exercise-btn d-flex align-items-center"
                onClick={handleAddExercise}
              >
                <PlusSquareFill className="mr-2" size={25}></PlusSquareFill>{" "}
                Exercise
              </span>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateWorkout;
