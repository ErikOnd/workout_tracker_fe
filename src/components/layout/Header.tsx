import React from "react";
import { Navbar, Container, Nav, NavDropdown, Image } from "react-bootstrap";
import "./Header.css";
import { BoxArrowRight } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

const Header = () => {
  const navigate = useNavigate();
  return (
    <Navbar bg="transparent" expand="lg" variant="dark">
      <Container fluid className=" align-items-start">
        <Navbar.Brand>
          <Image
            src={logo}
            className="header-logo"
            onClick={() => {
              navigate("/profile");
            }}
          ></Image>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ml-auto mt-2 d-flex align-items-center">
            <span className="orange-btn-header ml-2">
              <Nav.Link as={Link} to="/profile">
                Profile
              </Nav.Link>
            </span>
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
