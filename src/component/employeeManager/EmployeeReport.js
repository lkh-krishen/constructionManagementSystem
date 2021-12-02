import React , { useState, useEffect, Component } from 'react'
import PageHeader from "./PageHeader";
import PersonIcon from '@material-ui/icons/Person';
import firebase from 'firebase';
import { Form, Button,Row,Col,Container } from "react-bootstrap";

const db = firebase.firestore();
const db1 = firebase.firestore();

function EmployeeReport(props) {

    //retrive data from employee table
    db.collection('employees').get().then((snapshot) =>{
       snapshot.docs.forEach(doc => {
           console.log(doc.data())
        })
    })

    db1.collection('Designation').get().then((snapshot) =>{
        snapshot.docs.forEach(doc => {
            console.log(doc.data())
        })
    })
 

    return (
        <>
        <PageHeader
        title="Report"
        //subTitle="Form design with validation"
        icon={<PersonIcon fontSize="large" />}
        />
        <div>

  
           
        </div>
        </>
    )
}

export default EmployeeReport


