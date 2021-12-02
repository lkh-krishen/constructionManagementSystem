import React,{useState, useEffect} from 'react';
import { Modal,Form,Row,Col,Container,Button,} from 'react-bootstrap';
import firebase from "../../firebase";
import './DisplayMonthlyAttendance.css';
import {  Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import './MarkPastHolidays.css'
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

function MarkPastHolidays() {
    const db = firebase.firestore();
    const [employees, setEmployees] = useState([]);
    const [arriveAt, setArriveAt] = useState("null");
    const [HollidayDate,setHollidayDate] = useState("");
    const [todayDate,setTodayDate] = useState("");
    const [dayStatus, setDayStatus] = useState("HolliDay");
    const [employeeID, setEmployeeID] = useState("");
    const [leftAt, setLeftAt] = useState("null");
    const [month, setMonth] = useState("09");
    const [year, setYear] = useState("2021");
    const [password, setPassword] = useState("");
    const [ProjectTitle, setProjectTitle] = useState("");
    const [show, setShow] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);

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
    const handleShow = () =>{
    setShow(true);}

    function makeTwodigitNumber(number){
        let formattedNumber = number.toLocaleString('en-US', {
          minimumIntegerDigits: 2,
          useGrouping: false
        })
        return formattedNumber;
    }

    function markAsAHolliDay(){
        setShow(false);
        setPassword("");
        const x = HollidayDate;
        const myArr = x.split("-");
        const monthh=myArr[1];
        const yearr = myArr[0];
            setMonth(myArr[1]);
            setYear(myArr[0]);
        employees.forEach(async (item,index)=>{
         await db.collection("attendance")
                    .doc()
                    .set({
                        arriveAt,
                        "date":HollidayDate,
                        "employeeID":item,
                        dayStatus:"holliday",
                        leftAt,
                        "month":monthh,
                        "year":yearr,
                        ProjectTitle

                    })
                    .then(() => {
                        error1HandleClick();
                    })
                    .catch((error) => {
                        console.error("Error writing document: ", error);
                });
               

          
           });
      }
      
    
    

      function days(monthx,yearx) {
        return new Date(yearx, monthx, 0).getDate();
     };
    



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
            var datee;
            if(today.getDate()==1 && (today.getMonth()+1==1)){
                datee = (today.getFullYear()-1)+'-'+makeTwodigitNumber((today.getMonth()))+'-'+days(parseInt(12),parseInt(today.getFullYear()-1));
            }
            else if(today.getDate()==1){
                datee = today.getFullYear()+'-'+makeTwodigitNumber((today.getMonth()))+'-'+days(parseInt(today.getMonth()),parseInt(today.getFullYear()));
            }else{
                datee = today.getFullYear()+'-'+makeTwodigitNumber((today.getMonth()+1))+'-'+makeTwodigitNumber(today.getDate()-1);}
            
            
            setTodayDate(datee);
            
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
      
      
           
     }, []);



     function editdata(){
        
        
        
        
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
                <h1 className="text-center text-warning">Mark past HolliDays</h1>
            </Row>
                        
            
            <Container className="width500px mt-5 bg-white p-5 rounded"  >
                <Row className="d-flex justify-content-center ">
                    <div className="w-100 align-middle mh-100 d-flex justify-content-center">
                    <Form className="w-75 justify-content-center mb-5"  onSubmit={passwordValidation} >
                    
                        <Row className="d-flex justify-content-center align-items-center mt-3 w-100">
                            
    
                            <Form.Group className="mb-1 " controlId="formBasicEmail">
                                <Form.Label>
                                    <h6 className="" >Date :</h6>
                                </Form.Label>
                                <Form.Control className="maxwid" type="date" max={todayDate} value={HollidayDate} onChange={(e)=>{setHollidayDate(e.target.value);}} required />
                            </Form.Group>
                            
                        </Row>
                        <Row className="d-flex justify-content-center align-items-center  mt-3 w-100">
                            
    
                            <Form.Group className="mb-1 " controlId="formBasicEmail">
                                <Form.Label>
                                    <h6 className="" >Admin Password :</h6>
                                </Form.Label>
                                <input type="password" class="form-control" value={password} onChange={(e)=>{setPassword(e.target.value);}} placeholder="Password" required/>
                            </Form.Group>
                            
                        </Row>
                        
                        <Row className="justify-content-center mt-1 w-100">
                            <Col xs lg="12" className=" d-flex justify-content-center">
                                <Button variant="warning" type="submit" className="">
                                    Mark As A HolliDay
                                </Button>
                            </Col>
                        </Row>    
                    
                    </Form>
                        
                       
                        
                        
                    </div>
                </Row>
            </Container>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>are you really want to mark {HollidayDate} as a HolliDay?</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    cancle
                </Button>
                <Button variant="primary" onClick={markAsAHolliDay}>
                    Yes, mark as a holliday
                </Button>
                </Modal.Footer>
            </Modal>
            <Snackbar open={open1} autoHideDuration={2200} onClose={error1HandleClose}>
                <Alert onClose={error1HandleClose} severity="success">
                    Updated Successfully!
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

export default MarkPastHolidays
