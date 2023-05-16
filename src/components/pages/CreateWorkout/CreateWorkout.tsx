import React, { useEffect } from "react";
import "./CreateWorkout.css";
import { Container, Form, Row, Col } from "react-bootstrap";
import Header from "../../layout/Header";
import Exercise from "./Exercise";
import ExerciseTable from "./ExerciseTable";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import {
  addEmptyExercise,
  setWorkout,
} from "../../../redux/reducers/workoutSlice";
import { PlusSquareFill } from "react-bootstrap-icons";
import { useParams } from "react-router-dom";
import getWorkoutById from "../../../services/getWorkoutById";
import ObjectId from "bson-objectid";
const CreateWorkout = () => {
  const workoutData = useSelector((state: RootState) => state.workout.data);
  const user_id = useSelector((state: RootState) => state.user.data?._id);
  const dispatch: AppDispatch = useDispatch();
  const { workout_id } = useParams();
  useEffect(() => {
    console.log("workout page");
    if (workout_id) {
      dispatch(
        setWorkout({
          ...workoutData,
          user_id: user_id,
          focus: "",
          likes: [],
          exercises: [],
        })
      );
    } else {
      dispatch(
        setWorkout({
          user_id: user_id,
          focus: "",
          likes: [],
          exercises: [],
        })
      );
    }
  }, []);

  console.log(workoutData);

  useEffect(() => {
    if (workout_id) {
      dispatch(getWorkoutById(workout_id));
    }
  }, [workout_id]);

  const handleSetWorkoutName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const workoutName = e.target.value;
    dispatch(setWorkout({ ...workoutData, workout_name: workoutName }));
  };

  return (
    <Container fluid className="basic-workout-con text-center">
      <Header></Header>
      <Row className="my-5">
        <Form.Control
          size="lg"
          type="text"
          placeholder="Workout Name"
          className="workout-name"
          onChange={handleSetWorkoutName}
          value={workout_id && workoutData?.workout_name}
        />
      </Row>
      <Row>
        <Col className="col-3">
          <ExerciseTable />
        </Col>
        <Col className="col-9">
          <Exercise></Exercise>
          <Container>
            <Row>
              <span
                className="my-5 orange-btn mr-auto add-exercise-btn d-flex align-items-center"
                onClick={() => {
                  dispatch(addEmptyExercise({ id_: new ObjectId() }));
                }}
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
