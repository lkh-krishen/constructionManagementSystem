import React, { useState } from "react";
import firebase from "../../firebase";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./clientmanager.css";

function AddClient() {
  const [clientName, setClientName] = useState("");
  const [representativeName, setRepresentativeName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const db = firebase.firestore();

  function sendData(e) {
    e.preventDefault();
    if (
      window.confirm(
        "Are you sure you want to add a client with these details?"
      )
    ) {
      alert("Done!");
      const newClient = {
        clientName,
        representativeName,
        phone,
        email,
        address,
      };
      console.log(newClient);

      db.collection("clients")
        .doc()
        .set(newClient)
        .then(() => {
          console.log("Document successfully written!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });

      setClientName("");
      setRepresentativeName("");
      setPhone("");
      setEmail("");
      setAddress("");
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
        <h2 style={{ color: "#f0ad4e" }}>Add New Client</h2>
      </center>
      <Form onSubmit={sendData}>
        <Form.Group controlId="formBasicName">
          <Form.Label>
            Individual's Full Name/ Organization's Name (Required Format: Must
            Only Contain Letters and Spaces)
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="example: Prad Bitt"
            required
            pattern="^[A-Za-z \s*]+$"
            value={clientName}
            onChange={(e) => {
              setClientName(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group controlId="formBasicName">
          <Form.Label>
            Representative's Full Name (Required Format: Must Only Contain
            Letters and Spaces)
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="example: Bangelina Molie"
            pattern="^[A-Za-z \s*]+$"
            value={representativeName}
            onChange={(e) => {
              setRepresentativeName(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPhoneNo">
          <Form.Label>
            Individual's/ Representative's Contact Number (Required Format: Must
            Only Contain Ten Numbers)
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="example: 0764204204"
            required
            pattern="[0-9]{10}"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>
            Individual's/ Representative's Email Address (Required Format: Must
            Match Standard E-mail Formal As Shown In Example)
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="example: bangelina.molie@gmail.com"
            required
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Form.Group>

        <div class="form-group w-50">
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>
              Individual's/ Organization's Physical Address
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="example: Shawnee, Oklahoma, USA."
              required
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
          </Form.Group>
        </div>
        <Button variant="warning" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default AddClient;
