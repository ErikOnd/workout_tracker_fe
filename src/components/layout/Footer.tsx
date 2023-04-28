import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Footer.css";

const Footer = () => {
  return (
    <Container
      fluid
      className="bg-dark text-light py-3 footer"
      style={{ opacity: 0.8 }}
    >
      <Row>
        <Col className="text-center text-md-start">
          <p>&copy; 2023 My Company. All rights reserved.</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
