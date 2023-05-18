import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Image,
  Modal,
} from "react-bootstrap";
import ExerciseSets from "./ExerciseSets";
import getExercise from "../../../services/getExercise";
import { useDispatch, useSelector } from "react-redux";
import {
  addExercise,
  addSets,
  setTrackExercise,
} from "../../../redux/reducers/workoutSlice";
import { removeExercise } from "../../../redux/reducers/workoutSlice";
import { PlusSquareFill, Trash } from "react-bootstrap-icons";
import { AppDispatch, RootState } from "../../../redux/store";
import { v4 as uuid } from "uuid";
import ExerciseModal from "./ExerciseModal";
import getAllExercies from "../../../services/getAllExerciseNames";
import AllExercises from "../../../interfaces/allExercises";

const Exercise = () => {
  const [allExercises, setAllExercises] = useState<AllExercises[]>([]);
  const workoutData = useSelector((state: RootState) => state.workout.data);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [exerciseIdModal, setExerciseIdModal] = useState<string>();
  const [showModal, setShowModal] = useState(false);

  const dispatch: AppDispatch = useDispatch();

  async function fetchExerciseNames() {
    const response = await getAllExercies();
    setAllExercises(response);
  }

  useEffect(() => {
    fetchExerciseNames();
  }, []);

  const handleTrackWorkout = (exerciseId: string) => {
    dispatch(setTrackExercise({ exerciseId: exerciseId }));
  };
  const handleInputClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      {workoutData?.exercises.map((exercise, index) => (
        <Container id={exercise._id} className="exercise-con">
          <div className="exercise-div mt-5">
            <Row>
              <input
                type="text"
                list="data"
                placeholder="Exercise Name"
                className="w-placeholder ex-name w-100"
                value={exercise.name}
                onClick={() => {
                  setExerciseIdModal(workoutData.exercises[index]._id);

                  handleInputClick();
                }}
              />
            </Row>
            <Row className="pt-4 align-items-start setsAndFocus">
              <span className="text-left p-0 sets-col">Focus:</span>
              {exercise.exerciesId && (
                <span className="add-ex-track d-flex align-items-center">
                  <div
                    className={`track-exercise-btn${
                      exercise.trackExercise ? "-on" : "-off"
                    } mr-3`}
                    onClick={() => {
                      exercise._id && handleTrackWorkout(exercise._id);
                    }}
                  ></div>
                  Track Exercise
                </span>
              )}

              <Col>
                <Form.Control
                  as="textarea"
                  rows={2}
                  placeholder="Focused Muscle groups"
                  className="w-placeholder focus-area pl-0"
                  readOnly
                  value={exercise.target}
                />
              </Col>
              <Col>
                <Image src={exercise.gifUrl} alt="" className="exercise-gif" />
              </Col>
            </Row>
            <Row>
              <Button
                variant="danger"
                onClick={() => setShowModal(true)}
                className="remove-ex-btn trash-icon"
              >
                <Trash size={20}></Trash>
              </Button>
            </Row>
          </div>
          <ExerciseSets
            exerciseId={exercise._id}
            exerciseIndex={index}
          ></ExerciseSets>

          <Row>
            <span
              className="mb-4 orange-btn mr-auto d-flex align-items-center"
              onClick={() => {
                dispatch(addSets({ exerciseId: exercise._id, setId: uuid() }));
              }}
            >
              <PlusSquareFill size={15} className="mr-2"></PlusSquareFill>
              Set
            </span>
          </Row>
          <Modal
            show={showModal}
            onHide={() => setShowModal(false)}
            dialogClassName="custom-modal"
          >
            <Modal.Header closeButton>
              <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to delete this exercise?
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                className="confirm-delete"
                onClick={() => {
                  dispatch(removeExercise(exercise._id));
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
      ))}

      <ExerciseModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        allExercises={allExercises}
        exerciseIdModal={exerciseIdModal}
      />
    </>
  );
};

export default Exercise;
