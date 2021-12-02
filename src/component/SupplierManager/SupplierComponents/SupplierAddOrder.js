import React,{useEffect,useState} from 'react'
import "../Styles/SupplierAddOrder.css";
import { Col,Button,Form,Row } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import firebase from '../../../firebase';
var db = firebase.firestore();

export default function SupplierAddOrder(props) {

    const [supplierID, setSupplierID] = useState(props.supplierID);

    const[projectTitle, setProjectTitle]= useState("");
    const [orderStatus , setOrderStatus]= useState("");
    const[unit, setUnit] = useState("");
    const[quantity,setQuantity] = useState("");
    const [orderDate,setOrderDate] = useState("");
    const[dueDate,setDueDate] = useState("");
    const [advancePayment, setAdvancePayment] = useState("");
    const [fullAmount, setFullAmount] = useState("");

    const [projects,setProjects] = useState([]);

    //error states
    const [quantityError,setQuantityError] = useState("");
    const [unitError,setUnitError] = useState("");
    const [advancePaymentError,setAdvancePaymentError] = useState("");
    const [fullAmountError,setFullAmountError] = useState("");
    const [orderDateError,setOrderDateError] = useState("");
    const [dueDateError,setDueDateError] = useState("");

    //get project titles
    function getProjectTitles(){

        const projectsArry = [];

        db.collection("Con_Project").onSnapshot(snapshot=>{

                snapshot.docs.forEach(doc=>{

                    // projectsArry.push(doc.id);

                    projectsArry.push(doc.data());
                    // console.log(doc.id);
                });

                // console.log(projectsArry);
                setProjects(projectsArry);
        })
         
    }

    useEffect(() => {

        getProjectTitles();

    }, []);


    function sendSupplierOrderData(e){
        e.preventDefault();

        if(isValid()){
            
            //send Order details to database
            db.collection("Order").doc().set({

                supplierID:supplierID,
                projectTitle:projectTitle,
                orderStatus:orderStatus,
                unit:unit,
                quantity:parseFloat(quantity),
                orderDate:new Date(orderDate),
                dueDate :new Date(dueDate),
                advancePayment:parseFloat(advancePayment),
                fullAmount:parseFloat(fullAmount)
            
                
            }).then(()=>{
                alert("New Order added");
            
            }).catch((e)=>{
                alert(e.message)
                
            });

            //reset
            setProjectTitle('');
            setOrderStatus("");
            setUnit("");
            setQuantity("");
            setOrderDate("");
            setDueDate("");
            setAdvancePayment("");
            setFullAmount("");
            setQuantityError("");
            setUnitError("");
            setOrderDateError("");
            setDueDateError("");
            setAdvancePaymentError("");
            setFullAmountError("");
            setSupplierID(props.supplierID);
          
        }
       
       
    }

    //validation 
    function isValid(){

        if(quantity === "" || parseFloat(quantity) === 0 ){
            
            if(quantity === "")
                setQuantityError("Quantity is required");
            else
                setQuantityError("Quantity should be greater than 0");

            return false;
        }
        else if(unit === ""){

            setQuantityError("");
            setUnitError("Required field");
            return false;
        }
        else if(advancePayment === ""){

            setQuantityError("");
            setUnitError("");
            setAdvancePaymentError("required field");
            return false;
        }
        else if(fullAmount === "" || parseFloat(fullAmount) === 0 ){

            setQuantityError("");
            setUnitError("");
            setAdvancePaymentError("");

            if(fullAmount === "")
                setFullAmountError("Full amount is requried");
            else
                setFullAmountError("Invalid amount.Amount should be greater than 0.00");
            return false;
        }
        else if(orderDate === ""){

            setQuantityError("");
            setUnitError("");
            setAdvancePaymentError("");
            setFullAmountError("");
            setOrderDateError("Required Field");
            return false;
        }
        else if(dueDate === ""){

            setQuantityError("");
            setUnitError("");
            setAdvancePaymentError("");
            setFullAmountError("");
            setOrderDateError("");
            setDueDateError("Requried field");
            return false;
        }
        else
            return true;
    }


    return (
        <div className = "container">
            
            <Form className ="supplierAddOrderForm">

                <Row className = "supplirAddOrderHeadingBackground">
                    <h3 className = "supplierAddOrderH3"> Add New Order</h3>
                </Row>
                <br/>
            
                <Form.Group className="mb-3" controlId="formGroupText">
                    <Form.Label  className= "supplierAddOrderFormLabel">Supplier ID</Form.Label>
                    <Form.Control type="text"  value = {supplierID} readOnly />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGroupSelect">
                    <Form.Label className= "supplierAddOrderFormLabel">Project Title</Form.Label>
                    <Form.Control as="select" value = {projectTitle} onChange = {(e)=>{setProjectTitle(e.target.value)}}>
                            
                            <option value = ""> Select Project</option>
                            
                            {projects.map(project=>(
                                <option value= {project.Title}>{project.Title} </option>
                            ))}
                        
                    </Form.Control>
                </Form.Group>


                <Form.Group className="mb-3" controlId="formGroupText">
                    <Form.Label className= "supplierAddOrderFormLabel">Order statue</Form.Label>
                    <Form.Control as="select" value = {orderStatus} onChange = {(e)=>{setOrderStatus(e.target.value)}}>
                            <option value = ""> Select Status</option>
                            <option value = "Ongoing">Ongoing</option>
                            <option value = "Completed">Completed</option>
                        
                    </Form.Control>
                </Form.Group>

            

                <Row className = "mb-3">
                    <Form.Group as= {Col} className="mb-3" controlId="formGroupText">
                        <Form.Label className= "supplierAddOrderFormLabel">Unit</Form.Label>
                        <Form.Control as="select" value = {unit} onChange = {(e)=>{setUnit(e.target.value)}}>
                                <option value = ""> Select Unit</option>
                                <option value = "number">number</option>
                                <option value = "cube">cube</option>
                                <option value = "bags">bags</option>
                                <option value = "bar">bar</option>
                                <option value = "meter">meter</option>

                            
                        </Form.Control>
                    </Form.Group>

                    <Form.Group as = {Col} className="mb-3" controlId="formGroupNumber">
                        <Form.Label  className= "supplierAddOrderFormLabel">Quantity</Form.Label>
                        <Form.Control type="number" min = "0" step = "1" value = {quantity} onChange = {(e)=>{setQuantity(e.target.value)}} placeholder="Choose quantity" />
                    </Form.Group>
                
                </Row>
                
                <Row>
                    <Col>
                        <div className = "supplierAddOrderErrorMsg">{unitError}</div>
                    </Col>
                    <Col>
                        <div className = "supplierAddOrderErrorMsg">{quantityError}</div>
                    </Col>
                </Row>
                
                
                <Row className = "mb-3">
                
                    <Form.Group as = {Col} className="mb-3" controlId="formGroupDate">
                        <Form.Label  className= "supplierAddOrderFormLabel">Order date</Form.Label>
                        <Form.Control type="date" value = {orderDate} onChange = {(e)=>{setOrderDate(e.target.value)}} />
                    </Form.Group>

                    <Form.Group as = {Col} className="mb-3" controlId="formGroupDate">
                        <Form.Label  className= "supplierAddOrderFormLabel">Due date</Form.Label>
                        <Form.Control type="date" value = {dueDate} onChange = {(e)=>{setDueDate(e.target.value)}} />
                    </Form.Group>
                </Row>

                <Row>
                    <Col>
                        <div className = "supplierAddOrderErrorMsg">{orderDateError}</div>
                    </Col>
                    <Col>
                        <div className = "supplierAddOrderErrorMsg">{dueDateError}</div>
                    </Col>
                </Row>

                <Row className = "mb-3">
                
                <Form.Group as = {Col} className="mb-3" controlId="formGroupNumber">
                    <Form.Label  className= "supplierAddOrderFormLabel">Advance Payment</Form.Label>
                    <Form.Control type="number" step="0.01" min = "0.00" value = {advancePayment} onChange = {(e)=>{setAdvancePayment(e.target.value)}} placeholder="Enter Advance Payment" />
                    </Form.Group>

                    <Form.Group as = {Col} className="mb-3" controlId="formGroupNumber">
                    <Form.Label  className= "supplierAddOrderFormLabel">Full Amount</Form.Label>
                    <Form.Control type="number" step="0.01" min = "0.00" value = {fullAmount} onChange = {(e)=>{setFullAmount(e.target.value)}} placeholder="Enter Full Amount" />
                    </Form.Group>
                </Row>

                <Row>
                    <Col>
                        <div className = "supplierAddOrderErrorMsg">{advancePaymentError}</div>
                    </Col>
                    <Col>
                        <div className = "supplierAddOrderErrorMsg">{fullAmountError}</div>
                    </Col>
                </Row>

                <br/>               

                <Row className = "mb-3">
                    <Form.Group as = {Col} className="mb-3" controlId="">
                        <Button variant="primary" type="submit" size= "md" className="supplierAddOrderFormSubmitBtn" onClick={e=>{sendSupplierOrderData(e)}}>
                            Add Order 
                        </Button>
                        
                    </Form.Group>

                    <Form.Group as = {Col} className="mb-3" controlId="">
                        <Link to ="/adminPannel/supplierManager"><Button variant="secondary" size= "md">
                            Back
                        </Button></Link>
                    </Form.Group>
                </Row>


            </Form>
        </div>
    )
}
