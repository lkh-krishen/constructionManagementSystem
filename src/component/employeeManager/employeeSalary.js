import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import React, { useState, useEffect } from 'react';
import firebase from "../../firebase";
import FigureCaption from 'react-bootstrap/esm/FigureCaption';
import { Link } from 'react-router-dom';

const db = firebase.firestore();

function Employee(props) {
    
    const[details,setDetails]=useState(props);
    const [year,setYear] = useState("");
    const [month, setMonth]=useState("");

    async function CalculateSalary(e){

        e.preventDefault();
        
        //if the month and year is not entered, function not gonna execute.
        if(month=="" || year==""){
            alert("enter year and month");
        }
        else{
            
            //taking all the employee details to the 'employee' array
            db.collection("employees").onSnapshot((querySnapshot)=>{
                const array = querySnapshot.docs.map((doc)=>({
                
                        data : doc.data(),
                        key : doc.id,
                }));

                //run the for loop for each employee
                for(let i=0;i<array.length;i++){

                    //filtering the number of worked days of the employee
                    db.collection("attendance").where("employeeID","==",array[i].key).where("year","==",year).where("month","==",month).where("dayStatus","==","worked").onSnapshot(async (querySnapshot)=>{
                        const array1=querySnapshot.docs.map((doc)=>({
                        
                                data : doc.data(),
                                key : doc.id
                        }));
                        
                        //if the attendance record is empty, reload the page. the function is not going to execute further.
                        if(array1.length==0){
                            alert("No attendance records available for selected month");

                            window.location.replace("/adminPannel/EmployeeManager/employeeSalary");
                        }
                        
                        //taking the length of the 'array1'
                        let total=array1.length;
                        console.log("total of ",array[i].key," is ",total);

                        
                        //filtering the basic salary of the designation of the employee
                        await db.collection("Designation").where("designation","==", array[i].data.designation).onSnapshot((querySnapshot)=>{
                            const array2 = querySnapshot.docs.map((doc)=>{
                                    
                                    //key : doc.id
                                    let work_days=total;
                                    let basic_salary=doc.data().basicSalary;
                                    let amount= total*doc.data().basicSalary; 
                                    console.log("amount",amount);
                                    let ETF_amount=0;
                                    let employee_name=array[i].data.employeeName;

                                    //only for the contracted employees, ETF amount is calculated
                                    if(doc.data().status=="contracted"){
                                        ETF_amount=amount*5/100;
                                        console.log("ETF calculated for ",employee_name);
                                    }

                                    const SalaryRecord = {
                                        year,
                                        month,
                                        employee_name,
                                        work_days,
                                        basic_salary,
                                        amount,
                                        ETF_amount,
                                        
                                    }
            
                                    //sending the record to the database
                                    db.collection("Salary").add(SalaryRecord).then(()=>{
                                        console.log("record added for>>",array[i].key)
                                    }).catch((err)=>{
                                        alert(err.message);
                                    });
                                    
                                    
                                    });  

                        }) 
        
                    })    
                }
                    
            },alert("Salary Calculated"))
            }
        
        
        
    } 
    
    
    function SendDetails(year,month){
        console.log("month", month);
        console.log("year" ,year);
        if(year=="" || month==""){
            alert("Year & month needed")
        }
        else{
            details.setDetailsMain(year,month);
        }
        
    }

    function DeleteRecord(year,month){

        console.log(year,month);
        var array = db.collection("Salary").where("year","==",year).where("month","==",month);
        array.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            doc.ref.delete();
        });
        });
        alert("Records deleted");
    }

    return (
        <div>
            <Container style={{margin:"80px 50px 50px 150px",}}>          
                <Col style={{margin:"50px 50px 50px 100px",}}>
                    <Row>
                        <Col>
                            <Row style={{margin:"0px 10px 0px 10px"}}>
                                <Col md={{ span: 2, offset: 2 }}> <Form.Label  md={{ span: 2, offset: 5 }} className="text-warning" style={{fontSize:"18px"}}>Year</Form.Label> </Col>
                                <Col md={{ span: 2, offset: 0 }}> <Form.Control as="select" md={{ span: 2, offset: 0 }} value={year} onChange={(e)=>{setYear(e.target.value)}}>
                                    <option value="">select year</option>
                                    <option value="2021">2021</option>
                                    <option value="2022">2022</option>
                                    <option value="2023">2023</option>
                                    <option value="2024">2024</option>
                                    <option value="2025">2025</option>
                                    <option value="2026">2026</option>
                                </Form.Control></Col>
                            </Row>   
                        </Col>

                    </Row><br/>
                    <Row>
                        <Col>
                            <Row style={{margin:"0px 10px 0px 10px"}}>
                                <Col md={{ span: 2, offset: 2 }}> <Form.Label md={{ span: 2, offset: 2 }} className="text-warning" style={{fontSize:"18px"}}>Month</Form.Label></Col>
                                <Col md={{ span: 2, offset: 0 }}> <Form.Control as="select" md={{ span: 2, offset: 0 }} value={month} onChange={(e)=>{setMonth(e.target.value)}}>
                                    <option value="">select month</option>
                                    <option value="01">Jan</option>
                                    <option value="02">Feb</option>
                                    <option value="03">Mar</option>
                                    <option value="04">Apr</option>
                                    <option value="05">May</option>
                                    <option value="06">Jun</option>
                                    <option value="07">Jul</option>
                                    <option value="08">Aug</option>
                                    <option value="09">Sep</option>
                                    <option value="10">Oct</option>
                                    <option value="11">Nov</option>
                                    <option value="12">Dec</option>
                                </Form.Control></Col>
                            </Row>   
                        </Col>

                    </Row>
                </Col>       
            </Container>
            <Container style={{margin:"20px 50px 50px 150px",}}>

                <Row style={{margin:"20px 50px 50px 150px",}}>
                   
                        <Col>
                            <Row>
                                <Col md={{ span: 2, offset: 2 }}> <Button variant="outline-warning" onClick={CalculateSalary}>Calculate Salary</Button></Col>
                                <Col md={{ span: 4, offset: 0 }}>  <Link to='/adminPannel/EmployeeManager/salaryReport'><Button variant="outline-warning" onClick={()=>{SendDetails(year,month)}} >Generate Salary Report</Button></Link></Col>
                                <Col md={{ span: 2, offset: 0 }}> <Button variant="outline-warning" onClick={()=>{DeleteRecord(year,month)}}>Delete Record</Button></Col>
                            </Row>   
                        </Col>
                   
                </Row>    
            </Container>
        </div>
    )
}

export default Employee 