import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import ExerciseSets from "./ExerciseSets";
import exercises from "../../../assets/exercises";

const exArray = exercises;
const Exercise = () => {
  const [setsCount, setSetsCount] = useState<number>(0);
  const [setsComponents, setSetsComponents] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    if (!isNaN(setsCount)) {
      const components = [];
      for (let i = 0; i < setsCount; i++) {
        components.push(<ExerciseSets key={i} setNumber={i} />);
      }
      setSetsComponents(components);
    } else {
      setSetsComponents([]);
    }
  }, [setsCount]);

  const handleSets = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSetsCount(parseInt(value, 10));
  };
  return (
    <Container>
      <div className="exercise-div mt-5">
        <Row>
          <input
            type="text"
            list="data"
            placeholder="Exercise Name"
            className="w-placeholder ex-name"
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {
              e.target.id = e.target.value.replace(/\s+/g, "-").toLowerCase();
            }}
          />

          <datalist id="data">
            {exArray.map((item, key) => (
              <option key={key} value={item} />
            ))}
          </datalist>
        </Row>
        <Row className="pt-4 align-items-start setsAndFocus">
          <span className="text-left p-0 sets-col">Sets:</span>
          <Col>
            <Form.Control
              type="text"
              placeholder="Sets"
              className="w-placeholder lift-sets"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleSets(e);
              }}
            />
          </Col>
          <span className="text-left p-0 sets-col">Focus:</span>
          <Col>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Focused Muscle groups (Optional)"
              className="w-placeholder focus-area pl-0"
            />
          </Col>
        </Row>
      </div>
      {setsComponents}
    </Container>
  );
};

export default Exercise;
