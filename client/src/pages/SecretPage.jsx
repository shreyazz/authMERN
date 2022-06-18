import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { AiOutlinePlusSquare } from "react-icons/ai";
const SecretPage = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState([]);
  const [resCode, setResCode] = useState(0);
  const [show, setShow] = useState(false);
  const [deleteUserEmail, setDeleteUserEmail] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    setDeleteUserEmail(e.target.parentElement.id);
    setShow(true);
  };
  const showAllUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/auth/all-users", {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      setUserDetails(res.data);
      res.status === 200 && setResCode(200);
    } catch (err) {
      setResCode(403);
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 2500);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      showAllUsers();
    }
  }, []);
  const deleteUser = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/auth/delete-user",
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
          email: deleteUserEmail,
        }
      );
      console.log(res);
      setUserDetails(() => {
        return userDetails.filter((user) => user.email != deleteUserEmail);
      });
      setShow(false);
      window.location.reload(false);
    } catch (error) {
      console.log("some error occurred");
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={deleteUser}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      {resCode == 200 && (
        <>
          <div className="container">
            <p>delete user is: {deleteUserEmail}</p>
            <h1>This is the list of all the users</h1>

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {userDetails.map((user, index) => {
                  return (
                    <tr key={user.email}>
                      <td>{index + 1} </td>
                      <td>{user.name}</td>
                      <td className="relative-td">
                        {user.email}{" "}
                        <MdDelete
                          id={user.email}
                          className="delete-icon"
                          onClick={(e) => handleShow(e)}
                        />
                      </td>
                    </tr>
                  );
                })}
                <tr>
                  <td>
                    #
                  </td>
                  <td>
                    <Form.Control
                      type="email"
                      placeholder="Name"
                      onChange={(e) => onChange(e)}
                      name="name"
                    />
                  </td>
                  <td className="demo">
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      onChange={(e) => onChange(e)}
                      name="email"
                    />
                    <AiOutlinePlusSquare className="add-user" />
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </>
      )}
      {resCode == 403 && (
        <>
          <Alert variant="danger">
            You are not allowed here... You'll be redirect to the main page
          </Alert>
        </>
      )}
    </>
  );
};

export default SecretPage;

// http://localhost:8080/api/auth/delete-user
