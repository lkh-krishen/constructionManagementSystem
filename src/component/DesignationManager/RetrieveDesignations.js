import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import firebase from "../../firebase";
import { func } from 'prop-types';
import { Table, Container, Button } from 'react-bootstrap';
import { Route, Switch, NavLink, Link} from 'react-router-dom';

const db = firebase.firestore();

function RetrieveDesignations(props) {
   
    const [designation,setDesignation] = useState([]);
    const [editDesignation, setEditingDesignation]=useState(props);

    useEffect(()=>{
        
        
        db.collection("Designation").onSnapshot((querySnapshot)=>{
            const array = querySnapshot.docs.map((doc)=>({
            
                    data : doc.data(),
                    key : doc.id,
                }));

                setDesignation(array);
            })
        },[]);
        console.log("desig array>>>>>>>>",designation);


    function DeleteDesignation(key){
        db.collection('Designation').doc(key).delete().then(()=>{
            alert("record deleted");
        }).catch((err)=>{
            console.error(err);
        })
    }

    function EditDesignation(id){
        console.log("edit function in retriveDesignation.js >>", id);
         editDesignation. EditDesignationHandler(id);
    }


    return (
        <div>
            <center>
            <Container style={{margin:"50px 0px 20px 0px",}}>
                <h2 className="text-warning" style={{ fontWeight:"18px"}}>Employee Designations</h2>
            </Container>
            </center>
            <center>
            <Container class="container" style={{margin : "100px 100px 50px 220px",border:"5px",}} >
                <Table align='center' style={{border:"5px",}}>
                    <thead style={{backgroundColor:"#212121",fontSize:"18px",fontStyle:"", fontWeight:"5px"}}>
                        <tr>
                        <td className="text-warning">Designation</td>
                        <td className="text-warning">Basic Salary</td>
                        <td className="text-warning">Status</td>
                        </tr>
                    </thead>
                    <tbody>
                        {designation.map((desig)=>(
                            <tr>
                                <td>{desig.data.designation}</td>
                                <td>{desig.data.basicSalary}</td>
                                <td>{desig.data.status}</td>
                                <Button variant="outline-warning" style={{margin:"4px 2px 4px 20px"}} onClick={()=>{DeleteDesignation(desig.key)}} class="btn">Delete</Button>
                                <Link to='/AdminPannel/DesignationManager/editDesignation'><Button variant="outline-warning" style={{margin:"4px 10px 4px 2px"}} onClick={()=>{EditDesignation(desig.key)}}>Edit </Button></Link> 
                            </tr>
                        ))}
                    </tbody>
                </Table>
                </Container>
                </center>
                <br/>
            <Container style={{margin : "0px 0px 0px 350px",border:"5px",}}>
                <Link to='/AdminPannel/DesignationManager/addDesignation'><Button variant="outline-warning">Add Designation</Button></Link>
            </Container>         
        </div>
    )
}

export default RetrieveDesignations