import React, { useState } from "react";
import { Container, Row, Card, Col } from "react-bootstrap";
import { PencilSquare } from "react-bootstrap-icons";
import "./Profile.css";
import Header from "../../layout/Header";
import ProfileModal from "./ProfileModal";
const Profile = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container fluid className="image-background p-0">
      <div className="second-layer">
        <Header></Header>
        <Row>
          <Col>
            {" "}
            <Row className="profile-image-row">
              <Card className="profile-card">
                <Card.Img
                  variant="top"
                  src="https://res.cloudinary.com/dyy38u8x7/image/upload/v1682583555/cody-scott-milewski-vXgV5XUlTog-unsplash_jh6sfn.jpg"
                />
                <Card.Body>
                  <Card.Title>
                    <span className="highlight">Name:</span>{" "}
                    <span>John Doe</span>
                  </Card.Title>
                  <Card.Text>
                    <Row className="d-flex justify-content-between profile-row mt-3">
                      <span className="highlight">Workout Likes:</span>
                      <span className="ml-auto">34</span>
                    </Row>
                    <Row className="d-flex justify-content-between profile-row mt-3">
                      <span className="highlight">Generalr Progress:</span>{" "}
                      <span>7.43%</span>
                    </Row>
                    <Row className="d-flex justify-content-between profile-row mt-3">
                      <span className="highlight">Workouts:</span>{" "}
                      <span>4</span>
                    </Row>
                  </Card.Text>
                  <PencilSquare
                    onClick={handleShow}
                    className="ml-auto mt-4 edit-btn"
                    size={30}
                  ></PencilSquare>
                </Card.Body>
              </Card>
            </Row>
          </Col>
          <Col>
            <div className="quote-col text-center">
              <span className="inspiring-quote">
                “The body achieves what the mind believes.”
              </span>
            </div>
          </Col>
        </Row>
      </div>
      <ProfileModal show={show} handleClose={handleClose}></ProfileModal>
    </Container>
  );
};

export default Profile;
