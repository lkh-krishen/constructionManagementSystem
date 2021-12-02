import React, { useState,useEffect } from 'react';
import {Form ,Button,Container,Row,Col,Image} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from "../../firebase";
import addsubconpic from "../SubcontractManager/Images/4775.jpg"

function AddSubcontractor() {

   //get data from form and store-------------------------------------------------------------
   const [ comName , setComName ] = useState("");
   const [ type , setType ] = useState("");
   const [ email , setEmail ] = useState("");
   const [ phone , setPhone ] = useState("");
   const [ joinDate , setJoinDate ] = useState("");
   const [ types, setTypes ] = useState([]);
   const db = firebase.firestore();

   //validation-------------------------------------------------------------------------------
   const[form , setForm] = useState({});
   const[errors,setErrors] = useState({});

   //bring types data to selection------------------------------------------------------------
   useEffect(() => {

    db.collection('types').onSnapshot(snapshot=>{
  
        const arr =snapshot.docs.map(doc =>doc.data());
        
        setTypes(arr);
        

      })
   
    }, [db])

    function sendData(e){
      e.preventDefault();
      const newErrors = findFormErrors()
      if ( Object.keys(newErrors).length > 0 ) {
        // We got errors!
        setErrors(newErrors)
      } else {
      alert("New Subcontractor Added");
      const newSubcontractor={
          comName,
          type,
          email,
          phone,
          joinDate,
      }
      console.log(newSubcontractor);

      


      db.collection("subcontractors").doc().set(newSubcontractor)
      .then(() => {
          console.log("Successfully Added !");
      })
      .catch((error) => {
          console.error("Error : ", error);
      });

        setComName("");
        setType("");
        setEmail("");
        setPhone("");
        setJoinDate("");
    }};
    
    //function for validation--------------------------------------------------------------------------
   const setField = (field, value) => {
      setForm({
        ...form,
        [field]: value
      })
       // Check and see if errors exist, and remove them from the error object
    if ( !!errors[field] ) setErrors({
      ...errors,
      [field]: null
    })
    };
  const findFormErrors = () =>{
    const {name,email} = form
    const newErrors = {}
    //Company name null
    if(!name || name === '') newErrors.name = '* Required'
    //type is null
    if(!type || type === '') newErrors.type = '* Required'
    //email null
    if(!email || email === '') newErrors.email = '* Required'
    //phone number null or more than 10 or less than 10
    if(!phone || phone === '') newErrors.phone = '* Required'
     else if ( phone.length > 10 ) newErrors.phone = 'Should not be more than 10 numbers'
      else if ( phone.length < 10 ) newErrors.phone = 'Should not be less than 10 numbers'
    //date is null
    if(!joinDate || joinDate === '') newErrors.joinDate = '* Required'   
   
    return newErrors
  }

  

    return (
     <div style={{backgroundColor : ' #f5f6fa'}}>  
    
      <div className="container" >  
      <div className="container">  
      
       <br/>
       <br/>
         
         <h3 class="text-center" style={{color: '#f0ad4e'}}><br/>Add New Subcontractor</h3>
        
       <br/>
       <br/>
       <div className="container" style={{backgroundColor : 'white'}}>
       <Container>
        <Row>
          <Col>
          <div>
          <div className = "addSubcontractorForm"  style={{color : 'black' }}>
            <Form className="subForm" 
            onSubmit={sendData} style={{backgroundColor : 'white'}} class="text-center">
               <br/>
               <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label class="text-center">Company Name</Form.Label>
                  <Form.Control type="text"  
                                placeholder="Enter Company Name" 
                                value={comName} 
                                onChange={(e) => {setComName(e.target.value); setField('name',e.target.value)}} 
                                isInvalid={ !!errors.name }/>
                  <Form.Control.Feedback type='invalid'>
                   { errors.name }
                  </Form.Control.Feedback>
               </Form.Group>
 
        
               <Form.Control as="select" onChange={(e)=>{setType(e.target.value);setField('type',e.target.value)}} 
                     isInvalid={ !!errors.type } >
                        <Form.Control.Feedback type='invalid'>
                          { errors.type}
                        </Form.Control.Feedback>
                    <option value="">selectType</option>
                    {types.map(type=>(
                        <option value={type.typeName}>{type.typeName}</option>
                    ))}
                    
                </Form.Control>
         

               <Form.Group className="mb-3" controlId="formBasicEmail">
                   <Form.Label>Email</Form.Label>
                   <Form.Control type="email" placeholder="abc@gmail.com" 
                    value={email} onChange={(e) => {setEmail(e.target.value);setField('email',e.target.value)}}
                    isInvalid={ !!errors.email }/>
                  <Form.Control.Feedback type='invalid'>
                   { errors.email }
                  </Form.Control.Feedback>
               </Form.Group>

              <Row>
                <Col>
               <Form.Group className="mb-3" controlId="formBasicPhone">
                   <Form.Label>Phone Number</Form.Label>
                   <Form.Control type="phone" pattern="[0-9]{10}" size="10" 
                     value={phone} onChange={(e) => {setPhone(e.target.value);setField('phone',e.target.value)}}
                     isInvalid={ !!errors.phone }/>
                  <Form.Control.Feedback type='invalid'>
                   { errors.phone }
                  </Form.Control.Feedback>
               </Form.Group>
               </Col>
               <Col>
               <Form.Group className="mb-3" controlId="formBasicDate">
                  <Form.Label>Joining Date</Form.Label>
                  <Form.Control type="date" 
                    value={joinDate} onChange={(e) => {setJoinDate(e.target.value);setField('joinDate',e.target.value)}} 
                    isInvalid={ !!errors.joinDate }/>
                  <Form.Control.Feedback type='invalid'>
                   { errors.joinDate }
                  </Form.Control.Feedback>
               </Form.Group>
               </Col>
              </Row>
              <Button variant="warning" type="submit" style={{width:  609 ,color: '#404040'}}>
                  Submit
               </Button>
               <br/>
               <br/>
               
           </Form>
          </div> 
          </div>
         </Col> 
         <Col>
            <div>
             
            
                <Image src={addsubconpic} fluid className= "addsubconpic" thumbnail style={{border:"none"}}/>
            </div>
         </Col>
       </Row>
      </Container>
      </div>
     </div>
     </div>
     <br/>
     <br/>
     <br/>
     <br/>
    </div>
     
    )
}

export default AddSubcontractor;