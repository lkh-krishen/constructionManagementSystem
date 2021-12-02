import React, { useState, useEffect } from "react";
import firebase from "firebase";
import "bootstrap/dist/css/bootstrap.min.css";
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import PageHeader from "./PageHeader";
import { Button,Row,Col,Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function EmployeeProfile(props) {

    const [employeeName, setEmployeeName] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [designation, setDesignation] = useState("");
    const [startdate, setStartDate] = useState("");
    const [etf, setEtf] = useState("");
    const [empType, setEmpType] = useState("");
    const [sendEmpid,setsendEmpid] =useState(props);
    const [EmployeeID,setEmployeeID] = useState("")


    const db = firebase.firestore();
    const [empName, setEmployeeNames] = useState(props.name);

    useEffect(() => {
      console.log("Document data:", empName);
      db.collection("employees").where("employeeName","==",empName)
      .get()
      .then((querySnapshot) =>{

          querySnapshot.forEach((doc) => {
        
              
              console.log("Employee documents: ",doc.data());
              setEmployeeName(doc.data().employeeName);
              setAddress(doc.data().address);
              setPhoneNumber(doc.data().phoneNumber);
              setDesignation(doc.data().designation);
              setStartDate(doc.data().startdate);
              setEtf(doc.data().etf);
              setEmpType(doc.data().empType);
              setEmployeeID(doc.id);
              

          });
         
  })
  .catch(async(error) => {
    console.log("Error getting documents: ", error);
  });
}, [db, employeeName]);

function employeeattendanceClicked(ID){
  sendEmpid.editEmployeeHandler(ID);
}
    
    return (

      <>
      <PageHeader
      title="Employee Profile"
      subTitle={employeeName}
      icon={<SpeakerNotesIcon fontSize="large" />}
      />

      <div >

    
      <Container style = {{
        marginLeft :"290px",
      }}>
        {/* <Row xs={2} md={4} lg={6}>
          <Col >Employee ID</Col>
          <Col >:</Col>
          <Col >{EmployeeID}</Col>
        </Row>*/}

        <Row xs={2} md={4} lg={6} >
          <Col >Address</Col>
          <Col  >:</Col>
          <Col >{address}</Col>
        </Row>

        <Row xs={2} md={4} lg={6}>
          <Col >Phone Number</Col>
          <Col >:</Col>
          <Col md={{ span: 4, offset: 0 }}>{phoneNumber}</Col>
        </Row>

        <Row xs={2} md={4} lg={6}>
          <Col >Designation</Col>
          <Col >:</Col>
          <Col md={{ span: 4, offset: 0 }}>{designation}</Col>
        </Row>

        <Row xs={2} md={4} lg={6}>
          <Col >Start Date</Col>
          <Col >:</Col>
          <Col md={{ span: 4, offset: 0 }}>{startdate}</Col>
        </Row>

        <Row xs={2} md={4} lg={6}>
          <Col >ETF Amount</Col>
          <Col >:</Col>
          <Col md={{ span: 4, offset: 0 }}>{etf}</Col>
        </Row>

        <Row xs={2} md={4} lg={6}>
          <Col >Type </Col>
          <Col >:</Col>
          <Col md={{ span: 4, offset: 0 }}>{empType}</Col>
        </Row>

      <br/><br/>

        <Row xs="auto">
          <Col md={{ span: 4, offset: 0 }}>
          <Link to ='/adminPannel/EmployeeManager/MonthlyReport'>
                    <Button  type="submit"
                      styles={{
                        borderRadius: 15,
                        /*padding: "10px 20px",*/
                        backgroundColor: "#424242",
                        width: "200px",
                        margin : "0px 0px 30px 300px",
                        color : "#ffffff",
                        }}
                        variant="warning"
                        onClick={employeeattendanceClicked(EmployeeID)}
                      
                    >
                        View Attendance
                    </Button>
                  </Link>
          </Col>
        </Row>

      </Container>

    </div>

    </>
    );
}

export default EmployeeProfile;
