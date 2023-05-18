import React, { useEffect, useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import GoogleButton from "react-google-button";
import userLogin from "../../../services/userLogin";
import LoginData from "../../../interfaces/LoginData";
import storeAccessToken from "../../../helpers/storeAccessToken";
import { useNavigate } from "react-router-dom";

const apiUrl = process.env.REACT_APP_API_URL;

const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    storeAccessToken();
  }, []);

  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const path = await userLogin(formData);
    if (path) {
      navigate(path);
      window.location.reload();
    } else {
      setErrorMessage(true);
    }
  };

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
          {errorMessage && (
            <Alert variant="danger" className="mt-3">
              Email or Password incorrect
            </Alert>
          )}
          <a href={`${apiUrl}/users/googleLogin`}>
            <GoogleButton className="mt-3" />
          </a>

          <div className="text-center mt-3">
            Don't have an account?
            <Link to="/register" className="link-primary">
              {" "}
              Register here
            </Link>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default Login;
