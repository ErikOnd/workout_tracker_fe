import React, { useEffect, useState } from "react";
import "./Progress.css";
import Header from "../../layout/Header";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
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
import deleteTrack from "../../../services/deleteTrack";
import deleteChart from "../../../services/deleteChart";

const Progress = () => {
  const [progressData, setProgressData] = useState<GroupedProgressData>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);

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

  const handleRemoveLastTrack = async (trackId: string) => {
    await deleteTrack(trackId);
    getData();
  };

  const handleRemoveAllTracks = async (exerciseId: string) => {
    await deleteChart(exerciseId);
    getData();
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
                className="filter-exercise-progress mb-5"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-center">
          {filteredExercises.map((progressItems, index) => {
            const exerciseId = progressItems[0].exercise_id._id;
            return (
              <Row className="chart-holder-row">
                <Col
                  key={exerciseId}
                  className="d-flex justify-content-center mb-5 mx-5"
                >
                  <LineChart
                    width={600}
                    height={400}
                    data={formatDataForChart(exerciseId)}
                    margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis
                      tick={{ fontSize: 12 }}
                      domain={[
                        (dataMin: number) =>
                          dataMin > 0 ? dataMin - 1 : dataMin,
                        (dataMax: number) => dataMax + 1,
                      ]}
                    />
                    <Tooltip
                      contentStyle={{ fontSize: 12 }}
                      formatter={(value) => `${value} kg`}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="weight"
                      stroke="#FF8A00"
                      strokeWidth={2}
                      dot={{ stroke: "#FF8A00", fill: "#FF8A00", r: 3 }}
                      activeDot={{ stroke: "#FF8A00", fill: "#FF8A00", r: 6 }}
                      name={progressItems[0].exercise_id.name}
                    />
                  </LineChart>
                </Col>
                <Col>
                  <ButtonGroup vertical className="btn-group-progress">
                    <Button
                      className="y-w-btn remove-last-pr"
                      variant="warning"
                      onClick={() => {
                        console.log(progressItems);
                        const lastIndex = progressData[exerciseId].length;
                        const trackId =
                          progressData[exerciseId][lastIndex - 1]._id;

                        handleRemoveLastTrack(trackId);
                      }}
                      style={{ minHeight: "60px" }}
                    >
                      Remove Last
                    </Button>
                    <Button
                      className="y-w-btn"
                      variant="danger"
                      onClick={() => setShowModal(true)}
                      style={{ minHeight: "60px" }}
                    >
                      Remove All
                    </Button>
                  </ButtonGroup>
                </Col>
                <Modal
                  show={showModal}
                  onHide={() => setShowModal(false)}
                  dialogClassName="custom-modal"
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Are you sure you want to delete every every track for this
                    exercise?
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      className="confirm-delete"
                      onClick={() => {
                        handleRemoveAllTracks(exerciseId);
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
              </Row>
            );
          })}
        </Row>
      </Container>
    </Container>
  );
};

export default Progress;
