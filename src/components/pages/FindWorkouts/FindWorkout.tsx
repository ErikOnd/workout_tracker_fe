import React, { useState } from "react";
import { Col, Container, Form, Row, Table } from "react-bootstrap";
import Header from "../../layout/Header";
import "./FindWorkout.css";
import { Search } from "react-bootstrap-icons";

const FindWorkout = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Container fluid className="basic-workout-con text-center">
      <Header></Header>
      <Row className="my-5">
        <Col className="your-workouts-header">Find Workouts</Col>
      </Row>
      <Container>
        <Row>
          <Col>
            <Form.Group className="d-flex justify-content-center mb-5">
              <Form.Control
                type="text"
                placeholder="Search workouts"
                value={searchTerm}
                onChange={handleSearch}
                className="filter-exercise-progress mb-5"
              />
            </Form.Group>
          </Col>
        </Row>
        <div className="find-workout-table-div">
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Workout Name</th>
                <th>Target</th>
                <th>Likes</th>
                <th>Created By</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Upper Body</td>
                <td>Arms, Chest, Lower Back</td>
                <td>90</td>
                <td>David Anderson</td>
              </tr>
              <tr>
                <td>Upper Body</td>
                <td>Arms, Chest, Lower Back</td>
                <td>90</td>
                <td>David Anderson</td>
              </tr>
              <tr>
                <td>Upper Body</td>
                <td>Arms, Chest, Lower Back</td>
                <td>90</td>
                <td>David Anderson</td>
              </tr>
              <tr>
                <td>Upper Body</td>
                <td>Arms, Chest, Lower Back</td>
                <td>90</td>
                <td>David Anderson</td>
              </tr>
              <tr>
                <td>Upper Body</td>
                <td>Arms, Chest, Lower Back</td>
                <td>90</td>
                <td>David Anderson</td>
              </tr>
              <tr>
                <td>Upper Body</td>
                <td>Arms, Chest, Lower Back</td>
                <td>90</td>
                <td>David Anderson</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </Container>
    </Container>
  );
};

export default FindWorkout;
