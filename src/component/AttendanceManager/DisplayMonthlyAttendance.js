import React,{useState, useEffect} from 'react';
import { Form,Row,Col,Table,Button as BootButton} from 'react-bootstrap';
import firebase from "../../firebase";
import './DisplayMonthlyAttendance.css';
import {  Link } from "react-router-dom";
import { Card } from "react-bootstrap";



function DisplayMonthlyAttendance(props) {
    const db = firebase.firestore();
    const [month,setMonth] = useState("");
    const [year,setYear] = useState("");
    const [employeeID,setEmployeeID] = useState(props.employeeID);
    const [employee,setEmployee] = useState({});
    const [attendanceList, setAttendanceList] = useState([]);
    const [attendanceList2, setAttendanceList2] = useState([]);
    const [editingAttendance, setEditingAttendance] = useState(props);
    const [workedDayCount,setworkedDayCount]= useState(0);
    const [leavesCount,setleavesCount]= useState(0);
    const [halfDayCount,sethalfDayCount]= useState(0);
    const [updater,setUpdater]= useState(false);
    

    useEffect(() => {
        function fillTheArray(arr){
            setAttendanceList2([]);
            var ds=days(parseInt(month),parseInt(year))
            console.log("no of days",ds);
            var pd =0;
            var newarr =[];
            for(let i =0; i<arr.length; i++){
                let myArr = arr[i].datee.split("-");
                let d = parseInt(myArr[2]); 
    
                if(d>(pd+1)){
                    newarr.push({
                        ID:'null',
                        datee:myArr[0]+"-"+myArr[1]+"-"+("0" + (pd+1)).substr(-2),
                        arriveAt:'null',
                        leftAt:'null',
                        dayStatus:'null',
                        ProjectTitle:'null',
                    });
                    i--;
                }else{
                    newarr.push(arr[i]);
                }
                pd++;
    
                if(d==ds){
                    
                    break;
                }
                
            }
            console.log("pd>>",pd);
            while(pd<ds){
                newarr.push({
                    ID:'null',
                    datee:year+"-"+month+"-"+("0" + (pd+1)).substr(-2),
                    arriveAt:'null',
                    leftAt:'null',
                    dayStatus:'null',
                    ProjectTitle:'null',
                });
                pd++
            }
            console.log("new array in function after make",newarr, "arr",arr);
            return newarr;
    
        }
        
        console.log(employeeID);
        db.collection("employees")
        .doc(employeeID)
        .get()
        .then(function (doc) {
          if (doc.exists) {
            console.log("Document data:", doc.data());
            setEmployee({
                ID:doc.id,
                name:doc.data().employeeName,
                position:doc.data().designation,

            })
            
            
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });

        //-----------------------------------------------------------------------------
        console.log(employeeID);
        db.collection("attendance")
        .where('employeeID', '==',employeeID).where('month','==',month).where('year','==',year).get()
        .then((querySnapshot) => {
            setAttendanceList([]);
            const arr = querySnapshot.docs.map((doc) => ({
                ID:doc.id,
                datee:doc.data().date,
                arriveAt:doc.data().arriveAt,
                leftAt:doc.data().leftAt,
                dayStatus:doc.data().dayStatus,
                ProjectTitle:doc.data().ProjectTitle,

            }));
            arr.sort((a,b) => (a.datee > b.datee) ? 1 : ((b.datee > a.datee) ? -1 : 0));
            setAttendanceList(arr);
            console.log("before call>> arr ",arr);
            setAttendanceList2(fillTheArray(arr));
            console.log("watch>>>>>>>>>>",attendanceList2);
            
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });

        //getting data for worked days leaves and half days
        db.collection("attendance")
        .where('employeeID', '==',employeeID).where('month','==',month).where('year','==',year).where('dayStatus','==','worked').get()
        .then((querySnapshot) => {
            
            const arr = querySnapshot.docs.map((doc) => (doc.data()));
            
            const no = arr.length
            setworkedDayCount(no);
            console.log("worked days.....>>>>>",workedDayCount);
            
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
        db.collection("attendance")
        .where('employeeID', '==',employeeID).where('month','==',month).where('year','==',year).where('dayStatus','==','onLeave').get()
        .then((querySnapshot) => {
            setAttendanceList([]);
            const arr = querySnapshot.docs.map((doc) => (doc.data()));
            const no = arr.length
            console.log(arr.length)
            setleavesCount(no)
            console.log("leaves days.....>>>>>",leavesCount);
            
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
        db.collection("attendance")
        .where('employeeID', '==',employeeID).where('month','==',month).where('year','==',year).where('dayStatus','==','onHalfDay').get()
        .then((querySnapshot) => {
            setAttendanceList([]);
            const arr = querySnapshot.docs.map((doc) => (doc.data()));
            const no = arr.length
            console.log(arr.length)
            sethalfDayCount(no)
            console.log("onHalfDay days.....>>>>>",halfDayCount);
            
            
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
        
        
        

    }, [db,month,year,updater]);

    function morePressd(ID,datee){
        alert("edit clicked");
        editingAttendance.editAttendaceHandler(ID,datee)
    }

    function days(monthx,yearx) {
        return new Date(yearx, monthx, 0).getDate();
     };
    /*function fillTheArray(){
        
        var ds=days(parseInt(month),parseInt(year))
        console.log("no of days",ds);
        var pd =0;
        var newarr =[];
        for(let i =0; i<attendanceList.length; i++){
            let myArr = attendanceList[i].datee.split("-");
            let d = parseInt(myArr[2]); 

            if(d>(pd+1)){
                newarr.push({
                    ID:'null',
                    datee:myArr[0]+"-"+myArr[1]+"-"+("0" + (pd+1)).substr(-2),
                    arriveAt:'null',
                    leftAt:'null',
                    dayStatus:'null',
                    ProjectTitle:'null',
                });
                i--;
            }else{
                newarr.push(attendanceList[i]);
            }
            pd++;

            if(d==ds){
                
                break;
            }
            
        }
        console.log("pd>>",pd);
        while(pd<ds){
            newarr.push({
                ID:'null',
                datee:year+"-"+month+"-"+("0" + (pd+1)).substr(-2),
                arriveAt:'null',
                leftAt:'null',
                dayStatus:'null',
                ProjectTitle:'null',
            });
            pd++
        }
        console.log(newarr);
        return newarr;

    }*/
    
    
    

    return (
        <div className="justify-content-center">
            <Row className="justify-content-center mt-5">
                <h1 className="text-center text-warning">Monthly Attendance Report</h1>
            </Row>
            <Row className="d-flex justify-content-center mt-3 bg-warning text-white shadow-sm">
                    <Col xs lg="3" className="d-flex align-items-center py-2"><h6 className="text-right w-100">ID: {employee.ID} </h6></Col>
                    <Col xs lg="3" className="d-flex align-items-center py-2"><h6 className="text-center w-100">Name: {employee.name} </h6></Col>
                    <Col xs lg="3" className="d-flex align-items-center py-2"><h6 className="text-leftt w-100" >Position:{employee.position}</h6></Col>
                    <Col xs lg="3" className="d-flex align-items-center py-2"><h6 className="text-leftt w-100 DisplayMonthlyAttendance__align-me-v-center" >

                        MM:<Form.Control as="select" size="sm" className="DisplayMonthlyAttendance__mon-year-width mx-1" value={month} onChange={(e)=>{setMonth(e.target.value);setUpdater(true)}}>
                                <option value="">month</option>
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
                        </Form.Control>/    
                        YY:<Form.Control size="sm" as="select" className="DisplayMonthlyAttendance__mon-year-width mx-1" value={year} onChange={(e)=>{setYear(e.target.value);}}>
                                
                                <option value="">year</option>
                                <option value="2020">2020</option>
                                <option value="2021">2021</option>
                                         
                        </Form.Control>    

                        </h6>
                    </Col>
            </Row>
            <Row className=" mt-5">
                <Col xs lg="4" className="d-flex justify-content-center py-2">
                    <Card
                        hover="true"
                        className="text-center rounded align-middle shadow"
                        bg={"Warning".toLowerCase()}
                        text={"white"}
                        style={{ width: "12rem", height: "7rem", color: "#111111" }}
                    >
                        <Card.Body>
                            <Card.Title>Total Worked Days</Card.Title>
                            <Card.Title>{workedDayCount}</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs lg="4" className="d-flex justify-content-center py-2">
                    <Card 
                        hover="true"
                        className="text-center rounded align-middle shadow"
                        bg={"Warning".toLowerCase()}
                        text={"white"}
                        style={{ width: "12rem", height: "7rem", color: "#111111" }}
                    >
                        <Card.Body>
                            <Card.Title>Total HalfDays</Card.Title>
                            <Card.Title>{halfDayCount}</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs lg="4" className="d-flex justify-content-center py-2">
                    <Card
                        hover="true"
                        className="text-center rounded shadow"
                        bg={"Warning".toLowerCase()}
                        text={"white"}
                        style={{ width: "12rem", height: "7rem", color: "#111111" }}
                    >
                        <Card.Body>
                            <Card.Title>Total Leaves</Card.Title>
                            <Card.Title>{leavesCount}</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>

            </Row>
            <Row className="justify-content-center mt-5 pr-5 pl-5">
                <Table striped bordered hover size="sm" className="w-100 m-5 shadow">
                    <thead>
                        <tr>
                        <th className="text-center">date</th>
                        <th className="text-center">Arrive At</th>
                        <th className="text-center">Left At</th>
                        <th className="text-center">Day Status</th>
                        <th className="text-center">Worked Project</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        attendanceList2.map((attendance) => (
                                
                            <tr>
                                <td className={`text-center ${(attendance.dayStatus=="null") ? "DisplayMonthlyAttendance__noDataBg" : ""} `} >{attendance.datee}</td>
                                <td className={`text-center ${(attendance.dayStatus=="null") ? "DisplayMonthlyAttendance__HideElement" : ""} `}>{attendance.arriveAt}</td>
                                <td className={`text-center ${(attendance.dayStatus=="null") ? "DisplayMonthlyAttendance__HideElement" : ""} `}>{attendance.leftAt}</td>
                                <td className={`text-center ${(attendance.dayStatus=="null") ? "DisplayMonthlyAttendance__HideElement" : ""} `}>{attendance.dayStatus}</td>
                                <td className={`text-center ${(attendance.dayStatus=="null") ? "DisplayMonthlyAttendance__HideElement" : ""} `}>{attendance.ProjectTitle}</td>
                                <td className={`text-center DisplayMonthlyAttendance__editbtn ${(attendance.dayStatus=="null") ? "DisplayMonthlyAttendance__HideElement" : ""} `}>
                                    <Link className="" to='/adminPannel/EmployeeManager/EditAttendance'  className="nav-link" >
                                        <svg onClick={() => { morePressd(employeeID,attendance.datee);}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                        </svg>
                                    </Link>    
                                </td>
                                <td colspan="6" className={`text-center DisplayMonthlyAttendance__noDataBg ${(attendance.dayStatus=="null") ? "" : "DisplayMonthlyAttendance__HideElement"} `}>No data Found!</td>
                            </tr>
                            

                            
                        ))}
                        
                    </tbody>
                </Table>
            </Row>
            
            
        </div>
    )
}

export default DisplayMonthlyAttendance
