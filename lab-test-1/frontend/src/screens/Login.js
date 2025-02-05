import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Button, Form } from "react-bootstrap";
import { useLocation, Link, useNavigate  } from "react-router-dom";


function Login() {
    const navigate = useNavigate();
    const [user, SetUser] = useState({
        username: "",
        password: ""
    })

    // Handle the form submission
    const loginUser = (e) => {
        e.preventDefault(); // Prevent the default form submission
        axios
        .post(`user/login`, user)
        .then((response) => {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', user.username);
            console.log("User login successfully:", response.data);
            navigate("/")
        })
        .catch((error) => {
            console.error("Error login data:", error);
            console.log(`User login info:\n username: ${user.username} \n password: ${user.password}`)
            alert("Login Fail! Please try again")
        });
    };



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        SetUser((prev) => ({
          ...prev,
          [name]: value, // Update the corresponding field
        }));
      };

    return(
        <Container className="d-flex justify-content-center mt-4">
        <div style={{ width: "80%" }}>
          <h3 className="text-center">Welcome to Chat App</h3>
          <h4 className="text-center">Please input your credentials to login</h4>
          <Form onSubmit={loginUser}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">User Name</Form.Label>
              <Form.Control
                type="text"
                name="username"
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Button variant="primary" className="me-2" type="submit">
              Login
            </Button>
            <Link to={`/signup`}>
              <Button variant="success" className="me-2">
                Sign Up
              </Button>
            </Link>
          </Form>
        </div>
      </Container>
    )

}

export default Login;