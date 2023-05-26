import React, { useEffect, useRef, useState } from "react";
import { Button, Modal, Row, Col, Form, Image } from "react-bootstrap";
import AllExercises from "../../../interfaces/allExercises";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { addExercise } from "../../../redux/reducers/workoutSlice";
import {
  ArrowLeftSquareFill,
  ArrowRightSquareFill,
} from "react-bootstrap-icons";

interface ExerciseModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  allExercises: AllExercises[];
  exerciseIdModal: string | undefined;
}

const ExerciseModal = ({
  isModalOpen,
  setIsModalOpen,
  allExercises,
  exerciseIdModal,
}: ExerciseModalProps) => {
  useEffect(() => {
    setSearchTerm("");
    setSelectedBodyPart("");
    setSelectedTarget("");
    setCurrentPage(1);
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBodyPart, setSelectedBodyPart] = useState("");
  const [selectedTarget, setSelectedTarget] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const exercisesPerPage = 48;

  const scrollRef = useRef<HTMLDivElement>(null);

  const dispatch: AppDispatch = useDispatch();

  // Filter exercises based on search term, body part, and target
  const filteredExercises = allExercises.filter((exercise) => {
    const nameMatch =
      exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exercise.bodyPart.toLowerCase().includes(searchTerm.toLowerCase());
    const bodyPartMatch =
      selectedBodyPart === "" || exercise.bodyPart === selectedBodyPart;
    const targetMatch =
      selectedTarget === "" || exercise.target === selectedTarget;
    return nameMatch && bodyPartMatch && targetMatch;
  });

  // Pagination
  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = filteredExercises.slice(
    indexOfFirstExercise,
    indexOfLastExercise
  );

  const clearSearchData = () => {
    setSearchTerm("");
    setSelectedBodyPart("");
    setSelectedTarget("");
    setCurrentPage(1);
  };

  const handleBodyPartChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBodyPart(e.target.value);
  };

  const handleTargetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTarget(e.target.value);
  };

  const handlePageChange = (pageNumber: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
    setCurrentPage(pageNumber);
  };

  const pageNumbers = Math.ceil(filteredExercises.length / exercisesPerPage);

  return (
    <Modal
      show={isModalOpen}
      onHide={() => {
        setIsModalOpen(false);
        clearSearchData();
      }}
      size="xl"
    >
      <Modal.Body>
        <Row className="align-items-center my-3">
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="text"
                placeholder="Search exercises..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Control as="select" onChange={handleBodyPartChange}>
                <option value="">Body Part</option>

                <option value="back">Back</option>
                <option value="cardio">Cardio</option>
                <option value="chest">Chest</option>
                <option value="lower arms">Lower Arms</option>
                <option value="lower legs">Lower Legs</option>
                <option value="neck">Neck</option>
                <option value="shoulders">Shoulders</option>
                <option value="upper arms">Upper Arms</option>
                <option value="upper legs">Upper Legs</option>
                <option value="waist">Waist</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="pr-3">
              <Form.Control as="select" onChange={handleTargetChange}>
                <option value="">Target Muscle</option>
                <option value="abductors">Abductors</option>
                <option value="abs">Abs</option>
                <option value="adductors">Adductors</option>
                <option value="biceps">Biceps</option>
                <option value="calves">Calves</option>
                <option value="cardiovascular system">
                  Cardiovascular System
                </option>
                <option value="delts">Delts</option>
                <option value="forearms">Forearms</option>
                <option value="glutes">Glutes</option>
                <option value="hamstrings">Hamstrings</option>
                <option value="lats">Lats</option>
                <option value="levator scapulae">Levator Scapulae</option>
                <option value="pectorals">Pectorals</option>
                <option value="quads">Quads</option>
                <option value="serratus anterior">Serratus Anterior</option>
                <option value="spine">Spine</option>
                <option value="traps">Traps</option>
                <option value="triceps">Triceps</option>
                <option value="upper back">Upper Back</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <div
          ref={scrollRef}
          style={{ maxHeight: "500px", overflowY: "scroll" }}
        >
          <Row xs={1} md={2} xl={4}>
            {currentExercises.map((exercise) => (
              <Col key={exercise._id} className="modal-ex-col">
                <Row>
                  <Image
                    className="modal-ex-img"
                    src={exercise.gifUrl}
                    alt={exercise.name}
                    onClick={() => {
                      setIsModalOpen(false);

                      dispatch(
                        addExercise({
                          _id: exerciseIdModal,
                          name: exercise.name,
                          gifUrl: exercise.gifUrl,
                          target: exercise.target,
                          exerciesId: exercise._id,
                          sets: [],
                        })
                      );
                    }}
                  />
                </Row>
                <Row className="justify-content-center">
                  <span className="ex-name-span">{exercise.name}</span>
                </Row>
              </Col>
            ))}
          </Row>
        </div>
        <div className="pagination">
          <Row className="pagination-row">
            {currentPage > 1 && (
              <span
                className="pagination-btn"
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <ArrowLeftSquareFill size={25}></ArrowLeftSquareFill>
              </span>
            )}
            {currentPage < pageNumbers && (
              <span
                className="pagination-btn"
                onClick={() => handlePageChange(currentPage + 1)}
              >
                <ArrowRightSquareFill size={25}></ArrowRightSquareFill>
              </span>
            )}
          </Row>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Row>
          <Button
            variant="secondary"
            onClick={() => setIsModalOpen(false)}
            className="close-btn-ex-model"
          >
            Close
          </Button>
        </Row>
      </Modal.Footer>
    </Modal>
  );
};

export default ExerciseModal;
