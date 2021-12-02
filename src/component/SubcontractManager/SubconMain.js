import React from 'react';
import {Button,Table,Row,Col,Image,Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";

import addsubconpic from "../SubcontractManager/Images/4775.jpg"

function SubconMain() {

  return (


    <div style={{backgroundColor : ' #f5f6fa'}}>
        
        
       <div className="container">
       <br/>
       <br/>  
       <br/> <br/> <br/>
       <br/>
        <div style={{color: '#ffb84d'}}> </div>
         <br/>
       <div className="container" style={{backgroundColor : 'white',width: 900,height: 400}}>
       <br/>   <br/>
      
              
       <Container>
        <Row>
          <Col >
          <div className="container">
          <div className="container">  
          <center> <h3 class="text-warning">Subcontractors </h3> </center>
     
             <br/>
          <Link to='/adminPannel/SubcontractManager/addSubcon'  className="link1" >
              <>
              <Button style={{width: 300}}variant="outline-warning">Add New Subcontractor</Button>{' '}
              </>
              </Link>
              <br/>
              <br/>
             <Link to='/adminPannel/SubcontractManager/displaySubcontractors'  className="link1" >
             <>
              <Button style={{width: 300}} variant="outline-warning">Subcontractor's Details</Button>{' '}
            </>
            </Link>
            <br/>
            <br/>
              <Link to='/adminPannel/SubcontractManager/report'  className="link1" >
              <>
              <Button style={{width: 300}} variant="outline-warning">Payments Report</Button>{' '}
              </>
              </Link>
             </div> 
             </div>
          </Col>
          <Col>
          <Image src={addsubconpic} fluid className= "addsubconpic" thumbnail style={{border:"none"}}/>
          </Col>
          
       </Row>
  
       </Container>       
       
      </div>
     </div>
    </div>


  );



}

export default SubconMain;