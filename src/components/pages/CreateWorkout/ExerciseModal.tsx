import React, { useState } from "react";
import { Button, Modal, Row, Col, Form, Image } from "react-bootstrap";
import AllExercises from "../../../interfaces/allExercises";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { addExercise } from "../../../redux/reducers/workoutSlice";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBodyPart, setSelectedBodyPart] = useState("");
  const [selectedTarget, setSelectedTarget] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const exercisesPerPage = 100;

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

  const handleBodyPartChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBodyPart(e.target.value);
  };

  const handleTargetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTarget(e.target.value);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const pageNumbers = Math.ceil(filteredExercises.length / exercisesPerPage);

  return (
    <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)} size="xl">
      <Modal.Body>
        <Form.Group>
          <Form.Label>Filter by Body Part:</Form.Label>
          <Form.Control as="select" onChange={handleBodyPartChange}>
            <option value="">All</option>

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
        <Form.Group>
          <Form.Label>Filter by Target:</Form.Label>
          <Form.Control as="select" onChange={handleTargetChange}>
            <option value="">All</option>
            <option value="abductors">Abductors</option>
            <option value="abs">Abs</option>
            <option value="adductors">Adductors</option>
            <option value="biceps">Biceps</option>
            <option value="calves">Calves</option>
            <option value="cardiovascular system">Cardiovascular System</option>
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
        <input
          type="text"
          placeholder="Search exercises..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div style={{ maxHeight: "500px", overflowY: "scroll" }}>
          <Row>
            {currentExercises.map((exercise) => (
              <Col key={exercise._id} md={3}>
                <Row>
                  <Image
                    src={exercise.gifUrl}
                    alt={exercise.name}
                    style={{ width: "100%" }}
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
                  <span>{exercise.name}</span>
                </Row>
              </Col>
            ))}
          </Row>
        </div>
        <div className="pagination">
          {currentPage > 1 && (
            <Button
              variant="secondary"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous Page
            </Button>
          )}
          {currentPage < pageNumbers && (
            <Button
              variant="secondary"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next Page
            </Button>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ExerciseModal;
