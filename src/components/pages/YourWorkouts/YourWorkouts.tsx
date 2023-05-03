import React, { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import "./YourWorkouts.css";
import getWorkouts from "../../../services/getWorkouts";
import Header from "../../layout/Header";
import { WorkoutList } from "../../../interfaces/WorkoutList";

const YourWorkouts = () => {
  const [workouts, setWorkouts] = useState<WorkoutList | null>(null);
  console.log(workouts);
  useEffect(() => {
    async function fetchWorkouts() {
      const workoutList = await getWorkouts();
      setWorkouts(workoutList);
    }

    fetchWorkouts();
  }, []);

  return (
    <Container fluid className="your-workout-con  text-center">
      <Header></Header>
      <Row className="my-5">
        <Col className="your-workouts-header">Your Workouts</Col>
      </Row>
      <Container>
        {}
        <Table striped bordered hover className="your-w-table">
          <thead>
            <tr>
              <th>Exercise</th>
              <th>Sets</th>
              <th>Target</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </Container>
  );
};

export default YourWorkouts;
