import React,{useState} from 'react'
import "./Styles/SupplierManager.css";
import {Container, Row,Col} from "react-bootstrap";
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import SupplierMainNavigation from './SupplierComponents/SupplierMainNavigation';
import SupplierAddJumbtron from './SupplierComponents/SupplierAddJumbtron';
import SupplierCategorySearch from './SupplierComponents/SupplierCategorySearch';
import SupplierAddForm from './SupplierComponents/SupplierAddForm';
import SupplierEditForm from './SupplierComponents/SupplierEditForm';
import SupplierAddOrder from './SupplierComponents/SupplierAddOrder';
import SupplierViewOrders from './SupplierComponents/SupplierViewOrders';
import SupplierEditOrders from './SupplierComponents/SupplierEditOrders';
import SupplierOrderReport from './SupplierComponents/SupplierOrderReport';


export default function SupplierManager() {

   

    const [editingSupplier, setEditingSupplier] = useState("");
    const [editingSupOrders, setEditingSupOrders] = useState("");

    function editSupplierHandler(supID){
        
        setEditingSupplier(supID);
        // console.log(supID);
    }

    function editSupplierOrderHandler(orderID){
        setEditingSupOrders(orderID);
        // console.log(orderID);
    }




    return (
        <Router>
      
        <div className = "supplierManagerBgDiv" >

                <br/> <br/> 
                <Container fluid>
                    <Row>
                        <Col md = "2" xs = "4" sm= "3" >
                                <br/>
                                <SupplierMainNavigation/>
                                   
                        </Col>

                        <Col md = "10" xs = "8" sm = "9" className = "supplierMainVeritcalDiv">
                            <br/>

                            <Switch>

                                <Route exact path = "/adminPannel/supplierManager" >
                                    <SupplierCategorySearch editSupplierHandler = {editSupplierHandler}/>
                                    <SupplierAddJumbtron/>
                                </Route> 

                                <Route exact path = "/adminPannel/supplierManager/addSupplier" component ={SupplierAddForm} >
                                    <SupplierAddForm/>
                                </Route>

                                <Route exact path = "/adminPannel/supplierManager/editSupplier" component = {SupplierEditForm}>
                                        <SupplierEditForm supplierID = {editingSupplier}/>
                                </Route>
                                
                                <Route exact path = "/adminPannel/supplierManager/addSupplierOrder" component = {SupplierAddOrder}>
                                        <SupplierAddOrder supplierID = {editingSupplier}/>
                                </Route>

                                <Route exact path = "/adminPannel/supplierManager/viewOrders" component = {SupplierViewOrders}>
                                        <SupplierViewOrders editSupplierOrderHandler = {editSupplierOrderHandler}/>
                                </Route>

                                <Route exact path= "/adminPannel/supplierManager/viewOrders/editOrders" component = {SupplierEditOrders}>
                                        <SupplierEditOrders orderID = {editingSupOrders}/>
                                </Route>

                                <Route exact path= "/adminPannel/supplierManager/orderReport" component = {SupplierOrderReport}>
                                        <SupplierOrderReport/>
                                </Route>
                                
                                
                             </Switch> 
                                  
                        </Col>
                    </Row>
                </Container>
   
        </div>
    </Router>
    )
}
