import React,{useState,useEffect} from "react";
import firebase from "../../firebase";
import { Card, Button,Row,Col,Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


export default function OngoingProject(props){


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
  const nDate= new Date();
  const [stitle, setSearch] = useState("");
  

  const unit="days";

  const dateDiffer = require("date-differ");

  //Database connection 

  const db1 = firebase.firestore().collection("Con_Project");
  const db2 = firebase.firestore().collection("clients");

  

//Retrieval of Client Function
  function RetClient(e){

   
    db2.get().then((item) => {
      const items = item.docs.map((doc) => ({
        id:doc.id,
        data:doc.data()
      }));
      setClientName(items);
  
    });
   
  }
  

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


//Retrieval of Single Project Details
function retProject(pro){
  const editdb = firebase.firestore().collection("Con_Project").doc(pro);

  editdb.get().then(snapshot => setProjectUp(snapshot.data()));
  setID(pro);
  setTitle(upPro.Title);
  setBudget(upPro.Budget);
  setAdd(upPro.Address);
  setClient(upPro.Client);
  setStart(upPro.Start);
  setEnd(upPro.End);
  RetClient();



}

//Edit Data

function editProject(e) {
  e.preventDefault();

  const editProject={
    title,
    budget,
    address,
    clientDet,
    startDate,
    endDate
  }
 
  db1.doc(id).update({
    Title: editProject.title,
    Budget: editProject.budget,
    Address:editProject.address,
    Client:editProject.clientDet,
    Start:editProject.startDate,
    End:editProject.endDate
  }).then(() => {
    alert("Data updated Succesfully: ");
    loader();
  })
    .catch((err) => {
      console.error(err);
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
  
function RetOngoing(id) {
  onproject.CurProject(id);

  }
  function SearchProject(stitle){
    onproject.SearchPro(stitle);

  }

  useEffect(() => {
    RetData();
    RetClient();
   
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
            <br/><br/>
              <Row>
                <Col md={{ span: 4, offset:  4}}>
                  <Form>
                    <Form.Group className="mb-3" controlId="formBasicSearch">
                      <Form.Label></Form.Label>
                      <Form.Control type="text" placeholder="Search ......." value={stitle} onChange={e => setSearch(e.target.value)}/>
                    </Form.Group>
                    <Col  md={{ span: 4, offset:  4}}>
                    <Link to="/adminPannel/ProjectManagement/Search">
                       <Button variant="dark" onClick={() => { SearchProject(stitle); }} > Search </Button>
                       </Link>
                    </Col>
                   
                  </Form>
                </Col>


                <Col  md={{ span: 4, offset:  10}}>
                 <Link to="/adminPannel/ProjectManagement/Add">
                       <Button variant="outline-info"> New Project </Button>
                   </Link>
                </Col>
              </Row>
              <br/><br/>
                <Row>
                    <Col md={{ span: 9, offset: 2 }}>
                    {project.map(pro=>(
                        <Card  border="warning">
                            <Card.Header variant="outline-info" as="h5">{pro.data.Title}</Card.Header>
                            <Card.Body >
                                <Card.Title>Client Name: {pro.data.Client}</Card.Title>
                                <Card.Text>
                                        <Row>
                                            <Col md={{ span: 9, offset: 2 }}> Project Address: {pro.data.Address}</Col>
                                            <Col md={{ span: 4, offset: 9 }}> Duration: {getDays(pro.data.Start,pro.data.End)}
                                          
                                             </Col>
                                        </Row>
                                </Card.Text>
                                <Row>
                                    <Col md={{ span: 4, offset: 8 }}> <Link to="/adminPannel/ProjectManagement/RetProject">
                                                                         <Button variant="warning" onClick={() => { RetOngoing(pro.id); }} > More info </Button>
                                                                        </Link>
                                      </Col>
                                </Row>
                               
                            </Card.Body>
                         </Card>
                        
                         
                      ))}
                    
                    
                    </Col>
                    <br/>
                </Row>
          </Container>
          
       
     </div>

      );
}