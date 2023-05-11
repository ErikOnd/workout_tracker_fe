import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Col,
  Collapse,
  Container,
  Row,
  Table,
} from "react-bootstrap";
import "./YourWorkouts.css";
import getWorkouts from "../../../services/getWorkouts";
import Header from "../../layout/Header";
import { Exercise, WorkoutList } from "../../../interfaces/WorkoutList";
import { PencilSquare, Trash } from "react-bootstrap-icons";
import deleteWorkout from "../../../services/deleteWorkout";
import { useNavigate } from "react-router-dom";
import WorkoutData from "../../../interfaces/WorkoutData";

const YourWorkouts = () => {
  const [workouts, setWorkouts] = useState<WorkoutData[]>();
  const navigate = useNavigate();
  useEffect(() => {
    fetchWorkouts();
  }, []);

  async function fetchWorkouts() {
    const workoutList = await getWorkouts();
    setWorkouts(workoutList);
  }
  console.log("your workouts:", workouts);

  const [openRowId, setOpenRowId] = useState(null);

  const handleRowClick = (rowId: any) => {
    setOpenRowId(rowId === openRowId ? null : rowId);
  };

  return (
    <Container fluid className="your-workout-con  text-center">
      <Header></Header>
      <Row className="my-5">
        <Col className="your-workouts-header">Your Workouts</Col>
      </Row>
      <Container>
        {workouts?.map((workout) => (
          <div className="tableAndBtn">
            <h2 className="your-w-header">{workout.workout_name}</h2>
            <Table hover className="your-w-table text-left mb-5">
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
            <ButtonGroup vertical>
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
                  if (workout._id) {
                    deleteWorkout(workout._id);
                    fetchWorkouts();
                  }
                }}
              >
                <Trash size={25}></Trash>
              </Button>
            </ButtonGroup>
          </div>
        ))}
      </Container>
    </Container>
  );
};

export default YourWorkouts;
