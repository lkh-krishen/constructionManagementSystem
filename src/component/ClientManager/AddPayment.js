import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import firebase from "../../firebase";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./clientmanager.css";

function AddPayment() {
  const [clientName, setClientName] = useState("");
  const [clientNames, setClientNames] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [projectNames, setProjectNames] = useState([]);
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");

  const db = firebase.firestore();

  useEffect(() => {
    db.collection("clients").onSnapshot((snapshot) => {
      const arr = snapshot.docs.map((doc) => doc.data().clientName);
      setClientNames(arr);
    });
  }, [db]);

  useEffect(() => {
    db.collection("Con_Project").onSnapshot((snapshot) => {
      const arr = snapshot.docs.map((doc) => doc.data().Title);
      setProjectNames(arr);
    });
  }, [db]);

  function sendData(e) {
    e.preventDefault();
    if (
      window.confirm(
        "Are you sure you want to add a payment with these details?"
      )
    ) {
      alert("Payment has been successfully added!");

      const newPayment = {
        clientName,
        projectName,
        date,
        amount: parseFloat(amount),
      };

      console.log(newPayment);

      db.collection("payments")
        .doc()
        .set(newPayment)
        .then(() => {
          console.log("Document successfully written!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });

      setClientName("");
      setProjectName("");
      setDate("");
      setAmount("");
    }
  }

  return (
    <div className="container">
      <br />
      <Link to="/adminPannel/ClientManager">
        <Button variant="primary">Back</Button>
      </Link>
      <br />
      <center>
        <h2 style={{ color: "#f0ad4e" }}>Add New Payment</h2>
      </center>
      <br />
      <Form onSubmit={sendData}>
        <center>
          <Form.Control
            style={{ width: "400px" }}
            as="select"
            required
            onChange={(e) => {
              setClientName(e.target.value);
            }}
          >
            <option value="">Select Client Name</option>
            {clientNames.map((clientName) => (
              <option value={clientName}>{clientName}</option>
            ))}
          </Form.Control>
          <br />
          <Form.Control
            style={{ width: "400px" }}
            as="select"
            required
            onChange={(e) => {
              setProjectName(e.target.value);
            }}
          >
            <option value="">Select Project Name</option>
            {projectNames.map((projectName) => (
              <option value={projectName}>{projectName}</option>
            ))}
          </Form.Control>
          <br />
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              placeholder="example: 2021/7/22"
              required
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group controlId="formBasicNumber">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              placeholder="example: 100000"
              required
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />
          </Form.Group>

          <br />
          <Button variant="warning" type="submit">
            Submit
          </Button>
        </center>
      </Form>
    </div>
  );
}

export default AddPayment;
