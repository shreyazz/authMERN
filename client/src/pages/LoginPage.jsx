import React, { useState } from "react";
import {Link, useNavigate} from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios'
const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const onChange = (e) => setLoginData({...loginData, [e.target.name] : e.target.value});
  
  const onSubmit = async (e) => {
    e.preventDefault();
    let res = await axios.post("http://localhost:8080/api/auth/login", {
      email: loginData.email,
      password: loginData.password
    })
    localStorage.setItem("token", res.data.token)
    navigate('/', {replace: true})
    window.location.reload()
  }
  return (
    <div className="container mt-5" >
      <h1>Sign In to your account</h1>
      <Form onSubmit={(e) => onSubmit(e)}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e) => onChange(e)} name="email"
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e) => onChange(e)} name="password"/>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </div>
  );
};

export default LoginPage;
