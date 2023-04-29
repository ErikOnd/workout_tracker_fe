import React, { useEffect, useState } from "react";
import { Container, Row, Card, Col } from "react-bootstrap";
import { PencilSquare } from "react-bootstrap-icons";
import "./Profile.css";
import Header from "../../layout/Header";
import ProfileModal from "./ProfileModal";
import Footer from "../../layout/Footer";
import getUserData from "../../../services/getUserData";
import { UserInterface } from "../../../interfaces/UserInterface";

const Profile = () => {
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState<UserInterface>();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    reloadUserData();
  }, []);

  const reloadUserData = async () => {
    if (accessToken) {
      const reloadData = await getUserData(accessToken);
      setUserData(reloadData);
    }
  };

  return (
    <Container fluid className="image-background p-0">
      <div className="second-layer">
        <Header></Header>
        <Row className="profile-image-row d-flex justify-content-center">
          <Card className="profile-card">
            <Card.Img
              className="d-none d-sm-block"
              variant="top"
              src={userData?.avatar}
            />
            <Card.Body>
              <Card.Title>
                <span className="highlight">Name:</span>{" "}
                <span>{userData?.username}</span>
              </Card.Title>
              <Card.Text>
                <Row className="d-flex justify-content-between profile-row mt-3">
                  <span className="highlight">Workout Likes:</span>
                  <span className="ml-auto">34</span>
                </Row>
                <Row className="d-flex justify-content-between profile-row mt-3">
                  <span className="highlight">General Progress:</span>{" "}
                  <span>7.43%</span>
                </Row>
                <Row className="d-flex justify-content-between profile-row mt-3">
                  <span className="highlight">Workouts:</span> <span>4</span>
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
        <div className="footer-div">
          <Footer />
        </div>
      </div>
      {userData && (
        <ProfileModal
          show={show}
          handleClose={handleClose}
          userImage={userData?.avatar}
          userName={userData?.username}
          userId={userData._id}
          reloadData={reloadUserData}
        ></ProfileModal>
      )}
    </Container>
  );
};

export default Profile;
