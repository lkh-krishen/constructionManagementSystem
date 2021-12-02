import React,{useEffect,useState} from 'react';
import {  Link } from "react-router-dom";
import { Button ,Container,Row} from 'react-bootstrap';
import firebase from "../../firebase";
import './attendancemanager.css';


function AttendanceManagerPannel() {
    const db = firebase.firestore();
    const [employees, setEmployees] = useState([]);
    const [arriveAt, setArriveAt] = useState("null");
    const [todayDate,setTodayDate] = useState("2021-08-01");
    const [dayStatus, setDayStatus] = useState("initialized");
    const [employeeID, setEmployeeID] = useState("");
    const [leftAt, setLeftAt] = useState("null");
    const [month, setMonth] = useState("09");
    const [year, setYear] = useState("2021");
    const [ProjectTitle, setProjectTitle] = useState("");

    function makeTwodigitNumber(number){
        let formattedNumber = number.toLocaleString('en-US', {
          minimumIntegerDigits: 2,
          useGrouping: false
        })
        return formattedNumber;
    }

    const checkInitializationForall=()=>{

        const datee = todayDate;
        employees.forEach(async (item,index)=>{
          
        await db.collection("attendance").where("employeeID", "==",item).where("date", "==",datee).get()
          .then(async (querySnapshot)=>{
            console.log("inside loop",item);
            if (querySnapshot.empty) {
                
            await db.collection("attendance")
                    .doc()
                    .set({
                        arriveAt,
                        "date":datee,
                        "employeeID":item,
                        dayStatus,
                        leftAt,
                        month,
                        year,
                        ProjectTitle

                    })
                    .then(() => {
                        console.log("Document successfully written!");
                    })
                    .catch((error) => {
                        console.error("Error writing document: ", error);
                });
                console.log(item,"Not Exsist!",employeeID);

              } else {
                console.log(item,"Exsist! yes"); // create the document
              }

          });
           });
      }
      
    
    

    
    



    useEffect(() => {
        function makeDate(){
            var today = new Date();
            function makeTwodigitNumber(number){
                let formattedNumber = number.toLocaleString('en-US', {
                  minimumIntegerDigits: 2,
                  useGrouping: false
                })
                return formattedNumber;
            }
    
            var date = today.getFullYear()+'-'+makeTwodigitNumber((today.getMonth()+1))+'-'+makeTwodigitNumber(today.getDate());
            var montht = makeTwodigitNumber((today.getMonth()+1));
            var yearr = today.getFullYear()+'';
            setTodayDate(date);
            setMonth(montht);
            setYear(yearr);
        }
        makeDate();

        console.log("started one");
        async function fetchdata(){
            console.log("running");
            await db.collection("employees").onSnapshot((snapshot) => {
                const arr = snapshot.docs.map((doc) => (
                  doc.id
                  
                ));
          
                
                setEmployees(arr);
                
              });
              
              
        }
        fetchdata();
        

      console.log("started end");
      
      
           
     }, [db]);
      

      
      console.log("EmployeeID List>>>>>>",employees);
      function deleteClient() {
        var jobskill_query = db.collection('attendance').where('date','==',"2021-10-01");
            jobskill_query.get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                doc.ref.delete();
            });
            });
      }
      //deleteClient();

      
    
      

      


      
      
      




      

    return (
        <div>
            <Row className="justify-content-md-center mt-5">
                <h1 className="text-center text-warning">Employee Attendance</h1>
            </Row>
                        
            
            <Container className="width500px mt-5 bg-white p-5 rounded"  >
                <Row className="justify-content-md-center ">
                    <div className="w-100 align-middle mh-100">
                        <Link to='/adminPannel/attendanceManager/markArriving'  className="nav-link" >
                            <Row className="justify-content-md-center">
                                <Button className="attendanceManager__mainButton" variant="outline-warning" onClick={()=>{checkInitializationForall()}}>
                                    Mark arriving attendace
                                </Button>
                            </Row>                
                        </Link>
                        <Link to='/adminPannel/attendanceManager/markLeaving'  className="nav-link" >
                            <Row className="justify-content-md-center">
                                <Button className="attendanceManager__mainButton" variant="outline-warning" onClick={()=>{checkInitializationForall()}}>
                                    Mark leaving attendace
                                </Button>
                            </Row>                
                        </Link>
                        <Link to='/adminPannel/attendanceManager/MarkPastHolidays'  className="nav-link" >
                            <Row className="justify-content-md-center">
                                <Button className="attendanceManager__mainButton" variant="outline-warning" onClick={()=>{checkInitializationForall()}}>
                                    Mark Past hollidays
                                </Button>
                            </Row>                   
                        </Link>
                        <Link to='/adminPannel/attendanceManager/DeleteOldData'  className="nav-link" >
                            <Row className="justify-content-md-center">
                                <Button className="attendanceManager__mainButton" variant="outline-warning" onClick={()=>{checkInitializationForall()}}>
                                    Delete Old Attendace
                                </Button>
                            </Row>                   
                        </Link>
                        
                       
                        
                        
                    </div>
                </Row>
            </Container>
            
        </div>
    )
}

export default AttendanceManagerPannel