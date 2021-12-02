import React,{useEffect,useState} from 'react'
import "../Styles/SupplierEditOrders.css";
import { Form,Col,Row,Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import firebase from  '../../../firebase';
var db = firebase.firestore();

export default function SupplierEditOrders(props) {

    const [orderID,setOrderID] = useState(props.orderID);

    const [supplierID,setSupplierID] = useState("");
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
    const [unitError,setUnitError] = useState("");
    const [quantityError,setQuantityError] = useState("");
    const [advancePaymentError,setAdvacnePaymentError] = useState("");
    const [fullAmountError,setFullAmountError] = useState("");

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
        fetchOrderDetails();

    },[]);

    //fetch the order details
    function fetchOrderDetails(){

        db.collection("Order").doc(orderID).get()
        .then(doc=>{

            const supOrder = doc.data();

            setSupplierID(supOrder.supplierID);
            setProjectTitle(supOrder.projectTitle);
            setOrderStatus(supOrder.orderStatus);
            setUnit(supOrder.unit);
            setQuantity(supOrder.quantity);
            setOrderDate(supOrder.orderDate.toDate().toDateString());
            setDueDate(supOrder.dueDate.toDate().toDateString());
            setAdvancePayment(supOrder.advancePayment);
            setFullAmount(supOrder.fullAmount);

        }).catch(err=>{
            console.log(err.message);
        })
    }

    //update order details
    function updateOrderDetails(e){

        e.preventDefault();

        if(isOrderDataValid()){

            db.collection("Order").doc(orderID).update({
                supplierID:supplierID,
                projectTitle:projectTitle,
                orderStatus:orderStatus,
                unit: unit,
                quantity:parseFloat(quantity),
                orderDate:new Date(orderDate),
                dueDate: new Date(dueDate),
                advancePayment: parseFloat(advancePayment),
                fullAmount:parseFloat(fullAmount)

            }).then(()=>{
                alert("Order details updated successfully");
            }).catch(err=>{
                alert(err.message);
            })

            //reset errors
            setUnitError("");
            setQuantityError("");
            setAdvacnePaymentError("");
            setFullAmountError("");
            setOrderID(props.orderID);
        }

    }

    //validate update details
    function isOrderDataValid(){
        if(unit === ""){
            setUnitError("Required Field");
            return false;
        }
        else if(quantity === "" || parseFloat(quantity) === 0){

            setUnitError("");

            if(quantity === "")
                setQuantityError("Requried Field");
            else    
                setQuantityError("Quantity should be greater than 0");
            return false;
        }
        else if(advancePayment === ""){
            
            setUnitError("");         
            setQuantityError("");

            setAdvacnePaymentError("Required field");
            return false;
        }
        else if(fullAmount === "" || parseFloat(fullAmount) === 0){

            setUnitError("");         
            setQuantityError("");
            setAdvacnePaymentError("");

            if(fullAmount === "")
                setFullAmountError("Required field");
            else
                setFullAmountError("Invalid amount. Amount should be greater than 0");

            return false;
        }
        else
            return true;
    }



    return (

        <div className = "container">
            
        <Form className ="supplierEditOrderForm">

            <Row className = "supplierEditOrderHeadingBackground">
                <h3 className = "supplierEditOrderH3"> Edit Order Details</h3>
            </Row>
            <br/>
            <h5>Order ID: {orderID}</h5>
            <br/> <br/>
          
            <Form.Group className="mb-3" controlId="formGroupText">
                <Form.Label  className= "supplierEditOrderFormLabel">Supplier ID</Form.Label>
                <Form.Control type="text" value = {supplierID} readOnly />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupSelect">
                <Form.Label className= "supplierEditOrderFormLabel">Project Title</Form.Label>
                <Form.Control as="select" value = {projectTitle} onChange = {(e)=>{setProjectTitle(e.target.value)}}>
                        
                        <option value = ""> Select Project</option>
                        
                        {projects.map(project=>(
                            <option value= {project.Title}>{project.Title} </option>
                        ))}
                    
                </Form.Control>
            </Form.Group>


            <Form.Group className="mb-3" controlId="formGroupText">
                <Form.Label className= "supplierEditOrderFormLabel">Order statue</Form.Label>
                <Form.Control as="select" value = {orderStatus} onChange = {(e)=>{setOrderStatus(e.target.value)}}>
                        <option value = ""> Select Status</option>
                        <option value = "Ongoing">Ongoing</option>
                        <option value = "Completed">Completed</option>
                       
                </Form.Control>
            </Form.Group>

           

            <Row className = "mb-3">
                <Form.Group as= {Col} className="mb-3" controlId="formGroupText">
                    <Form.Label className= "supplierEditOrderFormLabel">Unit</Form.Label>
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
                    <Form.Label  className= "supplierEditOrderFormLabel">Quantity</Form.Label>
                    <Form.Control type="number" min = "0" step = "1" value = {quantity} onChange = {(e)=>{setQuantity(e.target.value)}} placeholder="Choose quantity" />
                </Form.Group>
               
            </Row>
            
            <Row>
                <Col>
                    <div className = "supplierEditOrderErrorMsg">{unitError}</div>         
                </Col>
                <Col>
                    <div className = "supplierEditOrderErrorMsg">{quantityError}</div>
                </Col>
            </Row>
            
            
            <Row className = "mb-3">
               
                 <Form.Group as = {Col} className="mb-3" controlId="formGroupDate">
                    <Form.Label  className= "supplierEditOrderFormLabel">Order date</Form.Label>
                    <Form.Control type="text" value = {orderDate} readOnly />
                </Form.Group>

                <Form.Group as = {Col} className="mb-3" controlId="formGroupDate">
                    <Form.Label  className= "supplierEditOrderFormLabel">Due date</Form.Label>
                    <Form.Control type="text" value = {dueDate}  readOnly/>
                </Form.Group>
            </Row>

            <Row className = "mb-3">
               
               <Form.Group as = {Col} className="mb-3" controlId="formGroupNumber">
                  <Form.Label  className= "supplierEditOrderFormLabel">Advance Payment</Form.Label>
                  <Form.Control type="number" step="0.01" min = "0.00" value = {advancePayment} onChange = {(e)=>{setAdvancePayment(e.target.value)}} placeholder="Enter Advance Payment" />
                </Form.Group>

                <Form.Group as = {Col} className="mb-3" controlId="formGroupNumber">
                  <Form.Label  className= "supplierEditOrderFormLabel">Full Amount</Form.Label>
                  <Form.Control type="number" step="0.01" min = "0.00" value = {fullAmount} onChange = {(e)=>{setFullAmount(e.target.value)}} placeholder="Enter Full Amount" />
                </Form.Group>
            </Row>

            <Row>
                <Col>
                    <div className = "supplierEditOrderErrorMsg">{advancePaymentError}</div>
                </Col>
                <Col>
                    <div className = "supplierEditOrderErrorMsg">{fullAmountError}</div>
                </Col>
            </Row>

            <br/>               

            <Row className = "mb-3">
                <Form.Group as = {Col} className="mb-3" controlId="">
                    <Button variant="primary" type="submit" size= "md" className="supplierEditOrderFormSubmitBtn" onClick={e=>{updateOrderDetails(e)}} >
                        Update Order 
                    </Button>
                    
                </Form.Group>

                <Form.Group as = {Col} className="mb-3" controlId="">
                    <Link to ="/adminPannel/supplierManager/viewOrders"><Button variant="secondary" size= "md">
                        Back
                    </Button></Link>
                </Form.Group>
            </Row>


        </Form>
    </div>
    )
}
