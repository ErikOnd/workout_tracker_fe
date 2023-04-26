import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import "./Header.css";

const Header = () => {
  return (
    <Navbar bg="transparent" expand="lg" variant="dark" fixed="top">
      <Container fluid>
        <Navbar.Brand href="#">LOGO</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="#">Profile</Nav.Link>
            <Nav.Link href="#">Your Workouts</Nav.Link>
            <Nav.Link href="#">Progress</Nav.Link>
            <Nav.Link href="#">Find Workouts</Nav.Link>
            <Nav.Link href="#">
              <span>Contact</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
