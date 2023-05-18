import React, { useEffect, useState } from "react";
import "./CreateWorkout.css";
import { Container, Form, Row, Col, Modal, Button } from "react-bootstrap";
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
import { useParams, useNavigate } from "react-router-dom";
import getWorkoutById from "../../../services/getWorkoutById";
import ObjectId from "bson-objectid";

const CreateWorkout = () => {
  const workoutData = useSelector((state: RootState) => state.workout.data);
  const user_id = useSelector((state: RootState) => state.user.data?._id);
  const dispatch: AppDispatch = useDispatch();
  const { workout_id } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
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

  useEffect(() => {
    if (workout_id) {
      dispatch(getWorkoutById(workout_id));
    }
  }, [workout_id]);

  useEffect(() => {
    const isMobile = window.innerWidth <= 768; // Adjust the value to your desired breakpoint
    if (isMobile) {
      setShowModal(true);
    }
  }, []);

  const handleSetWorkoutName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const workoutName = e.target.value;
    dispatch(setWorkout({ ...workoutData, workout_name: workoutName }));
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate(-1);
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
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Page Not Optimized for Smartphones</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            This page is not optimized for smartphones. For the best user
            experience, please visit this page on a larger screen.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default CreateWorkout;
