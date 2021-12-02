import React,{useState,useEffect} from "react";
import firebase from "../../firebase";
import { Card, Button,Row,Col,Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import date from "diff-dates"; 
import dateformat from "dateformat";
import "bootstrap/dist/css/bootstrap.min.css";


export default function Search(props){


  //Declaration of Variables

  const [proSearchtitle, setSTitle] = useState(props.title);
  const [onproject, setOngoing] = useState(props);
  const [project, setProject] = useState([]);
  const [upPro, setProjectUp] = useState([]);//Ret of particular data
  const [client, setClientName] = useState([]);//Client details ret
  const [id, setID] = useState("");
  const [title, setTitle] = useState(props.title);
  const [budget, setBudget] = useState("");
  const [address, setAdd] = useState("");
  const [clientDet, setClient] = useState("");
  const [date1, setStart] = useState(project.Start); 
  const [date2, setEnd] = useState(project.End);
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

function RetSearchData(e){

   
  db1.where("Title","==",proSearchtitle).get().then((item) => {
    const items = item.docs.map((doc) => ({
      id:doc.id,
      data:doc.data()
    }));
    setProject(items);

  });
 
}
function RetData (proSearchtitle){
  
    setTitle(proSearchtitle);
    
    db1.where("Title","==",title)
             .get()
             .then((querySnapshot) =>{
 
                 querySnapshot.forEach((doc) => {
               
                     setProject(doc.data());
                     
                     
 
                 });
                 loader();
                
         })
         .catch(async(error) => {
           console.log("Error getting documents: ", error);
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
function SearchProject(stitle){
  onproject.SearchPro(stitle);

}

//Date Difference
function getDays(date1,date2) {
  
      
   
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
    db1.where("Title","==",title)
             .get()
             .then((querySnapshot) =>{
 
                 querySnapshot.forEach((doc) => {
               
                     setProject(doc.data());
                     setID(doc.id);
                   
                     
 
                 });
                 loader();
                
         })
         .catch(async(error) => {
           console.log("Error getting documents: ", error);
         });
    
    
   
  }, [db1,title]);

  
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
        
                       <Button variant="dark" onClick={() => { RetData(stitle); }} > Search </Button>
          
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

                        <Card  border="warning">
                            <Card.Header variant="outline-info" as="h5">{project.Title}</Card.Header>
                            <Card.Body >
                                <Card.Title>Client Name: {project.Client}</Card.Title>
                                <Card.Text>
                                        <Row>
                                            <Col md={{ span: 9, offset: 2 }}> Project Address: {project.Address}</Col>
                                            <Col md={{ span: 4, offset: 9 }}>  Duration: 72 days
                                          
                                             </Col>
                                        </Row>
                                </Card.Text>
                                <Row>
                                    <Col md={{ span: 4, offset: 8 }}> <Link to="/adminPannel/ProjectManagement/RetProject">
                                                                         <Button variant="warning" onClick={() => { RetOngoing(id); }} > More info </Button>
                                                                        </Link>
                                      </Col>
                                </Row>
                               
                            </Card.Body>
                         </Card>
                        
                         
                    
                    
                    </Col>
                    <br/>
                </Row>
          </Container>
          
       
     </div>

      );
}