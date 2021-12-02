import React from 'react';

import { Table, Button } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";

import {  Link } from "react-router-dom";
import { useState,useEffect } from 'react';
import firebase from '../../firebase';




function DisplaySubcontractor(props) {
    
  const db = firebase.firestore();
    const [painter, setPainter] =  useState([]);
    const [carpenter, setCarpenter] =  useState([]);
    const [electrician, setElectrician] =  useState([]);
    const [tiler, setTiler] =  useState([]);
    const [plumber, setPlumber] =  useState([]);
   
    const [editingSubcon, seteditingSubcon] = useState(props);
  //  const [viewingProject, setViewingProject] = useState(props);


    useEffect(() => {

        db.collection("subcontractors").onSnapshot(snapshot=>{
      
            const arr =snapshot.docs.map((doc) =>({

              ID:doc.id,
              data:doc.data(),
            }));

            //seperate data to related subcontractor----------------------------------------
            console.log(arr);
            setPainter(arr.filter(function(value) {
                return value.data.type === "Painter"; }))

              setCarpenter(arr.filter(function(value) {
                 return value.data.type === "Carpenter"; }))    
            
                 setElectrician(arr.filter(function(value) {
                    return value.data.type === "Electrician"; }))    
                    
                    setTiler(arr.filter(function(value) {
                        return value.data.type === "Tiler"; }))    

                        setPlumber(arr.filter(function(value) {
                            return value.data.type === "Plumber"; }))    

          })   
    }, [db]);

    function deleteSubcon(ID){
      
        db.collection("subcontractors")
            .doc(ID)
            .delete()
            .then(() => {
              alert(" Deleted successfully!");
          }).catch((err) => {
              console.error("Error removing document: ", err);
          });
      }
  
      function editSubcon(id){
          console.log("edit function >>", id);
          alert("Edit Subcontractor",id);
          //seteditingSubcon(id);
           editingSubcon.editSubconHandler(id);
      }
      
     // function viewProject(name) {
     //   alert("view Projects",name);
     //    viewingProject.viewProjectHandler(name);
     // }
    
  
    console.log("painter=>>>",painter)
    console.log("carpenter=>>>",carpenter)
    console.log("electrician=>>>",electrician)
    console.log("tiler=>>>",tiler)
    console.log("plumber=>>>",plumber)
  
   


    return (
        <div>
           <div class="container">   
             <br/>
             <h3 class="text-warning">Details of Subcontractors</h3>
             <br/>
             <br/>
             <h3 style={{backgroundColor: '#404040',color: '#ffb84d',padding: "7px"}}>
               Carpenters</h3>
             <Table striped bordered hover>
                <thead>
                  <tr class="p-3 mb-2 bg-warning text-dark"> 
                   <th>Company Name</th>    
                   <th>Email</th>
                   <th>Phone Number</th>
                   <th>Joined Date</th>
                   <th> </th>
                  </tr>
               </thead>
               <tbody>
               {carpenter.map((subcontractor)=>(
                  
                  <tr>
                      <td>{subcontractor.data.comName}</td>
                      <td>{subcontractor.data.email}</td>
                      <td>{subcontractor.data.phone}</td>
                      <td>{subcontractor.data.joinDate}</td>
                     
                    
                       
                        <Button
                          style={{backgroundColor: '#005c99'}}

                          onClick={() => {deleteSubcon(subcontractor.ID) }}
                        >
                          Delete
                        </Button>
                        
                        <Link to='/adminPannel/SubcontractManager/editSubcon'>
                        <Button style={{backgroundColor: '#404040'}}
                                onClick={() => {editSubcon(subcontractor.ID)}}>
                          Edit
                        </Button>
                        </Link>
                   </tr>
                  
                ))}
                </tbody>
               </Table>
             
               <br/>
               <h3 style={{backgroundColor: '#404040',color: '#ffb84d',padding: "7px"}}>
               Painters</h3>
               <Table striped bordered hover>
                <thead>
                  <tr class="p-3 mb-2 bg-warning text-dark"> 
                   <th>Company Name</th>    
                   <th>Email</th>
                   <th>Phone Number</th>
                   <th>Joined Date</th>
                   <th> </th>
                  </tr>
               </thead>
               <tbody>
               {painter.map((subcontractor)=>(
                  <tr>
                      <td>{subcontractor.data.comName}</td>
                      <td>{subcontractor.data.email}</td>
                      <td>{subcontractor.data.phone}</td>
                      <td>{subcontractor.data.joinDate}</td>
                    
                       
                        <Button
                           style={{backgroundColor: '#005c99'}}
                        
                          onClick={() => { 
                              deleteSubcon(subcontractor.ID) }}
                        >
                          Delete
                        </Button>
                      
                        <Link to='/adminPannel/SubcontractManager/editSubcon'>
                        <Button style={{backgroundColor: '#404040'}}
                                onClick={() => {editSubcon(subcontractor.ID)}}>
                          Edit
                        </Button>
                        </Link>
                   </tr>
                  
                ))}
                </tbody>
               </Table>
               
               <br/>
               <h3 style={{backgroundColor: '#404040',color: '#ffb84d',padding: "7px"}}>
               Electricians</h3>
               <Table striped bordered hover>
                <thead>
                  <tr class="p-3 mb-2 bg-warning text-dark"> 
                   <th>Company Name</th>    
                   <th>Email</th>
                   <th>Phone Number</th>
                   <th>Joined Date</th>
                   <th> </th>
                  </tr>
               </thead>
               <tbody>
               {electrician.map((subcontractor)=>(
                  <tr>
                      <td>{subcontractor.data.comName}</td>
                      <td>{subcontractor.data.email}</td>
                      <td>{subcontractor.data.phone}</td>
                      <td>{subcontractor.data.joinDate}</td>
                       
                        <Button
                           style={{backgroundColor: '#005c99'}}
                        
                          onClick={() => { 
                              deleteSubcon(subcontractor.ID) }}
                        >
                          Delete
                        </Button>
                      
                        <Link to='/adminPannel/SubcontractManager/editSubcon'>
                        <Button style={{backgroundColor: '#404040'}}
                                onClick={() => {editSubcon(subcontractor.ID)}}>
                          Edit
                        </Button>
                        </Link>
                   </tr>
                  
                ))}
                </tbody>
               </Table>

               <br/>
               <h3 style={{backgroundColor: '#404040',color: '#ffb84d',padding: "7px"}}>
               Tilers</h3>
               <Table striped bordered hover>
                <thead>
                  <tr class="p-3 mb-2 bg-warning text-dark"> 
                   <th>Company Name</th>    
                   <th>Email</th>
                   <th>Phone Number</th>
                   <th>Joined Date</th>
                   <th> </th>
                  </tr>
               </thead>
               <tbody>
               {tiler.map((subcontractor)=>(
                  <tr>
                      <td>{subcontractor.data.comName}</td>
                      <td>{subcontractor.data.email}</td>
                      <td>{subcontractor.data.phone}</td>
                      <td>{subcontractor.data.joinDate}</td>
                     
                       
                        <Button
                           style={{backgroundColor: '#005c99'}}
                        
                          onClick={() => { 
                              deleteSubcon(subcontractor.ID) }}
                        >
                          Delete
                        </Button>
                      
                        <Link to='/adminPannel/SubcontractManager/editSubcon'>
                        <Button style={{backgroundColor: '#404040'}}
                                onClick={() => {editSubcon(subcontractor.ID)}}>
                          Edit
                        </Button>
                        </Link>
                   </tr>
                  
                ))}
                </tbody>
               </Table>
            

               <br/>
               <h3 style={{backgroundColor: '#404040',color: '#ffb84d',padding: "7px"}}>
               Plumbers</h3>
               <Table striped bordered hover>
                <thead>
                  <tr class="p-3 mb-2 bg-warning text-dark"> 
                   <th>Company Name</th>    
                   <th>Email</th>
                   <th>Phone Number</th>
                   <th>Joined Date</th>
                   <th> </th>
                  </tr>
               </thead>
               <tbody>
               {plumber.map((subcontractor)=>(
                  <tr>
                      <td>{subcontractor.data.comName}</td>
                      <td>{subcontractor.data.email}</td>
                      <td>{subcontractor.data.phone}</td>
                      <td>{subcontractor.data.joinDate}</td>
                     
                     
                       
                        <Button
                            style={{backgroundColor: '#005c99'}}
                        
                          onClick={() => { 
                              deleteSubcon(subcontractor.ID) }}
                        >
                          Delete
                        </Button>
                      
                        <Link to='/adminPannel/SubcontractManager/editSubcon'>
                        <Button style={{backgroundColor: '#404040'}}
                                onClick={() => {editSubcon(subcontractor.ID)}}>
                          Edit
                        </Button>
                        </Link>
                   </tr>
                  
                ))}
                </tbody>
               </Table>
               <br/>
               <br/>
           </div>
        </div>
   )
  

}


export default DisplaySubcontractor;