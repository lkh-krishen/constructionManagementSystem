import React, { useState, useEffect } from "react";
import firebase from "../../firebase";
import { Link } from "react-router-dom";
import { Form, Table, Button, ButtonGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function DisplayPayments(props) {
  const [payments, setPayments] = useState([]);
  const [clientNames, setClientNames] = useState([]);
  const [projectSearch, setProjectSearch] = useState("");
  const [projectNames, setProjectNames] = useState([]);
  const db = firebase.firestore();
  const [editingPayment, setEditingPayment] = useState(props);
  const [clientSearch, setClientSearch] = useState("");

  useEffect(() => {
    db.collection("payments").onSnapshot((snapshot) => {
      const arr = snapshot.docs.map((doc) => ({
        ID: doc.id,
        data: doc.data(),
      }));

      console.log(arr);
      setPayments(arr);
    });
  }, [db]);

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

  function deletePayment(ID) {
    db.collection("payments")
      .doc(ID)
      .delete()
      .then(() => {
        alert("Payment successfully deleted!");
      })
      .catch((err) => {
        console.error("Error removing document: ", err);
      });
  }

  function editPayment(id) {
    //alert("edit pay", id);
    editingPayment.editPaymentHandler(id);
  }

  return (
    <div style={{ paddingRight: "20px", paddingLeft: "20px" }}>
      <center>
        <br />
        <h3 style={{ color: "#f0ad4e" }}>
          <b>
            <u>Payment Report</u>
          </b>
        </h3>
        <br />
        <Form.Control
          style={{ width: "250px" }}
          as="select"
          onChange={(event) => {
            setClientSearch(event.target.value);
          }}
        >
          <option value="">Client?</option>
          {clientNames.map((clientName) => (
            <option value={clientName}>{clientName}</option>
          ))}
        </Form.Control>

        <br />
        <Form.Control
          style={{ width: "250px" }}
          as="select"
          onChange={(event) => {
            setProjectSearch(event.target.value);
          }}
        >
          <option value="">Project?</option>
          {projectNames.map((projectName) => (
            <option value={projectName}>{projectName}</option>
          ))}
        </Form.Control>
      </center>
      <br />
      <Link to="/adminPannel/ClientManager/AddPayment">
        <Button style={{ borderRadius: "10px 10px 0 0" }} variant="primary">
          Add New Payment
        </Button>
      </Link>

      <Table bordered size="sm">
        <thead>
          <tr>
            <th style={{ display: "none" }}>Document ID</th>
            <th style={{ textAlign: "center" }}>Client Name</th>
            <th style={{ textAlign: "center" }}>Project Name</th>
            <th style={{ textAlign: "center" }}>Date</th>
            <th style={{ textAlign: "center" }}>Amount</th>
            <th style={{ textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments
            .filter((payment) => {
              if (clientSearch == "") {
                return payment;
              } else if (payment.data.clientName == clientSearch) {
                if (projectSearch == "") {
                  return payment;
                } else if (payment.data.projectName == projectSearch) {
                  return payment;
                }
              }
            })
            .map((payment) => (
              <tr>
                <td style={{ display: "none" }}>{payment.ID}</td>
                <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                  {payment.data.clientName}
                </td>
                <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                  {payment.data.projectName}
                </td>
                <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                  {payment.data.date}
                </td>
                <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                  {payment.data.amount}
                </td>
                <td style={{ textAlign: "center" }}>
                  <ButtonGroup>
                    <Link to="/adminPannel/ClientManager/EditPayment">
                      <Button
                        style={{ borderRadius: "5px 0 0 5px" }}
                        variant="warning"
                        onClick={() => {
                          editPayment(payment.ID);
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
                            "Are you sure you want to delete this payment's details? This action is irreversible!"
                          )
                        ) {
                          deletePayment(payment.ID);
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

export default DisplayPayments;
