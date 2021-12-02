import React,{useState,useEffect} from "react";
import firebase from "../../firebase";
import { Form, Button,Row,Col,Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import PageHeader from "./PageHeader";
import PersonIcon from '@material-ui/icons/Person';



export default function AddEmplyee_Pro(){

  //Declaration of Variables
  const [project, setProject] = useState([]);
  const [totEmp, setEmployee] = useState([]);
  const [positions , setPositions] = useState([]);
  const [title, setTitle] = useState("");
  const [emp, setEmp] = useState("");
  const [date, setDate] = useState("");
  
 

  //Database Connections
  const db1 = firebase.firestore().collection("Con_Project"); 
  const db2 = firebase.firestore().collection("employees");

  const db=firebase.firestore(firebase);


 //Retrieval of Projects
  function RetProject(e){

   
    db1.get().then((item) => {
      const items = item.docs.map((doc) => ({
        id:doc.id,
        data:doc.data()
      }));
      setProject(items);
  
    });
   
  }
   //Retrieval of Employee
   function RetEmp(e){

   
    db2.get().then((item) => {
      const items = item.docs.map((doc) => ({
        id:doc.id,
        data:doc.data()
      }));
      setEmployee(items);
  
    });
   
  }
  

  
  

 //Add Employee to the project database
 function AddData(e){
  
  e.preventDefault();

  const newEmployee={
    title,
    emp,
    date
 
  }
  db.collection("Emp_Project").add({
    Project : newEmployee.title,
    Employee: newEmployee.emp,
	Date :newEmployee.date,
  }).then((docRef) => {
    
    console.log("Document written with ID: ", docRef.id);
    

    setTitle("");
    setEmp("");
    setDate("");

    }).catch((error) => {
    console.error("Error adding document: ", error);
  });

}
//calling function
useEffect(() => {
  RetProject();
  RetEmp();

 
}, []);
  




  

    return(
      <>
      <PageHeader
      title="Employee Project"
      //subTitle="Form design with validation"
      icon={<PersonIcon fontSize="large" />}
      />

      <div>
     
      <Container fluid="sm" >
        <Row>
          <Col md={{ span: 5, offset: 3 }}>
              
              <Form onSubmit={AddData}>
				  
					  <Form.Group className="mb-3" controlId="formBasicTitle">
							<Form.Label>Project Title</Form.Label>
					  </Form.Group>
				  
								  <Form.Control  as = "select" aria-label="Default select example" size="xxl" value={title} onChange={e => setTitle(e.target.value)}>
										<option>Select Project</option>
										{project.map(projects=>(
											<option  >{projects.data.Title}</option>
										))}
								   </Form.Control>
				   
				   
				   
				   <Form.Group className="mb-3" controlId="formBasicTitle">
                    
                  </Form.Group>
                  
                <Form.Label>Employee List</Form.Label>  
							  <Form.Control as  = "select" aria-label="Default select example" size="xxl" value={emp} onChange={e => setEmp(e.target.value)}>
									
									{totEmp.map(emp=>(
										<option  >{emp.data.employeeName}</option>
									))}
							   </Form.Control>


				   
				   
				    <Form.Group className="mb-3" controlId="formBasicDate">
                          <Form.Label>Date</Form.Label>
                            <Form.Control type="date" placeholder="Employee Added" value={date} onChange={e => setDate(e.target.value)}/>
                    </Form.Group>
				   


				   
				   

                 
                  

                  
                      <Button variant="success" type="submit">
                              Submit
                        </Button>
                </Form>
          </Col>
        </Row>
      </Container>
   
      </div>

    </>
      
    );
}

 
