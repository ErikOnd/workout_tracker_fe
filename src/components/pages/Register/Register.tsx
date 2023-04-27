import React, { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import GoogleButton from "react-google-button";
import userGoogleLogin from "../../../services/googleLogin";
import RegisterData from "../../../interfaces/RegisterData";
import Alert from "react-bootstrap/Alert";

const apiUrl = process.env.REACT_APP_API_URL;

const Register = () => {
  useEffect(() => {
    const urlString = window.location.href;
    const url = new URL(urlString);
    const accessToken = url.searchParams.get("accessToken");
    if (accessToken !== null) {
      localStorage.setItem("accessToken", accessToken);
    }
  }, []);

  const [error, setError] = useState(false);

  const [formData, setFormData] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError(true);
    } else {
      setError(false);
    }
  };

  const handleGoogleLogin = () => {
    userGoogleLogin(formData);
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
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="Enter username"
              value={formData.name}
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
            Regsiter
          </Button>

          <a href={`${apiUrl}/users/googleLogin`}>
            <GoogleButton onClick={handleGoogleLogin} className="mt-3" />
          </a>

          <div className="text-center mt-3">
            Already have an account?
            <Link to="/login" className="link-primary">
              {" "}
              Login here
            </Link>
          </div>
        </Form>
        {error && (
          <Alert key="danger" variant="danger">
            Passwords do not match
          </Alert>
        )}
      </div>
    </Container>
  );
};

export default Register;
