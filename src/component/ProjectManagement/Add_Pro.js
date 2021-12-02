import React,{useState,useEffect} from "react";
import firebase from "../../firebase";
import { Form, Button,Row,Col,Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";



export default function AddProject(){

  //Declaration of Variables
  const [client, setClientName] = useState([]);
  const [title, setTitle] = useState("");
  const [budget, setBudget] = useState("");
  const [address, setAdd] = useState("");
  const [clientDet, setClient] = useState("");
  const [startDate, setStart] = useState("");
  const [endDate, setEnd] = useState("");
  const [loading, setLoading] = useState(false);

  
  //Database Connections
  const db1 = firebase.firestore().collection("clients");
  const db=firebase.firestore(firebase);


 //Retrieval of Client Function
  function RetData(e){

   
    db1.get().then((item) => {
      const items = item.docs.map((doc) => ({
        id:doc.id,
        data:doc.data()
      }));
      setClientName(items);
  
    });
   
  }
  useEffect(() => {
    RetData();
   
  }, [loading]);

  
function loader(){
  if(loading==true){
    setLoading(false);
  }
  else{
    setLoading(true);
  }
  
}

 //Add Project  
 function AddData(e){
  
  e.preventDefault();

  const newProject={
    title,
    budget,
    address,
    clientDet,
    startDate,
    endDate
  }
  db.collection("Con_Project").add({
    Title: newProject.title,
    Budget: parseFloat(newProject.budget),
    Address:newProject.address,
    Client:newProject.clientDet,
    Start:newProject.startDate,
    End:newProject.endDate
  }).then((docRef) => {
    
    console.log("Document written with ID: ", docRef.id);
    

    setTitle("");
    setBudget("");
    setAdd("");
    }).catch((error) => {
    console.error("Error adding document: ", error);
  });

}

  




  

    return(
     <div>
    <Container fluid="sm" >
        <Row>
          <Col md={{ span: 5, offset: 3 }}>
              <br/>
              <br/>
                <Form onSubmit={AddData}>
                <Form.Group  controlId="formGridState" align="center" >
                    <Form.Label size="lg" >New Project</Form.Label>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicTitle">
                    <Form.Label>Project Title</Form.Label>
                      <Form.Control type="text" placeholder="Project_Resort"  pattern="[A-Za-z]+_[A-Za-z]+$" value={title} onChange={e => setTitle(e.target.value)}  required/>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicBudget">
                    <Form.Label>Project Budget</Form.Label>
                      <Form.Control type="number" placeholder="Rs1250000" pattern="[0-9]{10}" value={budget} onChange={e => setBudget(e.target.value)}  required/>
                  </Form.Group>
                  
                  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Project Address</Form.Label>
                    <Form.Control as="textarea" rows={3} value={address} pattern="^[A-Za-z \s*]+$" onChange={e => setAdd(e.target.value)}  required/>
                  </Form.Group>
                  
                  <Form.Label>Select Client</Form.Label>
                  <Form.Control as="select" aria-label="Default select example" size="xxl" value={clientDet} onChange={e => setClient(e.target.value)}  required>
                        
                        {client.map(clients=>(
                            <option  >{clients.data.clientName}</option>
                        ))}
                   </Form.Control>
                  
                

                  
            
                  <br/>
                     <br/>


                  <Form.Group  controlId="formGridState">
                    <Form.Label>Project Duration</Form.Label>
                  </Form.Group>
                  <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicDate">
                          <Form.Label>Start Date</Form.Label>
                            <Form.Control type="date" placeholder="Project_Restraunt" value={startDate} onChange={e => setStart(e.target.value)}  required/>
                        </Form.Group>

                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicDate">
                          <Form.Label>End Date</Form.Label>
                            <Form.Control type="date" placeholder="Project_Restraunt" value={endDate} onChange={e => setEnd(e.target.value)}  required/>
                        </Form.Group>
                    </Col>


                  </Row>
                  

                  
                      <Button variant="warning" type="submit">
                              Submit
                        </Button>
                </Form>
          </Col>
        </Row>
      </Container>

</div>
   
      
    );
}

 
