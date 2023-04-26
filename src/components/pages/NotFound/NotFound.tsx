import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container className="my-5">
      <Row className="justify-content-center align-items-center">
        <Col xs={12} sm={8} md={6} lg={4} className="text-center">
          <h1 className="display-1">404</h1>
          <h2 className="mb-4">Page Not Found</h2>
          <p className="lead mb-5">
            We're sorry, the page you requested could not be found.
          </p>
          <Link to="/login">
            <Button variant="primary">Go Back to Login Page</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
