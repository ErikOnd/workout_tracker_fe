import React from "react";
import { Container, Row } from "react-bootstrap";
import "./Profile.css";
import Header from "../../layout/Header";
const Profile = () => {
  return (
    <Container fluid className="image-background p-0">
      <Header></Header>
      <div className="second-layer"></div>
    </Container>
  );
};

export default Profile;
