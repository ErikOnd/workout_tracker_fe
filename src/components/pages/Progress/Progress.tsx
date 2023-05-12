import React, { useEffect, useState } from "react";
import "./Progress.css";
import Header from "../../layout/Header";
import { Col, Container, Row } from "react-bootstrap";
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

interface Exercise {
  _id: string;
  name: string;
}

interface ProgressItem {
  _id: string;
  user_id: string;
  exercise_id: Exercise;
  weight_lifted: number;
  createdAt: string;
  __v: number;
}

interface GroupedProgressData {
  [exerciseId: string]: ProgressItem[];
}

const Progress = () => {
  const [progressData, setProgressData] = useState<GroupedProgressData>({});

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
        chartData.push({
          date: new Date(progressItem.createdAt).toLocaleDateString(),
          weight: progressItem.weight_lifted,
        });
      });
    }

    return chartData;
  };

  return (
    <Container fluid className="basic-workout-con text-center">
      <Header></Header>
      <Row className="my-5">
        <Col className="your-workouts-header">Progress</Col>
      </Row>
      <Container fluid>
        <Row>
          {Object.keys(progressData).map((exerciseId) => (
            <Col key={exerciseId}>
              <Row className="my-4 justify-content-center">
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
                    name={progressData[exerciseId][0].exercise_id.name}
                    stroke="#ff8a00"
                  />
                </LineChart>
              </Row>
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
};

export default Progress;
