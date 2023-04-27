import React from "react";
import { Navbar, Container, Nav, Image } from "react-bootstrap";
import "./Header.css";
import { BoxArrowRight } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Navbar bg="transparent" expand="lg" variant="dark" fixed="top">
      <Container fluid className="px-5 align-items-start">
        <Navbar.Brand href="#">
          <Image
            src="https://res.cloudinary.com/dyy38u8x7/image/upload/v1682580357/Logo_pof5u1.png"
            alt="logo"
            className="logo"
          ></Image>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ml-auto mt-2">
            <Nav.Link as={Link} to="/profile">
              Profile
            </Nav.Link>
            <Nav.Link as={Link} to="/workouts">
              Your Workouts
            </Nav.Link>
            <Nav.Link as={Link} to="/progress">
              Progress
            </Nav.Link>
            <Nav.Link as={Link} to="/find-workouts">
              Find Workouts
            </Nav.Link>
            <Nav.Link as={Link} to="/contact">
              <span className="contact-btn">Contact</span>
            </Nav.Link>
            <Nav.Link as={Link} to="/login">
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
