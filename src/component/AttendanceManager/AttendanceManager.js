import React,{UseSate, useState,useEffect} from 'react';
import {Container, Row,Col} from "react-bootstrap";
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import './attendancemanager.css';
import AttendanceManagerPannel from './AttendanceManagerPannel';
import MarkArriving from './MarkArriving';
import MarkLeaving from './MarkLeaving';
import EditAttendance from './editAttendance';
import DisplayMonthlyAttendance from './DisplayMonthlyAttendance';
import MarkPastHolidays from './MarkPastHolidays';
import DeleteOldData from './DeleteOldData';
import DailyAttendanceReport from './DailyAttendanceReport';
function AttendanceManager() {
    const [editingAttendanceEmpID, setEditingAttendanceEmpID] = useState("");
    const [editingAttendanceDate, setEditingAttendanceDate] = useState("");

    function editAttendaceHandler(EmpID,datee){
        console.log("EmpID in Attendancemanager>>>>>>>>>",EmpID,datee);
        setEditingAttendanceEmpID(EmpID);
        setEditingAttendanceDate(datee);
    }
    useEffect(() => {
        
        
        
    }, [])

    return (
        <div className="">
            
            <Route path='/adminPannel/attendanceManager/attendanceManagePanel' component={AttendanceManagerPannel}>
                <AttendanceManagerPannel/>
            </Route>
            <Route path='/adminPannel/attendanceManager/markArriving' component={MarkArriving}>
                <MarkArriving editAttendaceHandler={editAttendaceHandler}/>
            </Route>
            <Route path='/adminPannel/attendanceManager/markLeaving' component={MarkLeaving}>
                <MarkLeaving editAttendaceHandler={editAttendaceHandler}/>
            </Route> 
            <Route path='/adminPannel/attendanceManager/EditAttendance' component={EditAttendance}>
                <EditAttendance employeeID={editingAttendanceEmpID} editingAttendanceDate={editingAttendanceDate}/>
            </Route>
            <Route path='/adminPannel/attendanceManager/MonthlyReport' component={DisplayMonthlyAttendance}>
                <DisplayMonthlyAttendance editAttendaceHandler={editAttendaceHandler}/>
            </Route>
            <Route path='/adminPannel/attendanceManager/MarkPastHolidays' component={MarkPastHolidays}>
                <MarkPastHolidays/>
            </Route>
            <Route path='/adminPannel/attendanceManager/DeleteOldData' component={DeleteOldData}>
                <DeleteOldData/>
            </Route>   
            <Route path='/adminPannel/attendanceManager/DailyAttendanceReport' component={DailyAttendanceReport}>
                <DailyAttendanceReport/>
            </Route>  

                
                    
                
            
        </div>
    )
}

export default AttendanceManager;

