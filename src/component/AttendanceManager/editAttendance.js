import React,{useEffect, useState} from 'react';
import {Row,Form,Col,Button} from 'react-bootstrap';
import './editAttendance.css';
import firebase from "../../firebase";

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
function EditAttendance(props) {

    const db = firebase.firestore();
    const [arriveAt, setArriveAt] = useState("");
    const [leftAt, setleftAt] = useState("");
    const [date, setDate] = useState(props.editingAttendanceDate);
    const [employeeName, setEmployeeName] = useState("");
    const [position, setPosition] = useState("");
    const [employeeID, setEmployeeID] = useState(props.employeeID);
    const [dayType, setDaytype] = useState("");
    const [attendanceDocID, setAttendanceDocID] = useState("");
    const [ProjectTitles, SetProjectTitles] = useState([]);
    const [ProjectTitle, SetProjectTitle] = useState("");
    const [month, setMonth] = useState("08");
    const [year, setYear] = useState("2021");
    const [maxDate,setMaxDate] = useState("");

    const classes = useStyles();
    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);

    const error1HandleClick = () => {
        setOpen1(true);
    };
    const error2HandleClick = () => {
        setOpen2(true);
    };
    const error3HandleClick = () => {
        setOpen3(true);
    };

    const error1HandleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen1(false);
    };
    const error2HandleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen2(false);
    };
    const error3HandleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen3(false);
    };
    
    //7zdlrB1jfaWyXJrpjkW0

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
            
            setMaxDate(date);
            
        }
        makeDate();
        db.collection("employees")
        .doc(employeeID)
        .get()
        .then(function (doc) {
          if (doc.exists) {
            console.log("Document data:", doc.data());
            setEmployeeName(doc.data().employeeName);
            setPosition(doc.data().designation);
            
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });

        //-----------------------------------------------------------------------------

        db.collection("attendance")
        .where('employeeID', '==', employeeID).where('date','==',date).get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                setDaytype(doc.data().dayStatus);
                setArriveAt(doc.data().arriveAt);
                setleftAt(doc.data().leftAt);
                SetProjectTitle(doc.data().ProjectTitle);
                setAttendanceDocID(doc.id);
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
        
        //-----------project titles--------------------------
        db.collection("Con_Project").onSnapshot((snapshot) => {
            const arr = snapshot.docs.map((doc) => (doc.data().Title));
      
            
            SetProjectTitles(arr);
        });

    }, [db,date]);

    function editdata(e){
        e.preventDefault();
        if(arriveAt=="null" && leftAt!="null"){
            error1HandleClick();
        
        }else if(arriveAt>leftAt){
            error2HandleClick();
        }else{

            
            const myArr = date.split("-");
            setMonth(myArr[1]);
            setYear(myArr[0]);
            
            const updatedAttendance ={
                arriveAt,
                "dayStatus":dayType,
                leftAt,
                ProjectTitle

            }
            console.log(updatedAttendance);

            db.collection("attendance").doc(attendanceDocID).update(updatedAttendance);
            error3HandleClick();
        }
        
        
    }
   

    return (
        <div>
            <Row className="justify-content-center mt-5">
                <h1 className="text-center text-warning">Edit attendace</h1>
            </Row>
            
            <Row className="d-flex justify-content-center mt-3 bg-warning text-white">
                    <Col sm lg="3" className="justify-content-center py-2"><h6 className="text-center">EmployeeID: {employeeID} </h6></Col>
                    <Col sm lg="3" className="justify-content-center py-2"><h6 className="text-center">Name: {employeeName} </h6></Col>
                    <Col sm lg="3" className="justify-content-center py-2"><h6 className="text-center" >Position: {position}</h6></Col>
                    
            </Row>
            <Row className="justify-content-center ">
                <Form className="w-75 justify-content-center mb-5"  onSubmit={editdata}>
                    
                    <Row className="d-flex justify-content-center align-items-center mt-3 w-100">
                        
                        <Col sm lg="3" className="d-flex justify-content-center align-items-center">
                        <Form.Group className="mb-1" controlId="formBasicEmail">
                            <Form.Label><h6 className="" >Date :</h6></Form.Label>
                            <Form.Control className="maxwid" max={maxDate} type="date" value={date} onChange={(e)=>{setDate(e.target.value);}} />
                        </Form.Group></Col>
                         
                    </Row>    
                    <Row className="justify-content-center mt-5 w-100">
                        <Col sm lg="4" className="d-flex justify-content-center">
                            <Form.Group className="mb-1" controlId="formBasicEmail">
                                <Form.Label>Arrive At</Form.Label>
                                <Form.Control type="time"  className="maxwid" value={arriveAt} onChange={(e)=>{setArriveAt(e.target.value);error1HandleClose();error2HandleClose();}}/>
                                
                            </Form.Group>
                        </Col>
                        <Col sm lg="4" className="d-flex justify-content-center">
                            <Form.Group className="mb-1" controlId="formBasicEmail">
                                <Form.Label>Left At</Form.Label>
                                <Form.Control type="time" className="maxwid"  value={leftAt} onChange={(e)=>{setleftAt(e.target.value);error1HandleClose();error2HandleClose();}}/>
                                
                                
                            </Form.Group>
                            
                           
                        
                        </Col>
                    
                    </Row> 
                    <Row className="justify-content-center mt-1 w-100">
                        <Col sm lg="4" className="d-flex justify-content-center ">
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Day type</Form.Label>
                                <Form.Control  as="select" className="maxwid" value={dayType} onChange={(e)=>{setDaytype(e.target.value);}}>
                                    
                                    <option value="initialized">Initialized</option>
                                    <option value="worked">Worked</option>
                                    <option value="working">Working</option>
                                    <option value="onLeave">On Leave</option>
                                    <option value="onHalfDay">On Half Day</option>
                                    <option value="holliday">HolliDay</option>
                                    
                                </Form.Control>
                            </Form.Group>    
                        </Col>
                        <Col sm lg="4" className="d-flex justify-content-center">
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Project</Form.Label>
                                <Form.Control  as="select" className="maxwid" value={ProjectTitle} onChange={(e)=>{SetProjectTitle(e.target.value);}}>
                                    <option value="">select a project Title</option>
                                    {ProjectTitles.map(Title=>(
                                        <option value={Title}>{Title}</option>
                                    ))}
                                    
                                    
                                </Form.Control>
                            </Form.Group>    
                        </Col>
                        
                    
                    </Row> 
                    <Row className="justify-content-center mt-1 w-100">
                        <Col xs lg="3" className=" d-flex justify-content-center">
                            <Button variant="warning" type="submit" className="">
                                Submit
                            </Button>
                        </Col>
                        
                    
                    </Row>   
                     
                </Form>
            </Row>
            <Snackbar open={open1} autoHideDuration={40000} onClose={error1HandleClose}>
                <Alert onClose={error1HandleClose} severity="error">
                    You cannot mark left time without marking arrived time!
                </Alert>
            </Snackbar>
            <Snackbar open={open2} autoHideDuration={40000} onClose={error2HandleClose}>
                <Alert onClose={error2HandleClose} severity="error">
                Arrived time cannot be grater than left Time!
                </Alert>
            </Snackbar>
            <Snackbar open={open3} autoHideDuration={2200} onClose={error3HandleClose}>
                <Alert onClose={error3HandleClose} severity="success">
                Updated successfully!
                </Alert>
            </Snackbar>
        </div>
    )
}

export default EditAttendance
