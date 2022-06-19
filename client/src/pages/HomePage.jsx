import React, {useState, useEffect} from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button'
import { Link } from "react-router-dom";
import jwt_decode from 'jwt-decode';
const HomePage = () => {
  const logout = () => {
    localStorage.removeItem('token');

    window.location.reload('')
  }
  const [userDetails, setUserDetails] = useState({})
  useEffect(() => {
  setUserDetails(jwt_decode(localStorage.getItem('token')))
  }, [])
  return (
    <>
     <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Link to={'/secret'}>Admin Page</Link>
            <Button variant="info" onClick={logout}>Log out</Button>
          </Nav>
        </Container>
      </Navbar>
      <h1>Hey there, <span>{userDetails.name}</span></h1>
    </>
  );
};

export default HomePage;
