import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import "./Header.css";
import { BoxArrowRight } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Navbar bg="transparent" expand="lg" variant="dark">
      <Container fluid className="px-5 align-items-start">
        <Navbar.Brand href="#"></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ml-auto mt-2 d-flex align-items-center">
            <Nav.Link as={Link} to="/profile">
              Profile
            </Nav.Link>
            <span className="orange-btn-header ml-2">
              <NavDropdown title="Workouts" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/your-workouts">
                  Your Workouts
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/create-workout">
                  Create Workout
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/find-workouts">
                  Find Workouts
                </NavDropdown.Item>
              </NavDropdown>
            </span>
            <Nav.Link as={Link} to="/progress" className="ml-2">
              Progress
            </Nav.Link>
            <Nav.Link as={Link} to="/login" className="ml-2">
              <BoxArrowRight
                onClick={() => {
                  localStorage.removeItem("accessToken");
                }}
                size={30}
                data-toggle="tooltip"
                data-placement="bottom"
                title="Logout"
              ></BoxArrowRight>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
