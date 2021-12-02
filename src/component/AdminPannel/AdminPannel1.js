import React from 'react'
import './AdminPannel1.css';
import { Link } from 'react-router-dom';
import { Button,Container,Image,Row } from 'react-bootstrap';
import adminBg from './admin_Images/adminBg.png';
import adminIcon from './admin_Images/adminIcon.jpg';


export default function AdminPannel1() {
    return (
        
        <div className = "adminPannelBg" >
        <br/>
        <Row className = "adminPannelHeaderRow">
                <div className = "adminPannelHeaderBg"> 
                     <Image src = {adminIcon} className = "adminIcon"/>
                     Admin Pannel 
                </div>
        </Row>
        <br/>
        
        <Container className = "shadow-lg p-3 mb-5 bg-white rounded">
            <div className = "admin_Container">
                <Link to = "/adminPannel/ClientManager" className = "AdminPannelNavLinks"><Button variant = "outline-warning" size= "sm"  className= "AdminPannelNavBtn">CLIENT MANAGER</Button></Link>
                <br/><br/>
                <Link to = "/adminPannel/ProjectManagement" className = "AdminPannelNavLinks"><Button variant = "outline-warning" size= "sm"  className= "AdminPannelNavBtn">PROJECT MANAGER</Button></Link>
                <br/> <br/>
                <Link to = "/adminPannel/EmployeeManager/EmpHome" className ="AdminPannelNavLinks"><Button variant = "outline-warning" size= "sm"  className= "AdminPannelNavBtn">EMPLOYEE MANAGER</Button></Link>
                <br/> <br/>
                <Link to = "/adminPannel/attendanceManager/attendanceManagePanel" className = "AdminPannelNavLinks"><Button variant = "outline-warning" size= "sm"  className= "AdminPannelNavBtn">ATTENDANCE MANAGER</Button></Link>                                    
                <br/><br/>
                <Link to = "/adminPannel/DesignationManager" className = "AdminPannelNavLinks"><Button variant = "outline-warning" size= "sm"  className= "AdminPannelNavBtn">DESIGNATION MANAGER</Button></Link>                                    
                <br/><br/>
                <Link to = "/adminPannel/SubcontractManager/SubconMain" className = "AdminPannelNavLinks"><Button variant = "outline-warning" size= "sm"  className= "AdminPannelNavBtn">SUBCONTRACT MANAGER</Button></Link>                                    
                <br/><br/>
                <Link to = "/adminPannel/supplierManager" className = "AdminPannelNavLinks"><Button variant = "outline-warning" size= "sm"  className= "AdminPannelNavBtn">SUPPLIER MANAGER</Button></Link>                                    
                <br/><br/>
            </div>
        </Container>
        <br/> <br/>
        <Image src = {adminBg} fluid/>
    </div>
    )
}
