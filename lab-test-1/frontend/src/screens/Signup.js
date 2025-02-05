import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Button, Form } from "react-bootstrap";
import { useLocation, Link, useNavigate  } from "react-router-dom";


function Signup() {
    const navigate = useNavigate();
    const [user, SetUser] = useState({
        username: "",
        email: "",
        password: "",
    })

    // Handle the form submission
    const signupUser = (e) => {
        e.preventDefault(); // Prevent the default form submission
        axios
        .post(`/user/signup`, user)
        .then((response) => {
            console.log("User created successfully:", response.data);
            alert("Created successfully!")
            navigate("/login")
        })
        .catch((error) => {
            console.error("Error signup data:", error);
            console.log(`User signup info:\n username: ${user.username} \n password: ${user.password}`)
            alert("Signup Fail! Please try again")
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
          <h3 className="text-center">Welcome to Employee Dashboard</h3>
          <h4 className="text-center">Please input your credentials to login</h4>
          <Form onSubmit={signupUser}>
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
              <Form.Label className="fw-bold">firstname</Form.Label>
              <Form.Control
                type="text"
                name="firstname"
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">lastname</Form.Label>
              <Form.Control
                type="text"
                name="lastname"
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
              Create User
            </Button>
            <Link to={`/login`}>
              <Button variant="danger" className="me-2">
                Cancel
              </Button>
            </Link>
          </Form>
        </div>
      </Container>
    )

}

export default Signup;