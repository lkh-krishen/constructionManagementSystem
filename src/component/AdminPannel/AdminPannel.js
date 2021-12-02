import React from "react";
import { Card } from "react-bootstrap";
import "./AdminPannel.css";
import { Link } from "react-router-dom";

function AdminPannel() {
  return (
    <div>
      <h1>Admin Pannel</h1>
      <div className="AdminPannel__mainButton">
        <Link to="/adminPannel/ClientManager" className="nav-link">
          <Card
            hover="true"
            className="text-center"
            bg={"Warning".toLowerCase()}
            text={"white"}
            style={{ width: "10rem", height: "6rem", color: "#111111" }}
          >
            <Card.Body>
              <Card.Title>Client Manager</Card.Title>
            </Card.Body>
          </Card>
        </Link>
        <Link to="/adminPannel/EmployeeManager/EmpHome" className="nav-link">
          <Card
            className="text-center"
            bg={"Warning".toLowerCase()}
            text={"white"}
            style={{ width: "10rem", height: "6rem", color: "#111111" }}
          >
            <Card.Body>
              <Card.Title>Employee Manager</Card.Title>
            </Card.Body>
          </Card>
        </Link>

        <Link to="/adminPannel/ProjectManagement" className="nav-link">
          <Card
            className="text-center"
            bg={"Warning".toLowerCase()}
            text={"white"}
            style={{ width: "10rem", height: "6rem", color: "#111111" }}
          >
            <Card.Body>
              <Card.Title>Project Manager</Card.Title>
            </Card.Body>
          </Card>
        </Link>

        <Link to="/adminPannel/SubcontractManager/SubconMain" className="nav-link">
          <Card
            className="text-center"
            bg={"Warning".toLowerCase()}
            text={"white"}
            style={{ width: "10rem", height: "6rem", color: "#111111" }}
          >
            <Card.Body>
              <Card.Title>SubContract Manager</Card.Title>
            </Card.Body>
          </Card>
        </Link>
        <Link to="/adminPannel/DesignationManager" className="nav-link">
          <Card
            className="text-center"
            bg={"Warning".toLowerCase()}
            text={"white"}
            style={{ width: "10rem", height: "6rem", color: "#111111" }}
          >
            <Card.Body>
              <Card.Title>Designation Manager</Card.Title>
            </Card.Body>
          </Card>
        </Link>
        <Link to="/adminPannel/supplierManager" className="nav-link">
          <Card
            className="text-center"
            bg={"Warning".toLowerCase()}
            text={"white"}
            style={{ width: "10rem", height: "6rem", color: "#111111" }}
          >
            <Card.Body>
              <Card.Title>Supply Manager</Card.Title>
            </Card.Body>
          </Card>
        </Link>
        <Link
          to="/adminPannel/attendanceManager/attendanceManagePanel"
          className="nav-link"
        >
          <Card
            className="text-center"
            bg={"Warning".toLowerCase()}
            text={"white"}
            style={{ width: "10rem", height: "6rem", color: "#111111" }}
          >
            <Card.Body>
              <Card.Title>Attendance Manager</Card.Title>
            </Card.Body>
          </Card>
        </Link>
      </div>
    </div>
  );
}

export default AdminPannel;
