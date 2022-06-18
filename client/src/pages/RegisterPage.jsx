import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
const RegisterPage = () => {
  const [regData, setRegData] = useState({
    email: "",
    name: "",
    password: "",
  });
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate();
  const onChange = (e) =>
    setRegData({ ...regData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post("http://localhost:8080/api/auth/register", {
        email: regData.email,
        password: regData.password,
        name: regData.name,
      });
      console.log(res);
      setSuccess(true)
      setTimeout(() => {navigate("/login");}, 1500)
    } catch (error) {
      setError(true)
    }
  };
  const ShowAlert = ({ text, variant }) => {
    return (
      <>
        <Alert variant={variant}>{text}</Alert>
      </>
    );
  };
  return (
    <>
      <div className="container mt-3">
        <Form onSubmit={(e) => onSubmit(e)} className="mb-4">
          <Form.Group className="mb-3" controlId="forBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name"
              name="name"
              onChange={(e) => onChange(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={(e) => onChange(e)}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => onChange(e)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        {
          error && <ShowAlert text="some error occurred while creating an user" variant='danger'/>
        }
        {
          success &&  <ShowAlert text='user created' variant='success'/>
        }
      </div>
    </>
  );
};

export default RegisterPage;
