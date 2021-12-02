import React,{useState,useEffect} from 'react'
import '../Styles/SupplierOrderReport.css';
import { Form, Row,Col,Button,Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import firebase from "../../../firebase";
var db = firebase.firestore();


export default function SupplierOrderReport() {

    const [projects,setProjects] = useState([]);

    const [selectProject,setSelectProject] = useState("");
    const [fromDate,setFromDate] = useState("");
    const [toDate,setToDate] = useState("");
    const [supplierOrders,setSupplierOrders]= useState([]);

    //error states
    const[searchError, setSearchError] = useState("");

    //states for calculation
    const[ongoingOrders, setOngoingOrders] = useState([]);
    const[completedOrders, setCompletedOrders] = useState([]);
    const [completedOrdersTotalAmount, setCompletedOrdersTotalAmount] = useState(0.00);
    const [ongoingOrderTotalToBePaid, setOngoingOrderTotalToBePaid] = useState(0.00);

    useEffect(() => {
        getProjectTitles();
    }, [])

    //get project tiles
    function getProjectTitles(){

        const projectsArry = [];

        db.collection("Con_Project").onSnapshot(snapshot=>{

            snapshot.docs.forEach(doc=>{

                projectsArry.push(doc.data());
                // console.log(doc.id);
            });

            // console.log(projectsArry);
            setProjects(projectsArry);
        })
         
    }

     //fetch order details based on dates
     function fetchOrderDataBasedDates(e){

        e.preventDefault();
        
        if(isSearchValid()){

            //covert string states into date objects
            const fromDateObj = new Date(fromDate);
            const toDateObj = new Date(toDate);

            //get data based on category
            db.collection("Order").where("projectTitle","==",selectProject).where("dueDate",">=", fromDateObj).where("dueDate", "<=",toDateObj).get()
            .then(querySnapshot=>{
                
                const supOrders = [];
                const ongoingArry = [];
                const completedArry =[];
                let completOrderFullAmount = 0.0;
                let ongoingOrderFullToBePaidAmount = 0.0;
           
        
                querySnapshot.docs.forEach(doc=>{

                
                    const order= {
                        orderID: doc.id,
                        supplierID : doc.data().supplierID,
                        orderStatus: doc.data().orderStatus,
                        unit:doc.data().unit,
                        quantity: doc.data().quantity,
                        orderDate: doc.data().orderDate.toDate().toDateString(), //convert into date object and convert to date string
                        dueDate: doc.data().dueDate.toDate().toDateString(),
                        advancePayment: doc.data().advancePayment,
                        fullAmount:doc.data().fullAmount,
                        paidToBe:doc.data().fullAmount - doc.data().advancePayment,

                    }

                    supOrders.push(order);

    
                    if(order.orderStatus === "Ongoing"){
                        ongoingArry.push(order);
                        ongoingOrderFullToBePaidAmount = ongoingOrderFullToBePaidAmount + order.paidToBe;  
                    }    
                    else{
                        completedArry.push(order);
                        completOrderFullAmount = completOrderFullAmount + order.fullAmount;
                    }  
              
                });

                // console.log(supOrders);
                setSupplierOrders(supOrders); //total orders
                setOngoingOrders(ongoingArry);
                setCompletedOrders(completedArry);
                setCompletedOrdersTotalAmount(completOrderFullAmount);
                setOngoingOrderTotalToBePaid(ongoingOrderFullToBePaidAmount);
                // console.log(completedArry);
                // console.log(ongoingArry);
                // console.log(ongoingToBePaidArry);

            
            }).catch(err=>{
                console.log(err.message);
            })

        
            setSearchError("");

           
        }
    }

    //validate search
    function isSearchValid(){
        if(selectProject === "" || fromDate === "" || toDate === ""){
            setSearchError("* Required fields are not selected");
            return false;
        }
        return true;
    }


    return (
        <div>
            <Row className= "supplierOrderReportHeaderBackground"></Row>
            
            <Form className= "container-fluid">

                <Row>
                    <Form.Group as = {Col} className="mb-3" controlId="formGroupSelect">
                        <Form.Label className= "supplierOrderReportLabel">Project: </Form.Label>
                        <Form.Control as="select" value = {selectProject} onChange={e=>{setSelectProject(e.target.value)}}  >
                                <option value = "">Select Project</option>

                                {projects.map(project=>(
                                    <option value = {project.Title}> {project.Title}</option>
                                ))}
                              
                        </Form.Control>
                    </Form.Group>

                    <Form.Group as = {Col} className="mb-3" controlId="formGroupDate">
                        <Form.Label  className= "supplierOrderReportLabel">From: </Form.Label>
                        <Form.Control type="date" value = {fromDate} onChange={e=>{setFromDate(e.target.value)}}/>
                    </Form.Group>

                    <Form.Group as = {Col} className="mb-3" controlId="formGroupDate">
                        <Form.Label  className= "supplierOrderReportLabel">To: </Form.Label>
                        <Form.Control type="date" value = {toDate} onChange={e=>{setToDate(e.target.value)}} />
                    </Form.Group>

                    <Form.Group as = {Col} className="mb-3" controlId="">
                         <br/>  
                            <Button  type = "submit" variant="primary" className= "supplierOrderReportBtns" size= "md" onClick={e=>{fetchOrderDataBasedDates(e);}} >
                                GO!
                            </Button>
                    </Form.Group>
                </Row>

            </Form>

            <div className= "supplierOrderReportSerachErrorMsg">{searchError}</div>
            <Row className= "supplierOrderReportHeaderBackground"></Row>

            <br/><br/>

            {/* REPORT */}

            <Container className = "suppleirOrderReportContainer">
                <br/>
                <div className = "supplierOrderReporHeaderDiv">
                        <Row className = "supplierOrderReportConstructionName">
                            Kuruduwaththa Construction
                        </Row>
                        <Row>Transaction Report</Row>
                </div>
                

                <Row className = "supplierOrderReportMainHeadingBackground">
                    <Col> Project : {selectProject}</Col>
                    <Col> From : {fromDate}</Col>
                    <Col>To: {toDate}</Col>
                </Row>
                <br/><br/> 
                <hr/>
                <div className = "supplierOrderReportSubHeadingBackground">
                        Total Number of Orders: {supplierOrders.length}
                </div>
                <hr/><br/>
                <div className = "supplierOrderReportSubHeadingBackground">Completed Orders:</div>
                
                <Row className ="supplierOrderReportOtherHeadingBackground" >
                    <Col>Order ID</Col>
                    <Col>Due date</Col>
                    <Col>Unit</Col>
                    <Col>Quantity</Col>
                    <Col>Adavance payment</Col>
                    <Col>Full Amount</Col>

                </Row> 
                <br/>  

                {completedOrders.map(order=>(                   
                <Row className = "supplierOrderReportContentBackground">
                    <Col>{order.orderID}</Col>
                    <Col>{order.dueDate}</Col>
                    <Col>{order.unit}</Col>
                    <Col>{order.quantity}</Col>
                    <Col>Rs.{order.advancePayment}</Col>
                    <Col>Rs.{order.fullAmount}</Col>
                </Row>
                ))}  
                <br/> 
                <hr/>
                <Row className = "supplierOrderReportTotalAmountsBackground">
                    <Col>Total Paid Amount</Col>
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>
                    <Col>Rs.{completedOrdersTotalAmount}</Col>
                </Row> 
                <hr/>  
                <br/> 

                <div className = "supplierOrderReportSubHeadingBackground">Ongoing Orders:</div>

                <Row className ="supplierOrderReportOtherHeadingBackground">
                    <Col>Order ID</Col>
                    <Col>Due date</Col>
                    <Col>Unit</Col>
                    <Col>Quantity</Col>
                    <Col>Adavance payment</Col>
                    <Col>Full Amount</Col>
                    <Col>To Be Paid</Col>

                </Row> 
               
                 {ongoingOrders.map(order=>( 
                     
                <Row className = "supplierOrderReportContentBackground">
                    <Col>{order.orderID}</Col>
                    <Col>{order.dueDate}</Col>
                    <Col>{order.unit}</Col>
                    <Col>{order.quantity}</Col>
                    <Col>Rs.{order.advancePayment}</Col>
                    <Col>Rs.{order.fullAmount}</Col>
                    <Col>Rs.{order.paidToBe}</Col>
    
                </Row>
                
                ))} 

                <br/> 
                <hr/>
                <Row className = "supplierOrderReportTotalAmountsBackground">
                    <Col>Total Amount ToBe Paid:</Col>
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>
                    <Col>Rs.{ongoingOrderTotalToBePaid}</Col>
                </Row>
                <hr/>
                <br/>  
           
            </Container>                        
            <br/>
           
                <Link to ="/adminPannel/supplierManager">
                    <Button variant="secondary" className= "supplierOrderReportBackBtn" size= "md">
                                Back
                    </Button>
                </Link>
            
            <br/><br/>
            
        </div>
    )
}
