import React, { useState, useEffect } from "react";
import firebase from "../../firebase";
import { Link } from "react-router-dom";
import { Table, Button, ButtonGroup, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./clientmanager.css";

function DisplayClients(props) {
  const [clients, setClients] = useState([]);
  const db = firebase.firestore();
  const [editingClient, setEditingClient] = useState(props);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    db.collection("clients").onSnapshot((snapshot) => {
      const arr = snapshot.docs.map((doc) => ({
        ID: doc.id,
        data: doc.data(),
      }));

      setClients(arr);
    });
  }, [db]);

  function deleteClient(ID) {
    db.collection("clients")
      .doc(ID)
      .delete()
      .then(() => {
        alert(ID, "Document successfully deleted!");
      })
      .catch((err) => {
        console.error("Error removing document: ", err);
      });
  }

  function editClient(id) {
    //alert("edit cli", id);
    editingClient.editClientHandler(id);
  }

  return (
    <div style={{ paddingRight: "20px", paddingLeft: "20px" }}>
      <br />
      <center>
        <Form.Group controlId="formBasicSearchBar">
          <Form.Control
            type="text"
            placeholder="Search by Individual's Name/ Organization's Name..."
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
        </Form.Group>
      </center>
      <Link to="/adminPannel/ClientManager/AddClient">
        <Button style={{ borderRadius: "10px 10px 0 0" }} variant="primary">
          Add New Client
        </Button>
      </Link>
      <Table bordered size="sm">
        <thead>
          <tr>
            <th style={{ display: "none" }}>Document ID</th>
            <th style={{ textAlign: "center" }}>
              Individual's Full Name/ Organization's Name
            </th>
            <th style={{ textAlign: "center" }}>Representative's Full Name</th>
            <th style={{ textAlign: "center" }}>
              Individual's/ Representative's Contact Number
            </th>
            <th style={{ textAlign: "center" }}>
              Individual's/ Representative's Email Address
            </th>
            <th style={{ textAlign: "center" }}>
              Individual's/ Organization's Physical Address
            </th>
            <th style={{ textAlign: "center", verticalAlign: "middle" }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {clients
            .filter((client) => {
              if (searchTerm == "") {
                return client;
              } else if (
                client.data.clientName
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              ) {
                return client;
              }
            })
            .map((client) => (
              <tr>
                <td style={{ display: "none" }}>{client.ID}</td>
                <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                  {client.data.clientName}
                </td>
                <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                  {client.data.representativeName}
                </td>
                <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                  {client.data.phone}
                </td>
                <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                  {client.data.email}
                </td>
                <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                  {client.data.address}
                </td>
                <td style={{ textAlign: "center" }}>
                  <ButtonGroup>
                    <Link to="/adminPannel/ClientManager/EditClient">
                      <Button
                        style={{ borderRadius: "5px 0 0 5px" }}
                        variant="warning"
                        onClick={() => {
                          editClient(client.ID);
                        }}
                      >
                        Edit
                      </Button>
                    </Link>
                    <Button
                      style={{ borderRadius: "0 5px 5px 0" }}
                      variant="danger"
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete this client's details? This action is irreversible!"
                          )
                        ) {
                          deleteClient(client.ID);
                        }
                      }}
                    >
                      Delete
                    </Button>
                  </ButtonGroup>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}

export default DisplayClients;
