import React,{useState, useEffect} from 'react';
import { Modal,Form,Row,Col,Container,Button,} from 'react-bootstrap';
import firebase from "../../firebase";
import './DisplayMonthlyAttendance.css';
import {  Link } from "react-router-dom";
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

function DeleteOldData() {
    const [selectedDate,setSelectedDate] = useState("");
    const [maxDate,setMaxDate] = useState("");
    const [show, setShow] = useState(false);
    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = useState(false);
    const db = firebase.firestore();
    const [password, setPassword] = useState("");

    const error1HandleClick = () => {
        setOpen1(true);
    };
    const error1HandleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen1(false);
    };

    const error2HandleClick = () => {
        setOpen2(true);
    };
    const error2HandleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen2(false);
    };

    const handleClose = () => setShow(false);
    const handleShow = (e) =>{setShow(true);}

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
            
            
            var datee = today.getFullYear()-1+'-'+makeTwodigitNumber((today.getMonth()+1))+'-'+makeTwodigitNumber(today.getDate());
            
            
            setMaxDate(datee);
            
        }
        makeDate();
      
      
           
     }, [db]);

     function deletedata() {
        setShow(false);
        setPassword("")
        var jobskill_query = db.collection('attendance').where('date','<',selectedDate);
            jobskill_query.get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                doc.ref.delete();
            });
            });
            error1HandleClick();
      }

      function passwordValidation(e){
        e.preventDefault();
        const func = async ()=>{
            var id= localStorage.getItem("token");
            if(localStorage.getItem("token")==null){
                console.log("not logged in")
            }else{
    
                const cityRef = db.collection('AdminAccounts').doc(id);
                const doc = await cityRef.get();
                if (!doc.exists) {
                console.log('No such document!');
                } else {
                console.log('Document data from password check: ', doc.data());
                    if(doc.data().password==password){
                        handleShow();
                    }else{
                        error2HandleClick();
                    }
                
                }
            }
           
            
        }
        func();
    }

    
    return (
        <div>
            <Row className="justify-content-md-center mt-5">
                <h1 className="text-center text-warning">Delete Old Attendance Data</h1>
            </Row>
                        
            
            <Container className="width500px mt-5 bg-white p-5 rounded"  >
                <Row className="d-flex justify-content-center ">
                    <div className="w-100 align-middle mh-100 d-flex justify-content-center ">
                    <Form className="w-75 justify-content-center mb-5"  onSubmit={passwordValidation} >
                    

                        <Row className="d-flex justify-content-center align-items-center mt-3 w-100 text-danger">
                            
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
                                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                            </svg>
                                
                                
                        </Row>
                        <Row className="d-flex justify-content-center align-items-center mt-3 w-100 text-danger text-center">
                            
                            Be carefull, All the attendance details before the day that you select will be deleted!
                                
                                
                        </Row>
                    
                        <Row className="d-flex justify-content-center align-items-center mt-3 w-100">
                            
                        
                            <Form.Group className="mb-1 " controlId="formBasicEmail">
                                <Form.Label>
                                    <h6 className="" >Date :</h6>
                                </Form.Label>
                                <Form.Control className="maxwid" type="date" max={maxDate} value={selectedDate} onChange={(e)=>{setSelectedDate(e.target.value);}} required />
                            </Form.Group>
                            
                        </Row>
                        <Row className="d-flex justify-content-center align-items-center  mt-3 w-100">
                            
    
                            <Form.Group className="mb-1 " controlId="formBasicEmail">
                                <Form.Label>
                                    <h6 className="" >Admin Password :</h6>
                                </Form.Label>
                                <input type="password" class="form-control" value={password} onChange={(e)=>{setPassword(e.target.value);}} placeholder="Password"/>
                            </Form.Group>
                            
                        </Row>
                        
                        <Row className="justify-content-center mt-1 w-100">
                            <Col xs lg="12" className=" d-flex justify-content-center">
                                <Button variant="danger" type="submit" className="">
                                    Delete Data
                                </Button>
                            </Col>
                        </Row>    
                    
                    </Form>
                        
                       
                        
                        
                    </div>
                </Row>
            </Container>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>warning!</Modal.Title>
                </Modal.Header>
                <Modal.Body>are you really want to delete all the attendance details before {selectedDate} </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    cancle
                </Button>
                <Button variant="primary" onClick={deletedata}>
                    Yes, Delete all data
                </Button>
                </Modal.Footer>
            </Modal>
            <Snackbar open={open1} autoHideDuration={2200} onClose={error1HandleClose}>
                <Alert onClose={error1HandleClose} severity="success">
                    Deleted Successfully!
                </Alert>
            </Snackbar>
            <Snackbar open={open2} autoHideDuration={2200} onClose={error2HandleClose}>
                <Alert onClose={error2HandleClose} severity="error">
                    Invalid Password!
                </Alert>
            </Snackbar>
        </div>
    )
}

export default DeleteOldData
