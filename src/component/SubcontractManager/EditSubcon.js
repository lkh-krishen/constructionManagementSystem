import React, { useState, useEffect } from "react";
import firebase from "../../firebase";
import { Form, Button,Container,Row,Col,Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import editsubconpic from "../SubcontractManager/Images/abc.jpg";

function EditSubcon(props) {
    const db=firebase.firestore();
    const [ comName , setComName ] = useState("");
    const [ type , setType ] = useState("");
    const [ email , setEmail ] = useState("");
    const [ phone , setPhone ] = useState("");
    const [ joinDate , setJoinDate ] = useState("");
    const [ types, setTypes ] = useState([]);
    const [ subcontractorId, setSubcontractorId ] = useState(props.id);
    
  useEffect(() =>{
        //----------------subcontractor types ------------------------
      db.collection("types").onSnapshot((snapshot)=>{
    
        const arr =snapshot.docs.map((doc) => (doc.data().typeName));
        setTypes(arr);
    
    })
  },[db]);

  
  useEffect(() => {

    db.collection("subcontractors").doc(subcontractorId.toString()).get()
      .then((docs) => {
        if(docs.exists){
          setComName(docs.data().comName);
          setType(docs.data().type);
          setEmail(docs.data().email);
          setPhone(docs.data().phone);
          setJoinDate(docs.data().joinDate);
        }else{
          alert("No such document available");
        }
      }).catch((error) => {
        console.log("Error getting document:", error);
      });

  }, [db,subcontractorId]);

  function editdata(e) {
    e.preventDefault();
    alert("editdone");
    const updatedSubcontractor ={
            comName,
            type,
            email,
            phone,
            joinDate
    }
    console.log(updatedSubcontractor);
    db.collection("subcontractors").doc(subcontractorId).update(updatedSubcontractor);
    
  }

  return (
    <div style={{backgroundColor : ' #f5f6fa'}}>  
    <Container>
    <Row>
    <Col>
     <div className="container">
     <h3 class="text-center" style={{color: '#f0ad4e'}}><br/>Edit Details:  {comName} </h3>

      <Form onSubmit={editdata} style={{backgroundColor : 'white'}}>
        <Form.Group controlId="formBasicName">
          <Form.Label>Company Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Company Name"
            value={comName}
            onChange={(e) => {
                setComName(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Control as="select" onChange={(e)=>{setType(e.target.value);}}>
                <option value="">selectType</option>
                {types.map(type=>(
                    <option value={type.typeName}>{type.typeName}</option>
                ))}
        </Form.Control>
     

        <Form.Group controlId="formBasicEmail">
               <Form.Label>Email</Form.Label>
               <Form.Control 
                  type="email" 
                  placeholder="abc@gmail.com" 
                  value={email} 
                  onChange={(e) => {setEmail(e.target.value);}}/>
           </Form.Group>


           <Form.Group controlId="formBasicPhone">
               <Form.Label>Phone Number</Form.Label>
               <Form.Control 
                  type="phone" 
                  pattern="[0-9]{10}" size="10" 
                  value={phone} 
                  onChange={(e) => {setPhone(e.target.value);}}/>
           </Form.Group>


           <Form.Group controlId="formBasicDate">
              <Form.Label>Joining Date</Form.Label>
              <Form.Control 
                  type="date" 
                  value={joinDate} 
                  onChange={(e) => {setJoinDate(e.target.value);}} />
           </Form.Group>


        <Button variant="primary" type="submit" style={{width:  609 ,backgroundColor: '#ffb84d',color: '#404040'}}>
          Submit
        </Button>
        <br/>
        <br/>
      </Form>
    </div>
    </Col>
    <Col>
          <br/>
          <br/>
          <br/>
            <div>
               <Image src={editsubconpic} fluid className= "addsubconpic" thumbnail style={{border:"none", height:448}}/>
            </div>
         </Col>
    </Row>
    </Container>
   </div> 
  )
}

export default EditSubcon;
