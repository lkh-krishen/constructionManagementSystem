import { TextField, makeStyles,Paper } from "@material-ui/core";
import React, { useState, useEffect } from 'react'
import { Grid } from '@material-ui/core';
import firebase from "firebase";
import PageHeader from "./PageHeader";
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { Button,Row,Col,Container,Form } from "react-bootstrap";
import Button1 from '@material-ui/core/Button';
import { Link } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {

          display: 'flex',
          flexWrap: 'wrap',
          '& > *': {
          margin: theme.spacing(1),
          width: theme.spacing(40),
          height: theme.spacing(10),
          marginLeft : '190px',
        },

      },
    },
  }));

function EditEmployee(props) {

    const [employeeName, setEmployeeName] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [designation, setDesignation] = useState("");
    const [startdate, setStartDate] = useState("");
    const [etf, setEtf] = useState("");
    const [empType, setEmpType] = useState("");
    const [type , setType] = useState([]);

    const db = firebase.firestore();
    const db4 = firebase.firestore();

    const [employeeID, setEmployeeId] = useState(props.id);

    const classes = useStyles();

    useEffect(() => {
        db.collection("employees")
          .doc(employeeID.toString())
          .get()
          .then(function (doc) {
            if (doc.exists) {
              console.log("Document data:", doc.data());
              setEmployeeName(doc.data().employeeName);
              setAddress(doc.data().address);
              setPhoneNumber(doc.data().phoneNumber);
              setDesignation(doc.data().designation);
              setStartDate(doc.data().startdate);
              setEtf(doc.data().etf);
              setEmpType(doc.data().empType);
            } else {
              // doc.data() will be undefined in this case
              console.log("No such record!");
            }
          })
          .catch(function (error) {
            console.log("Error getting record:", error);
          });
      }, [db, employeeID]);
    
      function editdata(e) {
        e.preventDefault();
        alert("Edit done");
        const updatedEmployee = {
            employeeName,
            address,
            phoneNumber,
            designation,
            startdate,
            etf,
            empType,
        };
        console.log(updatedEmployee);
    
        db.collection("employees").doc(employeeID).update(updatedEmployee);
      }


      useEffect(() => {
        db4.collection("Designation").onSnapshot(snapshot=>{
            const arr =snapshot.docs.map(doc =>doc.data());
            setType(arr);
        })
    }, [db4])

    return (

    <>
    <PageHeader
        title="Edit Employee"
        //subTitle="Form design with validation"
        icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
    />
    <div>
    <Container fluid="sm" >
          <Row>
            <Col md={{ span: 5, offset: 3 }}>
              <Form onSubmit={editdata}>
				  
					    <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Employee Name</Form.Label>  
					        <Form.Control  
                        aria-label="Default select example" 
                        size="xxl"
                        type="text" 
                        pattern="^[A-Za-z \s*]+$"
                        required
                        placeholder="Ex : K.M.L.Perera"
                        value={employeeName} 
                        onChange={e => setEmployeeName(e.target.value)}>
					        </Form.Control>
              </Form.Group>

					    <Form.Group className="mb-3" controlId="formBasicTitle">
                <Form.Label>Address</Form.Label>  
					        <Form.Control  
                        aria-label="Default select example" 
                        size="xxl"
                        as="textarea"
                        rows={1}
                        required
                        placeholder="Ex : 5/A, Ampitiya" 
                        value={address} 
                        onChange={e => setAddress(e.target.value)}>
					        </Form.Control>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicTitle">
                <Form.Label>Phone Number</Form.Label>  
					        <Form.Control  
                        aria-label="Default select example" 
                        size="xxl"
                        type="text"
                        pattern="^[[0-9]{10}"
                        required
                        placeholder="Ex : 0712645893" 
                        value={phoneNumber} 
                        onChange={e => setPhoneNumber(e.target.value)}>
					        </Form.Control>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicTitle">
                <Form.Label>Designation</Form.Label>  
					        <Form.Control as  = "select" 
                        aria-label="Default select example" 
                        size="xxl"
                        width = "20%"
                        required
                        placeholder="Select" 
                        value={designation} 
                        onChange={e => setDesignation(e.target.value)}>
						            {type.map(des=>(
							          <option  >{des.designation}</option>
						            ))}
					        </Form.Control>
              </Form.Group>

					    <Form.Group className="mb-3" controlId="formBasicTitle">
                <Form.Label>ETF Amount</Form.Label>  
					        <Form.Control  
                        aria-label="Default select example" 
                        size="xxl"
                        //type="text"
                        //pattern="^[[0-9]{0}"
                        //required
                        type="number"
                        step="0.01"
                        min = "0.00"
                        placeholder="Ex : 15000.00"
                        value={etf} 
                        onChange={e => setEtf(e.target.value)}>
					        </Form.Control>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicTitle">
                <Form.Label>Type</Form.Label>  
					        <Form.Control as  = "select" 
                        aria-label="Default select example" 
                        size="xxl"
                        width = "20%"
                        required
                        placeholder="Select" 
                        value={empType} 
                        onChange={e => setEmpType(e.target.value)}>
						            {type.map(ty=>(
							          <option  >{ty.status}</option>
						            ))}
					        </Form.Control>
              </Form.Group>
              

              <Button variant="warning" type="submit"
                  styles = {{
                    margin : "0px 0px 10px 0px",
                  }}>
                  Edit Employee
              </Button>
              <br/>

              </Form>
            </Col>
          </Row>
        </Container>
    </div>
    </>

    );
}

export default EditEmployee;
