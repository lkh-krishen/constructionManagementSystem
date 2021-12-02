import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import firebase from "../../firebase";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./clientmanager.css";

function EditClient(props) {
  const [clientName, setClientName] = useState("");
  const [representativeName, setRepresentativeName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const db = firebase.firestore();
  const [clientId, setClientId] = useState(props.id);

  useEffect(() => {
    db.collection("clients")
      .doc(clientId.toString())
      .get()
      .then(function (doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          setClientName(doc.data().clientName);
          setRepresentativeName(doc.data().representativeName);
          setPhone(doc.data().phone);
          setEmail(doc.data().email);
          setAddress(doc.data().address);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  }, [db, clientId]);

  function editdata(e) {
    e.preventDefault();
    if (
      window.confirm("Are you sure you want to edit this client's details?")
    ) {
      alert("Client details have been successfully edited.");
      const updatedClient = {
        clientName,
        representativeName,
        phone,
        email,
        address,
      };
      console.log(updatedClient);

      db.collection("clients").doc(clientId).update(updatedClient);
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
        <h2 style={{ color: "#f0ad4e" }}>Edit Client</h2>
      </center>
      <Form onSubmit={editdata}>
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
            placeholder="example: +94 42 042 0420"
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

export default EditClient;
