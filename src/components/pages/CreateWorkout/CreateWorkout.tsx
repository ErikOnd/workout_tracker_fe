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
import ReconstructWorkout from "./ReconstructWorkout";
import { useParams } from "react-router-dom";

const CreateWorkout = () => {
  const workoutData = useSelector((state: RootState) => state.workout.data);
  const user_id = useSelector((state: RootState) => state.user.data?._id);
  const dispatch = useDispatch();
  const [exerciseCount, setExerciseCount] = useState(1);
  const { id } = useParams();
  const workout_id = id;

  useEffect(() => {
    dispatch(
      setWorkout({
        ...workoutData,
        user_id: user_id,
        focus: "",
        likes: 0,
        exercises: [],
      })
    );
  }, []);

  const handleAddExercise = () => {
    setExerciseCount(exerciseCount + 1);
  };

  const handleSetWorkoutName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const workoutName = e.target.value;
    dispatch(setWorkout({ ...workoutData, workout_name: workoutName }));
  };

  const exerciseComponents = [];

  for (let i = 0; i < exerciseCount; i++) {
    exerciseComponents.push(<Exercise key={i} />);
  }

  return (
    <Container fluid className="create-workout-con text-center">
      <Header></Header>
      <Row className="my-5">
        <Form.Control
          size="lg"
          type="text"
          placeholder="Workout Name"
          className="workout-name"
          onChange={handleSetWorkoutName}
        />
      </Row>
      <Row>
        <Col className="col-3">
          <ExerciseTable />
        </Col>
        <Col className="col-9">
          {workout_id && (
            <ReconstructWorkout workout_id={workout_id}></ReconstructWorkout>
          )}{" "}
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
