import React from 'react'
import "../Styles/SupplierMainNavigation.css";
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default function SupplierMainNavigation() {
    return (
        <div className = "container">
             <Link to = "/adminPannel/supplierManager" className = "SupplierMainNavLinks"><Button variant = "outline-warning" size= "sm"  className= "SupplierMainNavBtn">Supplier Dashboard</Button></Link>
            <br/><br/>
            <Link to = "/adminPannel/supplierManager/addSupplier"><Button variant = "outline-warning" size= "sm"  className= "SupplierMainNavBtn">Add Supplier</Button></Link>
            <br/> <br/>
            <Link to = "/adminPannel/supplierManager/viewOrders"><Button variant = "outline-warning" size= "sm"  className= "SupplierMainNavBtn">View Upcoming Orders</Button></Link>
            <br/> <br/>
            <Link to = "/adminPannel/supplierManager/orderReport" className = "SupplierMainNavLinks"><Button variant = "outline-warning" size= "sm"  className= "SupplierMainNavBtn">View Report</Button></Link>                                    
            <br/><br/>
        </div>
    )
}
