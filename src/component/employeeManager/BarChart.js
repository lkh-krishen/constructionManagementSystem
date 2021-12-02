import React ,{ useState, useEffect }from 'react';
import { Bar } from 'react-chartjs-2';
import PageHeader from "./PageHeader";
import PersonIcon from '@material-ui/icons/Person';
import firebase from 'firebase';

function BarChart(props) {

    //variable declaration
    const [designation, setDesignation] = useState([]);
    const [totEmp, setEmployee] = useState([]);
    const [des, setDes] = useState([]);
    const [employeeArrayState,setEmployeeArrayState] = useState([]);

    //Database Connections
    const db=firebase.firestore(firebase);
    const db1 = firebase.firestore().collection("designation"); 
    const db2 = firebase.firestore().collection("employees");


    //Retrieval of Projects
   /* function RetDesignation(e){
        const designationObj = {};
   
    db1.collection("Designation").then((item) => {
      item.docs.forEach(element=>{
        designationObj[element.data().designation]
      })
      setDesignation(items);
  
    });
   
  }
   //Retrieval of Employee
   function RetEmp(e){

   
    db2.get().then((item) => {
      const items = item.docs.map((doc) => ({
        id:doc.id,
        data:doc.data()
      }));
      setEmployee(items);
  
    });

    function getCount(){

        let count = 0;
     
        
        
    }
   
  }*/

  //calling function
    useEffect(() => {
    //RetDesignation();
    //RetEmp();
    //retrive designation
    async function getData(){
        const designationObj={};
        const designationArray=[];
        const employeeCount=[];
        await db.collection("Designation").onSnapshot(async (snapshot)=>{ //getting designation
            await snapshot.docs.forEach(element=>{
                designationObj[element.data().designation]=0; //split 4
                designationArray.push(element.data().designation); //push in aaray
            });
            console.log("designationObj",designationObj);
            console.log("des array",designationArray);
            db.collection("employees").onSnapshot(async (snapshot2)=>{ //getting employee
                await snapshot2.docs.forEach(element=>{
                    designationObj[element.data().designation]++;
                    
                });

                console.log("designationObj",designationObj);
                console.log("des array",designationArray);
                setDesignation(designationArray);
                designationArray.forEach(element=>{
                    employeeCount.push(designationObj[element]); //put each count in array
                });
                console.log("employeeCount array",employeeCount);
                setEmployeeArrayState(employeeCount);

               

            })
        })
    }
    getData();
  
   
  }, []);

    return (
        <>
        <PageHeader
        title="Report"
        //subTitle="Form design with validation"
        icon={<PersonIcon fontSize="large" />}
        />

        <div>
            <Bar
                data={{
                    labels: designation,
                    datasets: [{
                        label: 'Contract Employees',
                        data :  employeeArrayState ,
                        backgroundColor: ['rgba(255, 99, 132, 0.2)',
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(255, 99, 132, 0.2)'],
                        borderColor: [
                            //'rgba(255, 99, 132, 1)',
 
                        ],
                        borderWidth: 1

                    },
                    {
                        label: 'Non-contract employees',
                        data: [2, 1, 2, 1],
                        backgroundColor: 'rgba(100, 162, 235, 0.2)',
                        borderColor:'rgba(255, 159, 64, 1)'
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
        </div>
    </>
    )
}

export default BarChart