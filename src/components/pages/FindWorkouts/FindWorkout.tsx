import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row, Table } from "react-bootstrap";
import Header from "../../layout/Header";
import "./FindWorkout.css";
import { HeartFill, Search } from "react-bootstrap-icons";
import getPublicWorkouts from "../../../services/getPublicWorkouts";
import { Heart } from "react-bootstrap-icons";
import exercises from "../../../assets/exercises";
import FindWorkoutInterface from "../../../interfaces/FindWorkoutInterface";
import { useNavigate } from "react-router-dom";
import addWorkoutLike from "../../../services/addWorkoutLike";
import getPublicWorkoutsFiltered from "../../../services/getPublicWorkoutsFiltered";

const FindWorkout = () => {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [publicWorkouts, setPublicWorkouts] = useState<FindWorkoutInterface[]>(
    []
  );
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await getPublicWorkouts();
    setPublicWorkouts(res);
  };

  const getfilteredData = async () => {
    const res = await getPublicWorkoutsFiltered(searchTerm);
    console.log("filtered workouts", res);
    setPublicWorkouts(res);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      console.log("fire search");
      getfilteredData();
    }
  };

  const getTargetMuscle = (workout: FindWorkoutInterface) => {
    let targetArr: (string | undefined)[] = [];

    workout.exercises.map((exercise) => targetArr.push(exercise.target));

    return targetArr.join(", ");
  };

  const handleLikeWorkout = async (workout_id: string) => {
    await addWorkoutLike(workout_id);
    getData();
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
                onKeyPress={handleKeyPress}
                className="filter-exercise-progress mb-5"
              />
            </Form.Group>
          </Col>
        </Row>
        <div className="find-workout-table-div pb-5">
          <Table hover className="your-w-table text-left">
            <thead>
              <tr>
                <th>Workout Name</th>
                <th>Target</th>
                <th>Likes</th>
                <th>Created By</th>
              </tr>
            </thead>
            <tbody>
              {publicWorkouts.map((workout) => (
                <tr>
                  <td
                    className="find-workout-name"
                    onClick={() => {
                      navigate(`/create-workout/${workout._id}/import`);
                    }}
                  >
                    {workout.workout_name}
                  </td>
                  <td>{getTargetMuscle(workout)}</td>
                  <td>
                    {workout.likes ? workout.likes.length : 0}
                    {userId && workout.likes.includes(userId) ? (
                      <HeartFill
                        className="ml-2 like-workout"
                        size={25}
                        onClick={() => {
                          handleLikeWorkout(workout._id);
                        }}
                      ></HeartFill>
                    ) : (
                      <Heart
                        className="ml-2 like-workout"
                        size={25}
                        onClick={() => {
                          handleLikeWorkout(workout._id);
                        }}
                      ></Heart>
                    )}
                  </td>
                  <td>{workout.user_id.username}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </Container>
  );
};

export default FindWorkout;
