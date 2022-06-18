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
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [resCode, setResCode] = useState(0);
  const [show, setShow] = useState(false);
  const [deleteUserEmail, setDeleteUserEmail] = useState("");
  const [regData, setRegData] = useState({
    email: "",
    name: "",
    password: "password",
  });
  const onChange = (e) =>
    setRegData({ ...regData, [e.target.name]: e.target.value });
const addNewUser = async () => {
    try {
        let res = await axios.post("http://localhost:8080/api/auth/register", {
          email: regData.email,
          password: regData.password,
          name: regData.name,
        });
        console.log(res);
        setSuccess(true)
        setTimeout(() => setSuccess(false), 1500)
      } catch (error) {
        setTimeout(() => setError(true), 1500)

      }
}
  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    setDeleteUserEmail(e.target.parentElement.id);
    setShow(true);
  };
  const ShowAlert = ({ text, variant }) => {
    return (
      <>
        <Alert variant={variant}>{text}</Alert>
      </>
    );
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
                    <AiOutlinePlusSquare className="add-user" onClick={addNewUser}/>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </>
      )}
       {
          error && <ShowAlert text="some error occurred while creating an user" variant='danger'/>
        }
        {
          success &&  <ShowAlert text='user created' variant='success'/>
        }
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
