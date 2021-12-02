import React,{useState, useEffect} from 'react';
import { Form,Row,Col,Button as BootButton} from 'react-bootstrap';
import {  Link } from "react-router-dom";
import './MarkArriving.css';
import { Search } from 'react-bootstrap-icons';
import firebase from "../../firebase";

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  
  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));



function MarkArriving(props) {
    const db = firebase.firestore();
    const [arrivingTime, setArrivingTime] = useState("");
    const [arrivingDate, setArrivingDate] = useState("2021-10-04");
    const [employees, setEmployees] = useState([]);
    const [editingAttendance, setEditingAttendance] = useState(props);
    const [ProjectTitles, SetProjectTitles] = useState([]);
    const [ProjectTitle, SetProjectTitle] = useState("");
    const [updater,setUpdater] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false);
    };
  
   
    
    

    function makeTime() {
        var d = new Date();
        var s = d.getSeconds();
        var m = d.getMinutes();
        var h = d.getHours();
        setArrivingTime(("0" + h).substr(-2) + ":" + ("0" + m).substr(-2) + ":" + ("0" + s).substr(-2));
    }
    setInterval(makeTime, 1000);

    function makeTwodigitNumber(number){
        let formattedNumber = number.toLocaleString('en-US', {
          minimumIntegerDigits: 2,
          useGrouping: false
        })
        return formattedNumber;
    }
    
    


    useEffect(() => {
        function makeTwodigitNumber(number){
            let formattedNumber = number.toLocaleString('en-US', {
              minimumIntegerDigits: 2,
              useGrouping: false
            })
            return formattedNumber;
        }
        function makeDate(){
            var today = new Date();
            
    
            var datee = today.getFullYear()+'-'+makeTwodigitNumber((today.getMonth()+1))+'-'+makeTwodigitNumber(today.getDate());
            console.log(datee);
            
            setArrivingDate(datee);
            console.log(datee);
            console.log("Arriving Date",arrivingDate);
            db.collection("employees").onSnapshot((snapshot) => {
                const arr = snapshot.docs.map((doc) => {
                    
                    
                    return {
                        ID: doc.id,
                        name: doc.data().employeeName,
                        position: doc.data().designation,
                        leftAt: "null",
                        arriveAt: "null",
                    }
                });
          
                console.log(arr);
                for (let i = 0; i < arr.length; i++) {
                    var arrayy=[];
                    var arrayy2=[];
                    db.collection('attendance')
                    .where('employeeID', '==', arr[i].ID)
                    .where('date','==',arrivingDate)
                    .get()
                    .then((querySnapshot)=>{
                        arrayy = querySnapshot.docs.map((docc)=>(
                            docc.data().leftAt
              
                          ));
                          arrayy2 = querySnapshot.docs.map((docc)=>(
                              docc.data().arriveAt
                
                            ));
                          arr[i].leftAt = arrayy[0];
                          arr[i].arriveAt = arrayy2[0];
                    })
                }
                 setEmployees(arr);
                
                console.log(employees)
                
            });
    
              //-----------project titles--------------------------
            db.collection("Con_Project").onSnapshot((snapshot) => {
                const arr = snapshot.docs.map((doc) => (doc.data().Title));
                SetProjectTitles(arr);
                
            });
        }
        makeDate();
         
        
        
        return ()=>{
              
        }

        
    }, [db,updater])

    

      

    function morePressd(ID){
        alert("more clicked");
        editingAttendance.editAttendaceHandler(ID,arrivingDate)
    }
    
    function markArrivingPressed(ID){
        setTimeout(setUpdater(true), 1000);
        var updatingID = "";
        
        const func = async (ID)=>{
            await db.collection("attendance")
            .where('employeeID', '==', ID).where('date','==',arrivingDate).get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log("In finding",doc.id, " => ", doc.data());
                    updatingID=doc.id;
                    
                });
                const myArr = arrivingTime.split(":");
                const temp = myArr[0]+":"+myArr[1];
                const updatedAttendance ={
                    arriveAt: temp,
                    ProjectTitle:ProjectTitle,
                    dayStatus:"working",
                };
        
                db.collection("attendance").doc(updatingID).update(updatedAttendance);
                console.log(updatingID,"=>>",updatedAttendance);
                
                setTimeout(setUpdater(false), 1000);
                handleClick();
            
      
        })
        .catch((error) => {
            alert("error in finding");
            console.log("Error getting documents: ", error);
        });
        }
        func(ID);
        

        
    }

    function UnMarkArrivingPressed(ID){
        setTimeout(setUpdater(true), 1000);
        var updatingID = "";
        
        const func = async (ID)=>{
            await db.collection("attendance")
            .where('employeeID', '==', ID).where('date','==',arrivingDate).get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log("In finding",doc.id, " => ", doc.data());
                    updatingID=doc.id;
                    
                });
                const myArr = arrivingTime.split(":");
                const temp = myArr[0]+":"+myArr[1];
                const updatedAttendance ={
                    arriveAt: "null",
                    ProjectTitle:"",
                    dayStatus:"initialized",
                };
        
                db.collection("attendance").doc(updatingID).update(updatedAttendance);
                console.log(updatingID,"=>>",updatedAttendance);
                
                setTimeout(setUpdater(false), 1000);
                handleClick();
            
      
        })
        .catch((error) => {
            alert("error in finding");
            console.log("Error getting documents: ", error);
        });
        }
        func(ID);
        
        
    }






    return (
        <div className="justify-content-center">
            
            <Row className="mt-5 ">
                <Col s lg="2" className="d-flex justify-content-center align-items-center"></Col>
                <Col s lg="8" className="d-flex justify-content-center align-items-center">
                    <h1 className="text-center text-warning">Mark Arriving</h1>
                </Col>
                
                <Col s lg="2" className="d-flex justify-content-center align-items-center">
                    <Link to='/adminPannel/attendanceManager/DailyAttendanceReport'  className="nav-link" >
                    <Button variant="contained" color="primary" 
                                disabled={false}
                                 
                                className="">
                                    Live Report
                    </Button>
                    </Link>
                </Col>
            </Row>
            <Row className="d-flex justify-content-center mt-3 bg-warning text-white shadow-sm">
                    <Col s lg="2" className="d-flex justify-content-center align-items-center"><h6 className="text-center">Date: {arrivingDate} </h6></Col>
                    <Col s lg="2" className="d-flex justify-content-center align-items-center"><h6 className="text-center">Time: {arrivingTime} </h6></Col>
                    <Col s lg="1" className="d-flex justify-content-center align-items-center"><h6 className="text-right" >Project:</h6></Col>
                    <Col s lg="3" className="d-flex justify-content-center py-2 px-5 mx-s-0">
                        <Form.Control as="select" value={ProjectTitle} onChange={(e)=>{SetProjectTitle(e.target.value);}}>
                            <option className=" text-center text-s-left" value="">select a project Title</option>
                            {ProjectTitles.map(Title=>(
                                 <option className=" text-center text-s-left" value={Title}>{Title}</option>
                            ))}            
                        </Form.Control>
                               
                    </Col>
            </Row>
            
            
            <Row className="justify-content-center mt-3" >
                <div className="searchBar" styles="width:100px">
                    <input id="searchQueryInput" maxwidth="100px" type="text" name="searchQueryInput" placeholder="Search"
                    value={searchTerm} onChange={(event) => {
                        setSearchTerm(event.target.value);
                      }} />
                    <button id="searchQuerySubmit" type="submit" name="searchQuerySubmit">
                        <Search/>
                        
                    </button>
                </div>
            </Row>
           
            <div id="myTable">
            {employees
            .filter((employee) => {
                if (searchTerm == "") {
                  return employee;
                } else if (
                  employee.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) || employee.position
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                ) {
                  return employee;
                }
              }).map((employee) => (
            <Row className="justify-content-center mt-2">
                <div className="arrivingSearchResults pl-5 py-3 shadow-sm">
                    <Row>
                    <Col xs lg="1" className="MarkArriving__align-me-v-center"><svg className="m-2" xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                    </svg>
                    </Col>
                    <Col xs lg="4"><span>employeeID : {employee.ID}</span><br/>
                    <span>name : {employee.name}</span><br/>
                    <span>position : {employee.position}</span></Col>
                    <Col xs lg="4"><span className={(employee.leftAt=="null")? `MarkArriving__hide` :`MarkArriving__displaywarning` }>
                        has left already! </span></Col>

                   

                    <Col xs lg="2">

                        <Button variant="contained" color="primary" 
                                disabled={employee.arriveAt=="null"? false : true}
                                onClick={() => { markArrivingPressed(employee.ID);}} 
                                className="m-1 MarkArriving__arrvingMarkButton">
                                    Mark as arrived
                        </Button><br/>
                        <Snackbar open={open} autoHideDuration={1700} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="success">
                            Successfully updated!
                            </Alert>
                        </Snackbar>

                        <Button variant="contained" color="primary" 
                                disabled={(employee.arriveAt!="null" && employee.leftAt=="null")? false : true}
                                onClick={() => { UnMarkArrivingPressed(employee.ID);}} 
                                className="m-1 MarkArriving__arrvingMarkButton">Unmark</Button>
                    </Col>
                    <Col xs lg="1" className="MarkArriving__align-me-v-center d-flex justify-content-center">
                        <Link to='/adminPannel/attendanceManager/EditAttendance'  className="nav-link" >
                            <BootButton variant="link" onClick={() => { morePressd(employee.ID);}}>more</BootButton>
                        </Link>
                    </Col>
                    </Row>
                    
                </div>
            </Row>
                
                 
          ))}
          </div>  
                
            
        </div>
    )
}

export default MarkArriving
