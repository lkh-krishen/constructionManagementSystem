import React,{useEffect,useState} from 'react';
import '../../assets/css/home/bootstrap.min.css';
import '../../assets/css/home/agency.min.css';
import {  Link,useHistory } from "react-router-dom";
import { NavDropdown} from 'react-bootstrap';

import firebase from "../../firebase";
import './Header.css'
//attendanceHeader
function AttendanceHeader() {
    const db = firebase.firestore();
    const [employees, setEmployees] = useState([]);
    const [arriveAt, setArriveAt] = useState("null");
    const [todayDate,setTodayDate] = useState("2021-08-01");
    const [dayStatus, setDayStatus] = useState("initialized");
    const [employeeID, setEmployeeID] = useState("");
    const [leftAt, setLeftAt] = useState("null");
    const [month, setMonth] = useState("08");
    const [year, setYear] = useState("2021");
    const [ProjectTitle, setProjectTitle] = useState("");
    const [auth,setAuth] = useState(false);
    const [user,setUser] = useState({name:""});
    let history = useHistory();


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


        const func = async ()=>{
            var id= localStorage.getItem("token");
            if(localStorage.getItem("token")==null){
                console.log("not logged in")
            }else{
    
                const cityRef = db.collection('AdminAccounts').doc(id);
                const doc = await cityRef.get();
                if (!doc.exists) {
                console.log('No such document!');
                setAuth(false);
                history.push('/');
                } else {
                console.log('Document data:', doc.data());
                setUser({name:doc.data().userName});
                setAuth(true);
                }
            }
           
            
        }
        func();




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

     function logout(){
        localStorage.setItem("token", null);
        history.push('/');
    }
      

      
      console.log("EmployeeID List>>>>>>",employees);
      function deleteClient() {
        var jobskill_query = db.collection('attendance').where('date','==',"2021-08-05");
            jobskill_query.get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                doc.ref.delete();
            });
            });
      }
      //deleteClient();

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark Header__height py-lg-1" id="mainNav" >
                <div className="container">
                <a className="navbar-brand" href="#page-top"><img className="Header_imageWidth" src="../../assets/img/7a67f2976c750a4c9055d4bf1dc646aa.png" alt="..." /></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    Menu
                    <i className="fa fa-bars ms-1"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav text-uppercase ms-auto py-4 py-lg-0">
                    <li className="nav-item"><Link to='/'  className="nav-link" >Home</Link></li>
                    
                    <li className="nav-item"><Link to='/adminPannel'  className="nav-link" >Admin Pannel</Link></li>
                    <li className="nav-item">   
                        <NavDropdown
                            id="nav-dropdown-dark-example"
                            title="Attendace Manager"
                            menuVariant="dark"
                            >
                            <Link to='/adminPannel/attendanceManager/attendanceManagePanel'  className="nav-link" >
                                <NavDropdown.Item href="#action/3.1" onClick={()=>{checkInitializationForall()}}>
                                    Attendace mannager pannel
                                </NavDropdown.Item>
                            </Link>

                            <Link to='/adminPannel/attendanceManager/markArriving'  className="nav-link" >
                                <NavDropdown.Item href="#action/3.1" onClick={()=>{checkInitializationForall()}}>
                                    Mark arriving attendace
                                </NavDropdown.Item>
                            </Link>
                            <Link to='/adminPannel/attendanceManager/markLeaving'  className="nav-link" >
                                <NavDropdown.Item href="#action/3.1" onClick={()=>{checkInitializationForall()}}>
                                    Mark leaving attendace
                                </NavDropdown.Item>                
                            </Link>
                            <Link to='/adminPannel/attendanceManager/MarkPastHolidays'  className="nav-link" >
                                <NavDropdown.Item href="#action/3.1" onClick={()=>{checkInitializationForall()}}>
                                     Mark Past hollidays
                                </NavDropdown.Item>                
                            </Link>
                            <Link to='/adminPannel/attendanceManager/DeleteOldData'  className="nav-link" >
                                <NavDropdown.Item href="#action/3.1" onClick={()=>{checkInitializationForall()}}>
                                    Delete Old Attendace
                                </NavDropdown.Item>                
                            </Link>
                            
                            
                        </NavDropdown>
                    </li>

                    <li className={(auth)? `nav-item` :`home__hide_adminPannel` } >
                    <NavDropdown
                            id="nav-dropdown-dark-example"
                            title={user.name}
                            menuVariant="dark"
                            >
                       
                                <NavDropdown.Item href="#action/3.1" onClick={logout}>
                                    Logout
                                </NavDropdown.Item>
                            

                            
                        </NavDropdown></li>


                    </ul>
                </div>
                </div>
            </nav>
        </div>
    )
}

export default AttendanceHeader