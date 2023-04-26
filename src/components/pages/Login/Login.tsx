import React, { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import GoogleButton from "react-google-button";
import userGoogleLogin from "../../../services/googleLogin";
import LoginData from "../../../interfaces/LoginData";

const apiUrl = process.env.REACT_APP_API_URL;

/* const urlString = window.location.href;
      const url = new URL(urlString);
      const accessToken = url.searchParams.get("accessToken");
      if (accessToken !== null) {
        console.log(accessToken);
        //localStorage.setItem("accessToken", accessToken.accessToken);
      }
      */

const Login = () => {
  useEffect(() => {
    const urlString = window.location.href;
    const url = new URL(urlString);
    const accessToken = url.searchParams.get("accessToken");
    if (accessToken !== null) {
      localStorage.setItem("accessToken", accessToken);
    }
  }, []);

  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
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

          <Button variant="primary" type="submit" className="mt-4">
            Submit
          </Button>
          <a href={`${apiUrl}/users/googleLogin`}>
            <GoogleButton className="mt-3" />
          </a>

          <div className="text-center mt-3">
            Don't have an account?
            <Link to="/register" className="link-primary">
              Register here
            </Link>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default Login;
