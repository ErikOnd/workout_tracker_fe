import React, { useEffect, useState } from "react";
import getWorkoutById from "../../../services/getWorkoutById";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { PlusSquareFill, Trash } from "react-bootstrap-icons";
import PrefWorkout from "../../../interfaces/PrefWorkout";

const ReconstructWorkout = ({ workout_id }: { workout_id: string }) => {
  const [prefWorkout, setPrefWorkout] = useState<PrefWorkout>();

  useEffect(() => {
    getWorkoutData();
  }, []);

  const getWorkoutData = async () => {
    setPrefWorkout(await getWorkoutById(workout_id));
  };

  console.log("prefWorkout:", prefWorkout);

  /*
  todo:
  1. load workout into redux store
  2. add functionalities
  
  
  
  */

  return (
    <>
      {prefWorkout?.exercises?.map((exercise, index) => (
        <Container id={exercise._id} className="exercise-con">
          <div className="exercise-div mt-5">
            <Row>
              <input
                type="text"
                list="data"
                placeholder="Exercise Name"
                className="w-placeholder ex-name w-100"
                value=""
              />
            </Row>
            <Row className="pt-4 align-items-start setsAndFocus">
              <span className="text-left p-0 sets-col">Focus:</span>
              <Col>
                <Form.Control
                  as="textarea"
                  rows={2}
                  placeholder="Focused Muscle groups"
                  className="w-placeholder focus-area pl-0"
                  readOnly
                  value=""
                />
              </Col>
              <Col>
                <Image src="" alt="" className="exercise-gif" />
              </Col>
            </Row>
            <Row>
              <Button variant="danger" className="remove-ex-btn trash-icon">
                <Trash size={20}></Trash>
              </Button>
            </Row>
          </div>

          <Row>
            <span
              className="mb-4 orange-btn mr-auto d-flex align-items-center"
              /*     onClick={() => {
          setSetsCount(setsCount + 1);
          }} */
            >
              <PlusSquareFill size={15} className="mr-2"></PlusSquareFill>
              Set
            </span>
          </Row>
        </Container>
      ))}
    </>
  );
};

export default ReconstructWorkout;
