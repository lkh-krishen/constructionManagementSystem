import React, { useEffect, useState } from 'react';
import firebase from "../../firebase";
import { Bar } from 'react-chartjs-2';
import { Form,Row,Col,Table,Button as BootButton} from 'react-bootstrap';

function DailyAttendanceReport() {
    const db = firebase.firestore();
    const [employeesInProject, setEmployeesInProject] = useState([]);
    const [employeedesig,setEmployeedesig] = useState({})
    const [designations,setDesignations] = useState([]);
    const [datee,setDatee] = useState("2021-10-04");
    const [project,setproject] = useState("Kandy_Mall");
    const [workingEmployees, setWorkingEmployees] = useState([]);
    const [initializedEmployees, setinitializedEmployees] = useState([]);
    const [ProjectTitles, SetProjectTitles] = useState([]);

    
    useEffect(() => {


        /*async function fetchdata(){
            const request = await db.collection("employees").onSnapshot((snapshot) => {

                const employeesDesignationObj ={}
                const designationsObj ={}
                snapshot.docs.forEach(element => {
                    
                    employeesDesignationObj[element.id] =element.data().designation;
                });
          
                console.log(employeesDesignationObj);
                setEmployeedesig(employeesDesignationObj);
               
                console.log(employeedesig);
    
                //---------- getting designations
                db.collection("Designation").onSnapshot((snapshot) => {
                    snapshot.docs.forEach(element => {
                    
                        designationsObj[element.data().designation] =0;
                    });
              
                    console.log(designationsObj);
                    
    
                    db.collection("attendance")
                    .where('ProjectTitle', '==',project).where('date','==',datee).where('dayStatus','==','working').get()
                    .then((querySnapshot) => {
                        var empID;
                        var desig;
                        querySnapshot.docs.forEach(element => {
                            empID=element.data().employeeID;
                            desig = employeesDesignationObj[empID];
                            console.log(desig);
                            designationsObj[desig]++;
                            
                        });
    
                        setDesignations(designationsObj);
                        console.log(designationsObj);
                        console.log(designations);
                        
                        
                    })
                    .catch((error) => {
                        console.log("Error getting documents: ", error);
                    });
    
    
                    
                });
                
              });

              return request
        } 

        fetchdata();*/


        async function fetchdata2(){

            var today = new Date();
            function makeTwodigitNumber(number){
                let formattedNumber = number.toLocaleString('en-US', {
                  minimumIntegerDigits: 2,
                  useGrouping: false
                })
                return formattedNumber;
            }
    
            var date = today.getFullYear()+'-'+makeTwodigitNumber((today.getMonth()+1))+'-'+makeTwodigitNumber(today.getDate());
            console.log(date)
            setDatee(date);


            const employeesDesignationObj ={};
            const designationsObj ={};
            const designationsForLeavesObj ={};
            const designationArray=[];
            const workingArray=[];
            const initializedArray=[];
            const request = await db.collection("employees").onSnapshot(async (snapshot) => {

                
                await snapshot.docs.forEach(element => {
                    
                    employeesDesignationObj[element.id] =element.data().designation;
                });
          
                console.log(employeesDesignationObj);
                setEmployeedesig(employeesDesignationObj);
               
                console.log(employeedesig);
    
                //---------- getting designations
                db.collection("Designation").onSnapshot(async (snapshot) => {
                    await snapshot.docs.forEach(element => {
                    
                        designationsObj[element.data().designation] =0;
                        designationsForLeavesObj[element.data().designation]=0
                        designationArray.push(element.data().designation);
                    });
              
                    console.log(designationsObj);
                    
                    
    
                    db.collection("attendance")
                    .where('ProjectTitle', '==',project).where('date','==',datee).where('dayStatus','==','working').get()
                    .then(async (querySnapshot) => {
                        var empID;
                        var desig;
                        querySnapshot.docs.forEach(element => {
                            empID=element.data().employeeID;
                            console.log(empID);
                            desig = employeesDesignationObj[empID];
                            console.log(desig);
                            designationsObj[desig]++;
                            
                        });
                        designationArray.forEach(element=>{
                            workingArray.push(designationsObj[element]);
                        })
                        console.log("working array:",workingArray);
                        console.log(designationArray);

    
                    })
                    .catch((error) => {
                        console.log("Error getting documents: ", error);
                    }).then(()=>{
                        setDesignations(designationArray);
                        setWorkingEmployees(workingArray)
                        
                    });

                    //----------------employee has not arrived yet---------------

                    db.collection("attendance")
                    .where('date','==',datee).where('dayStatus','==','initialized').get()
                    .then(async (querySnapshot) => {
                        var empID;
                        var desig;
                        querySnapshot.docs.forEach(element => {
                            empID=element.data().employeeID;
                            console.log(empID);
                            desig = employeesDesignationObj[empID];
                            console.log(desig);
                            designationsForLeavesObj[desig]++;
                            
                        });
                        designationArray.forEach(element=>{
                            initializedArray.push(designationsForLeavesObj[element]);
                        })
                        console.log("initialized array:",initializedArray);
                        

    
                    })
                    .catch((error) => {
                        console.log("Error getting documents: ", error);
                    }).then(()=>{
                        
                        setinitializedEmployees(initializedArray)
                        
                    });
    
    
                    
                });
                
                
              });
              console.log(request);
               //-----------project titles--------------------------
                db.collection("Con_Project").onSnapshot((snapshot) => {
                const arr = snapshot.docs.map((doc) => (doc.data().Title));
          
                
                SetProjectTitles(arr);
                });
              
              return request
        } 

       fetchdata2();
        



        //-------------getting employees with designations

        
        



       /* db.collection("attendance")
        .where('ProjectTitle', '==',employeeID).where('date','==',datee).where('ProjectTitle','==',project).get()
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
        });*/
        
        
    }, [project])

    return (
        <div>
            <Row className="justify-content-center mt-5">
                <h1 className="text-center text-warning">Live Attendance Report</h1>

            </Row>

            <Row className="justify-content-center mt-5 ">
            <Col s lg="3" className="d-flex justify-content-center align-items-center">
                <Form.Control as="select" value={project} onChange={(e)=>{setproject(e.target.value);}}>
                            <option className="text-center text-s-left" value="">select a project Title</option>
                            {ProjectTitles.map(Title=>(
                                 <option className=" text-center text-s-left" value={Title}>{Title}</option>
                            ))}            
                </Form.Control>
            </Col>
                
            </Row>

            <Row className="justify-content-center mt-5 p-5 mb-5">
                <Bar
                    data={{
                        labels: designations,
                        datasets: [{
                            label: 'currently working',
                            data: workingEmployees,
                            backgroundColor: 'rgba(100, 162, 235, 0.2)',
                            borderColor:'rgba(100, 162, 235, 1)',
                                
                            
                            borderWidth: 1

                        },
                        {
                            label: 'total employees that haven\'t arrived yet',
                            data: initializedEmployees,
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1
                        },],
                    }}
                    height={400}
                    width={600}
                    options={{
                        maintainAspectRatio: false,
                        scales: {
                            yAxes: [
                                {
                                    ticks: {
                                        beginAtZero: true,
                                    }
                                }
                            ]
                        }


                    }
                    }

                />
            </Row>
            
        </div>
    )
}

export default DailyAttendanceReport
