import React,{useState,useEffect} from "react";
import firebase from "../../firebase";
import { Card, Button,Row,Col,Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import date from "diff-dates"; 
import dateformat from "dateformat";
import "bootstrap/dist/css/bootstrap.min.css";


export default function CompProject(props){


  //Declaration of Variables  
  const [onproject, setOngoing] = useState(props);
  const [project, setProject] = useState([]);
  const [upPro, setProjectUp] = useState([]);//Ret of particular data
  const [client, setClientName] = useState([]);//Client details ret
  const [id, setID] = useState("");
  const [title, setTitle] = useState("");
  const [budget, setBudget] = useState("");
  const [address, setAdd] = useState("");
  const [clientDet, setClient] = useState("");
  const [startDate, setStart] = useState(""); 
  const [endDate, setEnd] = useState("");
  const [loading, setLoading] = useState(false);
  const unit="days";

  const dateDiffer = require("date-differ");

  //Database connection

  const db1 = firebase.firestore().collection("Fin_Project");
  //const db2 = firebase.firestore().collection("clients");


  

//Retrieval of Project Details

function RetData(e){

   
  db1.get().then((item) => {
    const items = item.docs.map((doc) => ({
      id:doc.id,
      data:doc.data()
    }));
    setProject(items);

  });
 
}





//Date Difference
function getDays(date1, date2) {
  
      
 
  const result = dateDiffer({
    from: date1,
    to: date2,
    days: true,
  });
   
    return result;
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

  

    return(
      <div>
          <Container fluid="sm">
            <Row>
            <Col md={{ span: 50, offset: 5 }}>
                    <Button variant="warning" size="lg" disabled>
                     Completed Projects
                    </Button>
                    </Col>
           </Row>
           <br/>
                     <br/>
                <Row>
                    <Col md={{ span: 9, offset: 2 }}>
                    {project.map(pro=>(
                        <Card  border="dark">
                            <Card.Header as="h5">{pro.data.Title}</Card.Header>
                            <Card.Body>
                                <Card.Title>Client Name: {pro.data.Client}</Card.Title>
                                <Card.Text>
                                        <Row>
                                            <Col md={{ span: 9, offset: 2 }}> Project Address: {pro.data.Address}</Col>
                                            <Col md={{ span: 9, offset: 2 }}> Budget: {pro.data.Budget}</Col>

                                            <Col md={{ span: 4, offset: 9 }}> Total Duration: {getDays(pro.data.Start,pro.data.End)} </Col>
                                        </Row>
                                </Card.Text>
                               
                            </Card.Body>
                         </Card>
                         
                      ))}
                    
                    
                    </Col>
                </Row>
          </Container>
          
       
     </div>

      );
}