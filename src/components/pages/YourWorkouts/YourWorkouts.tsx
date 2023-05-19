import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Col,
  Collapse,
  Container,
  Image,
  Modal,
  OverlayTrigger,
  Row,
  Table,
  Tooltip,
} from "react-bootstrap";
import "./YourWorkouts.css";
import getWorkouts from "../../../services/getWorkouts";
import Header from "../../layout/Header";
import { PencilSquare, PeopleFill, Trash } from "react-bootstrap-icons";
import deleteWorkout from "../../../services/deleteWorkout";
import { useNavigate } from "react-router-dom";
import WorkoutData from "../../../interfaces/WorkoutData";
import updateVisibility from "../../../services/updateVisibility";
import ObjectId from "bson-objectid";

const YourWorkouts = () => {
  const [workouts, setWorkouts] = useState<WorkoutData[]>();
  const [showModal, setShowModal] = useState(false);
  const [workout_id, setWorkout_id] = useState<ObjectId>();
  const navigate = useNavigate();
  useEffect(() => {
    fetchWorkouts();
  }, []);

  async function fetchWorkouts() {
    const workoutList = await getWorkouts();
    setWorkouts(workoutList);
  }

  const [openRowId, setOpenRowId] = useState(null);

  const handleRowClick = (rowId: any) => {
    setOpenRowId(rowId === openRowId ? null : rowId);
  };

  const handleVisibility = async (workoutId: ObjectId | undefined) => {
    await updateVisibility(workoutId);
    fetchWorkouts();
  };

  return (
    <Container fluid className="your-workout-con  text-center">
      <Header></Header>
      <Row className="my-5">
        <Col className="your-workouts-header">Your Workouts</Col>
      </Row>
      <Container>
        {workouts !== undefined && workouts.length === 0 && (
          <>
            <Row>
              <Col>
                You don't have any workouts yet, let's start by creating one
              </Col>
            </Row>
            <Row className="mt-5">
              <Col>
                <Image
                  fluid
                  src="https://res.cloudinary.com/dyy38u8x7/image/upload/v1684511278/Screenshot_2023-05-19_at_17.47.40_v5nqli.png"
                  className="img-helper"
                ></Image>
              </Col>
            </Row>
          </>
        )}
        {workouts?.map((workout) => (
          <div className="tableAndBtn">
            <h2 className="your-w-header">{workout.workout_name}</h2>
            <Table hover className="your-w-table text-left">
              <thead>
                <tr>
                  <th>Exercise</th>
                  <th>Sets</th>
                  <th>Target</th>
                </tr>
              </thead>
              <tbody>
                {workout.exercises.map((exercise) => (
                  <React.Fragment key={exercise._id}>
                    <tr
                      className="parent-row"
                      onClick={() => handleRowClick(exercise._id)}
                    >
                      <td>{exercise.name}</td>
                      <td>{exercise.sets?.length}</td>
                      <td>{exercise.target}</td>
                    </tr>

                    {exercise.sets?.map((set, index: number) => (
                      <Collapse in={exercise._id === openRowId}>
                        <tr key={index}>
                          <td className="collapse-row">
                            {"Set " + (index + 1)}
                          </td>
                          <td className="collapse-row">
                            {"Reps: " + set.repetitions}
                          </td>
                          <td className="collapse-row">
                            {"Weight: " + set.weight_lifted + "kg"}
                          </td>
                        </tr>
                      </Collapse>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </Table>
            <Row className="mb-5">
              <Button
                className={
                  workout.public ? "y-w-btn public-btn" : "y-w-btn-off"
                }
                variant="secondary"
                onClick={() => {
                  handleVisibility(workout._id);
                }}
              >
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id="tooltip">
                      {workout.public
                        ? "Workout is public"
                        : "Workout is currently private"}
                    </Tooltip>
                  }
                >
                  <div>
                    <PeopleFill size={25}></PeopleFill>
                  </div>
                </OverlayTrigger>
              </Button>
              <Button
                className="y-w-btn"
                variant="warning"
                onClick={() => {
                  navigate(`/create-workout/${workout._id}`);
                }}
              >
                <PencilSquare size={25}></PencilSquare>
              </Button>
              <Button
                className="y-w-btn"
                variant="danger"
                onClick={() => {
                  setShowModal(true);
                  setWorkout_id(workout._id);
                }}
              >
                <Trash size={25}></Trash>
              </Button>
            </Row>
          </div>
        ))}
        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          dialogClassName="custom-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirm Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this workout?</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              className="confirm-delete"
              onClick={async () => {
                if (workout_id) {
                  await deleteWorkout(workout_id);
                  fetchWorkouts();
                }
                setShowModal(false);
              }}
            >
              Confirm
            </Button>
            <span
              className="orange-btn modal-text"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </span>
          </Modal.Footer>
        </Modal>
      </Container>
    </Container>
  );
};

export default YourWorkouts;
