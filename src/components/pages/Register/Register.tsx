import React, { useEffect, useState } from "react";
import { Container, Form, Button, Alert, Row, Image } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import GoogleButton from "react-google-button";
import RegisterData from "../../../interfaces/RegisterData";
import userRegistration from "../../../services/userRegistration";
import storeAccessToken from "../../../helpers/storeAccessToken";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";

const apiUrl = process.env.REACT_APP_API_URL;

const Register = () => {
  const navigate = useNavigate();
  useEffect(() => {
    storeAccessToken();
  }, []);

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState<RegisterData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(false);
    setErrorMessage("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

    if (!emailRegex.test(formData.email)) {
      setError(true);
      setErrorMessage("Invalid email address");
      return;
    }

    if (!passwordRegex.test(formData.password)) {
      setError(true);
      setErrorMessage(
        "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one digit, and one special character"
      );
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError(true);
      setErrorMessage("Passwords do not match");
      return;
    }

    const path = await userRegistration(formData);
    if (path) {
      navigate(path);
    } else {
      setError(true);
      setErrorMessage("Failed to register");
    }
  };

  if (localStorage.getItem("accessToken")) {
    return <Navigate to="/profile" />;
  }

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div style={{ maxWidth: 400 }}>
        <Row className="justify-content-center mb-5">
          <Image className="login-logo" src={logo}></Image>
        </Row>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-4">
            Register
          </Button>

          {error && (
            <Alert variant="danger" className="mt-3">
              {errorMessage}
            </Alert>
          )}

          <a href={`${apiUrl}/users/googleLogin`}>
            <GoogleButton className="mt-3" />
          </a>

          <div className="text-center mt-3">
            Already have an account?
            <Link to="/login" className="link-primary">
              {" "}
              Login here
            </Link>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default Register;
