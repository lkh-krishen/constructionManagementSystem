import React,{useEffect,useState} from 'react';
import "../Styles/SupplierViewOrders.css";
import { Form, Row, Table,Col,Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import firebase from '../../../firebase';
var db = firebase.firestore();

export default function SupplierViewOrders(props) {

    const [projects,setProjects] = useState([]);

    const [selectProject,setSelectProject] = useState("");
    const [fromDate,setFromDate] = useState("");
    const [toDate,setToDate] = useState("");
    const [supplierOrders,setSupplierOrders]= useState([]);
    const [editingSupOrders,setEditingSupOrders]= useState(props);

    //error states
    const[searchError, setSearchError] = useState("");

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
                        fullAmount:doc.data().fullAmount

                    }

                    supOrders.push(order);

                });

                console.log(supOrders);
                setSupplierOrders(supOrders);

            }).catch(err=>{
                console.log(err.message);
            })

            setSelectProject("");
            setFromDate("");
            setToDate("");
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

    //editing orders
    function editOrders(orderID){

        editingSupOrders.editSupplierOrderHandler(orderID);
        setEditingSupOrders(props);
    }

    //delete orders
    function deleteOrders(e,orderID){

        e.preventDefault();

        //delete
        db.collection("Order").doc(orderID).delete().then(()=>{
            alert("Order is deleted");

        }).catch(err=>{
            alert(err.message);
        })
    }



    return (
        <div>

            <Row className= "supplierOrderHeaderBackground"></Row>

            <Form className= "container-fluid">
                <Row>
                    <Form.Group as = {Col} className="mb-3" controlId="formGroupSelect">
                        <Form.Label className= "supplierViewOrdersLabel">Project: </Form.Label>
                        <Form.Control as="select" value = {selectProject} onChange={e=>{setSelectProject(e.target.value)}}  >
                                <option value = "">Select Project</option>

                                {projects.map(project=>(
                                    <option value = {project.Title}> {project.Title}</option>
                                ))}
                              
                        </Form.Control>
                    </Form.Group>

                    <Form.Group as = {Col} className="mb-3" controlId="formGroupDate">
                        <Form.Label  className= "supplierViewOrdersLabel">From: </Form.Label>
                        <Form.Control type="date" value = {fromDate} onChange={e=>{setFromDate(e.target.value)}}/>
                    </Form.Group>

                    <Form.Group as = {Col} className="mb-3" controlId="formGroupDate">
                        <Form.Label  className= "supplierViewOrdersLabel">To: </Form.Label>
                        <Form.Control type="date" value = {toDate} onChange={e=>{setToDate(e.target.value)}} />
                    </Form.Group>

                    <Form.Group as = {Col} className="mb-3" controlId="">
                         <br/>  
                            <Button  type = "submit" variant="primary" className= "supplierViewOrdersBtns" size= "md" onClick={e=>{fetchOrderDataBasedDates(e);}}>
                                Search
                            </Button>
                    </Form.Group>
                </Row>

            </Form>

            <div className= "supplierOrderSerachErrorMsg">{searchError}</div>
            <Row className= "supplierOrderHeaderBackground"></Row>
           
            <br/><br/>
              
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>OrderID </th>
                        <th>Supplier </th>
                        <th>Unit</th>
                        <th>Quantity</th>
                        <th>Order Date</th>
                        <th>Due Date</th>
                        <th>Adavance Payment</th>
                        <th>Full amount</th>
                        <th>Status </th>
                        <th># </th>

                    </tr>
                </thead>

                {supplierOrders.map(order=>(  
                <tbody>
                    <tr>
                        <td>{order.orderID}</td>
                        <td>{order.supplierID}</td>
                        <td>{order.unit}</td>
                        <td>{order.quantity}</td>
                        <td>{order.orderDate}</td>
                        <td>{order.dueDate}</td>
                        <td>Rs.{order.advancePayment}</td>
                        <td>Rs.{order.fullAmount}</td>
                        <td>{order.orderStatus}</td>
                        <td>
                            <Row>
                                <Col>
                                    <Link to = "/adminPannel/supplierManager/viewOrders/editOrders" onClick = {()=>{editOrders(order.orderID)}}>
                                        <h6 className = "SupplierViewOrdersEditHeadings">Edit</h6>
                                    </Link>
                                </Col>

                                <Col>
                                    <Link onClick = {(e)=>{deleteOrders(e,order.orderID)}}>
                                        <h6 className = "SupplierViewOrdersDeleteHeadings">Delete</h6>
                                    </Link>
                                </Col>

                            </Row>
                        </td>
                    </tr>
                </tbody>
                 ))}
            </Table>
           
             
            <Link to ="/adminPannel/supplierManager">
                <Button variant="secondary" className= "supplierViewOrdersBtns" size= "md">
                            Back
                </Button>
            </Link>
            
        </div>
    )
}
