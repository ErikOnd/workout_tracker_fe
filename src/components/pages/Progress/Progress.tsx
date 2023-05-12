import React, { useEffect, useState } from "react";
import "./Progress.css";
import Header from "../../layout/Header";
import { Col, Container, Form, Row } from "react-bootstrap";
import getProgressData from "../../../services/getProgressData";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import ProgressItem from "../../../interfaces/ExerciseProgress";
import GroupedProgressData from "../../../interfaces/GroupedProgressData";

const Progress = () => {
  const [progressData, setProgressData] = useState<GroupedProgressData>({});
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const data: ProgressItem[] = await getProgressData();
    const groupedData = groupByExerciseId(data);
    setProgressData(groupedData);
  };

  const groupByExerciseId = (data: ProgressItem[]): GroupedProgressData => {
    const groupedData: GroupedProgressData = {};
    data.forEach((item) => {
      const exerciseId = item.exercise_id._id;
      if (!groupedData[exerciseId]) {
        groupedData[exerciseId] = [];
      }
      groupedData[exerciseId].push(item);
    });
    return groupedData;
  };

  const formatDataForChart = (exerciseId: string) => {
    const chartData: { date: string; weight: number }[] = [];

    const progressItems = progressData[exerciseId];
    if (progressItems) {
      progressItems.forEach((progressItem) => {
        const date = new Date(progressItem.createdAt);
        const formattedDate = `${date.getDate()}/${
          date.getMonth() + 1
        }/${date.getFullYear()}`;
        chartData.push({
          date: formattedDate,
          weight: progressItem.weight_lifted,
        });
      });
    }

    return chartData;
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredExercises = Object.values(progressData).filter(
    (progressItems) => {
      const exerciseName = progressItems[0].exercise_id.name.toLowerCase();
      return exerciseName.includes(searchTerm.toLowerCase());
    }
  );

  return (
    <Container fluid className="basic-workout-con text-center">
      <Header></Header>
      <Row className="my-5">
        <Col className="your-workouts-header">Progress</Col>
      </Row>
      <Container fluid>
        <Row>
          <Col>
            <Form.Group className="d-flex justify-content-center mb-5">
              <Form.Control
                type="text"
                placeholder="Search exercises"
                value={searchTerm}
                onChange={handleSearch}
                className="filter-exercise-progress"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          {filteredExercises.map((progressItems) => {
            const exerciseId = progressItems[0].exercise_id._id;
            return (
              <Col
                key={exerciseId}
                className="d-flex justify-content-center mb-5"
              >
                <LineChart
                  width={400}
                  height={300}
                  data={formatDataForChart(exerciseId)}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="weight"
                    stroke="#FF8A00"
                    name={progressItems[0].exercise_id.name}
                  />
                </LineChart>
              </Col>
            );
          })}
        </Row>
      </Container>
    </Container>
  );
};

export default Progress;
