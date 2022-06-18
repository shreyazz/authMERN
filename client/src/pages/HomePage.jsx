import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button'
import { Link } from "react-router-dom";
const HomePage = () => {
  const logout = () => {
    localStorage.removeItem('token');
    window.location.reload('')
  }
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
    </>
  );
};

export default HomePage;
