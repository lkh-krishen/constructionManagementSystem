import React from 'react';

import { Table, Button,Form } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";

import {  Link } from "react-router-dom";
import { useState,useEffect } from 'react';
import firebase from '../../firebase';




function Report(props) {
    
  const db = firebase.firestore();
   
    const [subcontractors, setSubcontractors] = useState([]);

    const [viewingReport, setViewingReport] = useState(props);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {

        db.collection("subcontractors").onSnapshot((snapshot)=>{
      
            const arr =snapshot.docs.map((doc) =>({

              ID:doc.id,
              data:doc.data(),
            }));
            setSubcontractors(arr);    
          });   
    }, [db]);

     function viewReport(name) {
        viewingReport.viewReportHandler(name);
      }
    

    return (
        <div>
           <div class="container">   
             <br/>
             <h3 style={{color: '#ffb84d',}}>Transaction Reports</h3>
             <br/>
             <center>
             <Form.Group controlId="formBasicSearchBar">
              <Form.Control
                type="text"
                placeholder="Search....."
                onChange={(event) => {
                setSearchTerm(event.target.value);
                 }}
              />
             </Form.Group>
            </center>
             <br/>
            <div className="container" style={{backgroundColor : 'white', width:800}}>
              <br/>
             <Table striped bordered hover>
                <thead>
                  <tr class="p-3 mb-2 bg-warning text-dark"> 
                   <th>Company Name</th>    
                   <th>Type</th>
                   <th> </th>
                  </tr>
               </thead>
               <tbody>
               {subcontractors
                   .filter((subcontractor) => {
                     if (searchTerm == "") {
                        return subcontractor;
                     }else if (
                        subcontractor.data.comName
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                     ) {
                      return subcontractor;
                    }
                    })
                  .map((subcontractor)=>(
                  
                  <tr>
                      <td>{subcontractor.data.comName}</td>
                      <td>{subcontractor.data.type}</td>
                    
                       
                        <Link to='/adminPannel/SubcontractManager/ViewReport'>
                        <Button  variant="warning"
                                onClick={() => {viewReport(subcontractor.data.comName)}}>
                          View
                        </Button>
                        </Link>
                   </tr>
                  
                ))}
                </tbody>
              
               <br/>
               <br/>
               </Table>
               </div>
          </div>
        </div>
   )
  

}


export default Report;