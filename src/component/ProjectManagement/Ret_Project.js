import React,{useState,useEffect} from "react";
import { Pie } from 'react-chartjs-2';

import firebase,{query,where} from "../../firebase";
import { Link } from "react-router-dom";
import moment from 'moment';
import { useHistory } from "react-router-dom";
import { Modal,Col,Container,Row,Button,Card,Table,Offcanvas} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Ret_Project(props){

 

  let history=useHistory();
  const [updatePro, upOngoing] = useState(props);
  const [currentPro, setCurrent] = useState(props.currentid);


  const [id, setID] = useState("");
  const [title, setTitle] = useState("");
  const [budget, setBudget] = useState("");
  const [address, setAdd] = useState("");

  const [clientDet, setClient] = useState("Luki");
  //
  const [client, setClDet] = useState([]);

  
  const [startDate, setStart] = useState("");
  const [endDate, setEnd] = useState("");
  const [upPro, setProjectUp] = useState([]);//Ret of particular project

  const [loading, setLoading] = useState(false);

  const [updater, setUpdater] = useState(false);


  const [clientName, setClientName] = useState("Luki");

  //Pop ups
  const [lgShow, setLgShow] = useState(false);
  const [lgShow1, setLgShow1] = useState(false);
  const [lgShow2, setLgShow2] = useState(false);
  const [lgShow4, setLgShow4] = useState(false);

  //Employee Project Details 
  const [emplyeeProject, setEmp] = useState([]);

  //Supplier Details
  const [sup, setSupplier] = useState([]);

  //Subcontract Details
  const [sub, setSubcontract] = useState([]);

  //Client Payment
  const [pay, setPayments] = useState([]);

  //Salary Details
  let salaryamount=0;
  const [salary, setSalary] = useState([]);
  const [so, setSom] = useState([]);
  let Subamt=0;
  const [subC, setSubAmt] = useState(0);
  const [sal, setAmtSalary] = useState(0);
  
  let empSalary=0;


  //DB connection

  const editdb = firebase.firestore().collection("Con_Project").doc(currentPro);
  const deldb = firebase.firestore().collection("Con_Project");
  const clidb = firebase.firestore();
  const db=firebase.firestore(firebase);

  const dateDiffer = require("date-differ");


  const date={
    start:startDate,
    end:endDate,
    now:moment().format("DD-MM-YYYY")
  }

  //Retrieval of Single Project Details
  

  function deleteProject(currentPro){  //delete specific project
    alert(`Are you sure to delete the project ${title}`);
    

        const OldProject={
          title,
          budget,
          address,
          clientDet,
          startDate,
          endDate
        }
        db.collection("Fin_Project").add({
          Title: OldProject.title,
          Budget: OldProject.budget,
          Address:OldProject.address,
          Client:OldProject.clientDet,
          Start:OldProject.startDate,
          End:OldProject.endDate
        }).then((docRef) => {
          
          console.log("Document written with ID: ", docRef.id);

                  deldb.doc(currentPro).delete().then(() => {
                  console.log("Document successfully deleted! ");

                  alert(`Document Deleted Successfull ${currentPro}`);
                  window.location.replace("/adminPannel/ProjectManagement");
      
              
                    }).catch((error) => {
                        console.error("Error removing document: ", error);
                    })
          
          }).catch((error) => {
          console.error("Error adding document: ", error);
  });
  }

      
   

  

  function UpOngoing(proid){
   updatePro.updateid(proid);
  }


  //Client Details
 function retClient (name){
  
   setClientName(name);
   
       clidb.collection("clients").where("clientName","==",clientName)
            .get()
            .then((querySnapshot) =>{

                querySnapshot.forEach((doc) => {
              
                    setClDet(doc.data());
                    console.log("Client documents: ",doc.data());
                    

                });
                loader();
               
        })
        .catch(async(error) => {
          console.log("Error getting documents: ", error);
        });
  }

useEffect(() => {
  
  editdb.get().then( snapshot => setProjectUp(snapshot.data()),
  
      setClient(upPro.Client),
      setID(currentPro),
      setTitle(upPro.Title),
      setBudget(upPro.Budget),
      setAdd(upPro.Address),
      
      setStart(upPro.Start),
      setEnd(upPro.End),

     // retClient(upPro.Client),
     
  );
  
 

}, [editdb]);


function loader(){
if(loading==true){
  setLoading(false);
}
else{
  setLoading(true);
}}

function getProjectEmp(name){
      clidb.collection("Emp_Project").where("Project","==",name).get().then((item) => {
        const items = item.docs.map((doc) => ({
          id:doc.id,
          data:doc.data()
        }));
        setEmp(items);
    }).catch(async(error) => {
      console.log("Error getting documents: ", error);
    });
 
}
function getSuppliers(proname){
  
  clidb.collection("Order").where("projectTitle","==",proname).get().then((item) => {
    const items = item.docs.map((doc) => ({
      id:doc.id,
      data:doc.data()
    }));
    setSupplier(items);
}).catch(async(error) => {
  console.log("Error getting documents: ", error);
});

}

function getSubcontracts(projectName){
      clidb.collection("Subcontracts").where("Title","==",projectName).get().then((item) => {
        const items = item.docs.map((doc) => ({
          id:doc.id,
          data:doc.data()
        }));
        setSubcontract(items);
    }).catch(async(error) => {
      console.log("Error getting documents: ", error);
    });

}
function getClients(name){
  clidb.collection("payments").where("projectName","==",name).get().then((item) => {
    const items = item.docs.map((doc) => ({
      id:doc.id,
      data:doc.data()
    }));
    setPayments(items);
    }).catch(async(error) => {
      console.log("Error getting documents: ", error);
    });

}




function types(unit){
  if(unit == 'number'){
    return <h2>Tile</h2>
  }
  else if(unit == 'bags'){
    return <h6>Cement</h6>
  }else if(unit == 'bar'){
    return <h6>Steel</h6>
  }else if(unit == 'cube'){
    return <h6>Sand/Matal</h6>
  }else{
    return <h6>Undefined</h6>
  }

}

function sum(advance,first,second,full){
  let x=advance+first+second;
  let tot=0;

  //Checks whether amount paid exceeds the budget
  if(x>=full){
    tot=x;
  }else{
    tot=advance+first;
  }
  Subamt=tot;
  
 return tot;

}
//Suppliers total amount
function getSupAmount(){
 
  let suptot=0;
  sup.map(amt =>(
    suptot=suptot+amt.data.fullAmount
  ))
  return suptot;
}
//Client payments 
function getPay(){
  
let payment=0;
  pay.map(at =>(
    payment=at.data.amount+payment
  ))

  return payment;
}
//Checking function subcontracts
function contract(){
  return Subamt
}
function calSalary(amt){

  setAmtSalary(salaryamount=amt+salaryamount);
  console.log("calSalary function value: ", salaryamount);
}

  



function getEmpSalary(name){
  let employee="";
  let currentsal=0;
  clidb.collection("Emp_Project").where("Project","==",name).get().then((item) => {
    item.docs.map((doc) => (  doc.data().Employee,
       console.log("Employee Data" ,doc.data().Employee),
       
        clidb.collection("Salary").where("employee_name","==",doc.data().Employee).get().then((item) => {
          item.docs.map((doc) => (  doc.data().amount,
            console.log("Employee Retrieved Amount" ,doc.data().amount),
            calSalary(doc.data().amount),
            console.log("Salary Add Amount" ,currentsal)

            
          ))

        }).catch(async(error) => {
          console.log("Error getting documents: ", error);
        })
        

    ))   
  }
  ).catch(async(error) => {
    console.log("Error getting documents: ", error);
  }).finally(console.log("Seniding the  amount ",currentsal),
  );
  console.log("final amount ",currentsal);
  
}

//chart
const data = {
  labels: ['Budget',  'Subcontracts Expense','Suppliers Expense','Employees Expense'],
  datasets: [
    {
      label: 'Expenses Per Budget',
      data: [budget, contract(), getSupAmount(),sal],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(255, 99, 132, 0.2)',
       
      ],
      borderColor: [
        'rgba(255, 206, 86, 0.2)',
        'rgba(54, 162, 235, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(255, 99, 132, 1)',
      
      ],
      borderWidth: 1,
    },
  ],
};
const data2 = {
  labels: ['Budget', 'Client Payments'],
  datasets: [
    {
      label: 'Clinet Paid Amount',
      data: [budget,getPay() ],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      
      ],
      borderWidth: 1,
    },
  ],
};


  

    return(
      <div>

        <Container fluid="md">
        <br/><br/>
              <Row>
                <Col><h2>{title}</h2></Col>
                <Col>Start:<b> {startDate}</b>  End :<b>{endDate}</b></Col>

                <Col>
                  

                  <Row xs="auto">
                        <Col>
                            <Link to="/adminPannel/ProjectManagement/UpdatePro">
                                    <Button variant="warning" onClick={() => { UpOngoing(id); }}> Modify </Button>
                          </Link>
                        </Col>
                        <Col>
                            <Button variant="light" onClick={() => { retClient(clientDet); }}> ...</Button>
                        </Col>
                  </Row>
                      
                </Col>
              </Row>
              <br/><br/><br/><br/>
             
                  <Row>
                    <Col>Client Name: <b>{clientDet}</b></Col>
                    <Col>Client Tp:<b>{client.phone}</b> </Col>
                  </Row>
                  <br/><br/><br/><br/>
                  <Row>
                    <Col>Estimated Budget: <b>{budget}</b> </Col>
                    <Col>Project Address: <b>{address}</b></Col>
                  </Row>
                  <br/><br/><br/><br/>
                  <Row>
                    <Col><Button variant="warning" onClick={() => {setLgShow(true);getProjectEmp(title); getClients(title);}}>Employee</Button>
                    <Modal
                      size="lg"
                      show={lgShow}
                      onHide={() => setLgShow(false)}
                      aria-labelledby="example-modal-sizes-title-lg"
                    >
                      <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                          Employee
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                              <Card border="warning">
                                <Card.Body>
                                <Col >
                                                
                                                {emplyeeProject.map(emp =>(
                                                    <Table striped bordered hover>
                                                    <thead>
                                                      <tr>
                                                      
                                                        <th>Joined Date</th>
                                                        <th>Name</th>
                                                      </tr>
                                                    </thead>
                                                    <tbody>
                                                      <tr>
          
                                                        <td>{emp.data.Date}</td>
                                                        <td>{emp.data.Employee}</td>
                                                      </tr>
                                                    </tbody>
                                              </Table>
                                                 ))}
                                                    
                                                        
                                              
                                                </Col>

                                </Card.Body>
                              </Card>   
                      </Modal.Body>
                    </Modal>
                    
                    </Col>
                    <Col><Button variant="warning" onClick={() => {setLgShow1(true);getSubcontracts(title);}}>Subcontracts</Button>
                    <Modal
                      size="lg"
                      show={lgShow1}
                      onHide={() => setLgShow1(false)}
                      aria-labelledby="example-modal-sizes-title-lg"
                    >
                      <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                        Subcontracts
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                              <Card border="warning">
                                <Card.Body>
                                {sub.map(con =>(
                                   <Table striped bordered hover>
                                   <thead>
                                     <tr>
                                     
                                       <th>Start Date</th>
                                       <th>Estimated Amount</th>
                                       <th>Company Name</th>
                                       <th>Paid</th>
                                       <th>End Date</th>
                                     </tr>
                                   </thead>
                                   <tbody>
                                     <tr>

                                       <td>{con.data.StartDate}</td>
                                       <td>{con.data.EstimatedAmount}</td>
                                       <td>{con.data.comName}</td>
                                       <td>{sum(con.data.advance_money,con.data.first_phase,con.data.second_phase,con.data.EstimatedAmount)}</td>
                                       <td>{con.data.EndDate}</td>
                                     </tr>
                                   </tbody>
                             </Table>

                                ))}

                                </Card.Body>
                              </Card>

                      </Modal.Body>
                    </Modal>
                    
                    </Col>
                    <Col><Button variant="warning" onClick={() => {setLgShow2(true);getSuppliers(title);}}>Suppliers</Button>
                    <Modal
                      size="lg"
                      show={lgShow2}
                      onHide={() => setLgShow2(false)}
                      aria-labelledby="example-modal-sizes-title-lg"
                    >
                      <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                          Suppliers
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                              <Card border="warning">
                                <Card.Body>
                                {sup.map(order =>(
                                      <Table striped bordered hover>
                                          <thead>
                                            <tr>
                                            
                                              <th>Amount</th>
                                              <th>Quantity</th>
                                              <th>Unit</th>
                                              <th>Type</th>
                                              <th>Order Status</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            <tr>

                                              <td>{order.data.fullAmount}</td>
                                              <td>{order.data.quantity}</td>
                                              <td>{order.data.unit}</td>
                                              <td>{types(order.data.unit)}</td>
                                              <td>{order.data.orderStatus}</td>
                                            </tr>
                                          </tbody>
                                    </Table>

                                ))}
                                
                                </Card.Body>
                              </Card>
                      </Modal.Body>
                    </Modal>
                    
                    </Col>
                    </Row>
                 
                  <br/><br/><br/><br/>
                  <Row>
                    <Col md={{ span: 4, offset: 4 }}><Button variant="success" onClick={() => {setLgShow4(true);getEmpSalary(title);}}>Summary</Button>
                    
                              <Modal
                                size="lg"
                                show={lgShow4}
                                onHide={() => setLgShow4(false)}
                                aria-labelledby="example-modal-sizes-title-lg"
                                
                              >
                                <Modal.Header closeButton>
                                  <Modal.Title id="example-modal-sizes-title-lg" >
                                
                                  <Card border="warning" >
                                    <Card.Body> 
                                      
                                         <Card bg="success" >
                                          <Card.Body> Summary Report</Card.Body>
                                        </Card>
                                      </Card.Body>
                                  </Card>
                                
                                   
                                  </Modal.Title>
                                </Modal.Header>
                                <Modal.Body >

                                  <Col md={{ offset: 2 }}>
                                    <Row>
                                      <h3>Project Title: <b>{title}</b></h3>
                                    </Row>
                                  </Col>
                                  <Col>
                                    <Row><h5><b>Date       : </b>{moment().format("DD-MM-YYYY")}</h5></Row>
                                    <Row><h5><b>Client Name: </b>{clientDet}</h5></Row>
                                  </Col>
                                  <br/><br/>
                                  <Col md={{ offset: 3 }}>
                                    <Row><h5><b>Budget :</b> {budget}</h5></Row>
                                    <br/>
                                    <Row><h5><b>Current Payment :</b>{getPay()} </h5></Row>
                                    <Row>
                                    
                                    <Col md={{ offset: 2 }}>
                                         <Row><h5><b>Suppliers Expense :</b> {getSupAmount()}</h5></Row>
                                         <Row><h5><b>Subcontracts Expense :</b> {Subamt}</h5></Row>
                                         <Row><h5><b>Employee Expense :</b> {sal}</h5></Row>
                                         <br/>
                                         <Row><h5><b>Total Expense:</b> {getSupAmount()+Subamt+sal}</h5></Row>
                                    </Col>
                                    </Row>
                                    <br/><br/>
                                    
                                    
                                  </Col>
                                  <Col>
                                      <Row>
                                        <Col><Row><h5><b>Amount After Expenses:</b>{getPay()-(getSupAmount()+Subamt+sal)} </h5></Row></Col>
                                        <Col><Row><h5><b>Amount to be Paid:</b>{budget-(getPay())} </h5></Row></Col>
                                      </Row>
                                         
                                         
                                    </Col>
                                  <Row><h6>Budget over Expenses</h6><Pie data={data} /><h1>  </h1><h6>Budget over Client Payments</h6><Pie data={data2} /></Row>
                                  <Col>
                                     
                                    </Col>
                                </Modal.Body>
                              </Modal>
                    </Col>
                    <Col md={{ span: 6, offset: 7 }} ><Button variant="danger"  onClick={() => {if(window.confirm('Are you sure to Close this Project?')){ deleteProject(currentPro)};}}>Close Project</Button></Col>
                  </Row>

        </Container>
      </div>
      
    );
}