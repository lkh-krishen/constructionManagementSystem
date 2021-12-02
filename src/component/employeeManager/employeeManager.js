import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {Container, Row,Col} from "react-bootstrap";
import EmpHome from './EmpHome';
import ReportHome from './ReportHome';
import EmployeeProject from './EmployeeProject';
import AddEmployee from './AddEmployee';
import EditEmployee from './EditEmployee';
import DisplayEmployee from './DisplayEmployee';
import EmployeeProfile from './EmployeeProfile';
import PageHeader from './PageHeader';
import EmployeeMainNavigation from './EmployeeMainNavigation';
import { useState, useEffect } from "react";
import SalaryReport from './salaryReport';
import Employee from './employeeSalary';
import DisplayMonthlyAttendance from '../AttendanceManager/DisplayMonthlyAttendance'
import EditAttendance from '../AttendanceManager/editAttendance';
import EmployeeReport from './EmployeeReport';
import BarChart from './BarChart';




export default function EmployeeManager() {

    const[month,setMonth]= useState("");
    const[year,setYear]=useState("");
    const [editEmployee, setEditEmployee] = useState("");
    const [viewEmployee, setViewEmployee] = useState("");
    const [editingAttendanceEmpID, setEditingAttendanceEmpID] = useState("");
    const [editingAttendanceDate, setEditingAttendanceDate] = useState("");

    function editAttendaceHandler(EmpID,datee){
        console.log("EmpID in Attendancemanager>>>>>>>>>",EmpID,datee);
        setEditingAttendanceEmpID(EmpID);
        setEditingAttendanceDate(datee);
    }

    function setDetailsMain(year,month){
        setYear(year);
        setMonth(month);
        console.log("inside employeeManager", month,year);
    
      }

    function editEmployeeHandler(EmpID) {
        setEditEmployee(EmpID);
        console.log(EmpID);
    }

    function viewEmployeeHandler(EmpName) {
        console.log("Employee Name", EmpName);
        setViewEmployee(EmpName);
    }

    return (
        <div>
           
                <div className = "supplierManagerBgDiv">

                <br/> <br/> 

            <Container fluid>
                <Row>
                    <Col md = "2" xs = "4" sm= "3" >
                    <br/>
                        <EmployeeMainNavigation/>
                    </Col>

                    <Col md = "10" xs = "8" sm = "9" className = "supplierMainVeritcalDiv">
                    <br/>

                <Switch>
                    <Route path='/adminPannel/EmployeeManager/employeeSalary' exact component={Employee}>
                        <Employee setDetailsMain={setDetailsMain}/>
                    </Route>
                    <Route path='/adminPannel/EmployeeManager/salaryReport' component={SalaryReport}>
                        <SalaryReport year={year} month={month}/>
                    </Route>

                    <Route exact path='/adminPannel/EmployeeManager/EmpHome'  component={EmpHome}>
                        <EmpHome></EmpHome>
                    </Route>

                    <Route exact path = '/adminPannel/EmployeeManager/ReportHome' component = {ReportHome}>
                        <ReportHome></ReportHome>
                    </Route>

                    <Route  path ='/adminPannel/EmployeeManager/EmployeeProject' component = {EmployeeProject}>
                        <EmployeeProject></EmployeeProject>
                    </Route>

                    <Route path = '/adminPannel/EmployeeManager/DisplayEmployee' component = {DisplayEmployee}>
                        <DisplayEmployee editEmployeeHandler = {editEmployeeHandler}
                                         viewEmployeeHandler = {viewEmployeeHandler}/>
                    </Route>

                    <Route  path = '/adminPannel/EmployeeManager/AddEmployee'  component = {AddEmployee}>
                        <AddEmployee />
                    </Route>

                    <Route exact path = '/adminPannel/EmployeeManager/EditEmployee' component = {EditEmployee}>
                        <EditEmployee id={editEmployee}/>
                    </Route>

                    <Route path = '/adminPannel/EmployeeManager/EmployeeProfile' component = {EmployeeProfile}>
                        <EmployeeProfile name ={viewEmployee} editEmployeeHandler={editEmployeeHandler}/>
                    </Route>

                    <Route path='/adminPannel/EmployeeManager/MonthlyReport' component={DisplayMonthlyAttendance}>
                        <DisplayMonthlyAttendance employeeID={editEmployee} editAttendaceHandler={editAttendaceHandler}/>
                    </Route>
                    <Route path='/adminPannel/EmployeeManager/EditAttendance' component={EditAttendance}>
                        <EditAttendance employeeID={editingAttendanceEmpID} editingAttendanceDate={editingAttendanceDate}/>
                    </Route>

                    <Route exact path = '/adminPannel/EmployeeManager/EmployeeReport' component = {EmployeeReport}>
                        <EmployeeReport></EmployeeReport>
                    </Route>

                    <Route exact path = '/adminPannel/EmployeeManager/BarChart' component = {BarChart}>
                        <BarChart></BarChart>
                    </Route>

                </Switch>

                </Col>
            </Row>
        </Container>
   

        </div></div>

        
    )
}

