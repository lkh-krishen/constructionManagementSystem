import React from 'react';
import firebase from "../../firebase";
import { useEffect,useState } from 'react';
import { Container,Button,Table,Form, Row, Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const db = firebase.firestore();

function SalaryReport(props) {
    
    const [year, setYear] = useState(props.year);
    const [month, setmonth] = useState(props.month);
    const[record,setRecord]=useState([]);
    const[tot_amount,settot]=useState("");
    const[tot_etf,settotetf]=useState("");
    const[tot_amount_to_pay,settot_amount_to_pay]=useState("");
    const [loading, setLoading] = useState(false);
    const[searchTerm,setSearchTerm]=useState("");


    useEffect(()=>{
        console.log("inside useeffect");
        console.log("year>>",year,"month>>",month);

        //retrieve salary information from Salary table
        db.collection("Salary").where("year","==",year).where("month","==",month).onSnapshot((querySnapshot)=>{
            const array1 = querySnapshot.docs.map((doc)=>({
            
                    data : doc.data(),
                    key : doc.id,
                    toBepaid:"null",
            }));

            
            console.log("array>>>>>>>>",array1);
            let totAmount=0;
            let totetf=0;
            let tottopay=0;

           
            //for each salary record, calculating the 'toBePaid' amount and setting all the record into 'Record' array
            for(let i=0;i<array1.length;i++){
                console.log("current>>",array1[i]);


                
                array1[i].toBepaid=array1[i].data.amount - array1[i].data.ETF_amount;
                tottopay=tottopay+array1[i].toBepaid;
                totAmount=totAmount+array1[i].data.amount;
                totetf=totetf+array1[i].data.ETF_amount;
                record.push(array1[i]);
                console.log(record);
            }

            settot(totAmount);
            settotetf(totetf);
            settot_amount_to_pay(tottopay);

            console.log("total amount>>>",tot_amount);
            
            console.log("record after evee",record);
            console.log("array after",array1);   
            
            //load the useeffect again and again 
            setTimeout(
                setLoading(true)
            , 1000);
            
        })

        
        


    },[db]);
   


 return (
        <div>
            <Container>
                <center>
                    <Form.Group controlId="formBasicSearchBar">
                    <Form.Control
                        type="text"
                        placeholder="Search by employee's name..."
                        onChange={(event) => {
                        setSearchTerm(event.target.value);
                        }}
                    />
                    </Form.Group>
                </center>
            </Container>
            <Container style={{margin:"100px 100px 20px 480px",}}>
                <h2 className="text-warning" style={{ fontWeight:"18px"}}>Salary Report for Year {year} Month {month}</h2>
            </Container>
            <Container class="container" style={{margin : "100px 300px 100px 100px",border:"5px",}} >
                <Col>
                <table align='center' class="table table-bordered" style={{border:"5px",}}>
                    <thead style={{backgroundColor:"#212121",fontSize:"18px",fontStyle:"", fontWeight:"5px"}}>
                        <tr>
                        <td style={{ textAlign: "center", verticalAlign: "middle" }} className="text-warning">Employee_Name</td>
                        <td style={{ textAlign: "center", verticalAlign: "middle" }} className="text-warning">Basic Salary</td>
                        <td style={{ textAlign: "center", verticalAlign: "middle" }} className="text-warning">Work_Days</td>
                        <td style={{ textAlign: "center", verticalAlign: "middle" }} className="text-warning">Total_Amount</td>
                        <td style={{ textAlign: "center", verticalAlign: "middle" }} className="text-warning">ETF_Amount</td>
                        <td style={{ textAlign: "center", verticalAlign: "middle" }} className="text-warning">Amount_to_be_Paid</td>
                        </tr>
                    </thead>
                    <tbody>
                        {record.filter((record)=>{
                            if (searchTerm == "") {
                                return record;
                              } else if (
                                record.data.employee_name
                                  .toLowerCase()
                                  .includes(searchTerm.toLowerCase())
                              ) {
                                return record;
                              }
                        }).map((doc)=>(
                            <tr>
                                <td style={{ textAlign: "left", verticalAlign: "middle" }}>{doc.data.employee_name}</td>
                                <td style={{ textAlign: "center", verticalAlign: "middle" }}>{doc.data.basic_salary}</td>
                                <td style={{ textAlign: "center", verticalAlign: "middle" }}>{doc.data.work_days}</td>
                                <td style={{ textAlign: "center", verticalAlign: "middle" }}>{doc.data.amount}</td>
                                <td style={{ textAlign: "center", verticalAlign: "middle" }}>{doc.data.ETF_amount}</td>
                                <td style={{ textAlign: "center", verticalAlign: "middle" }}>{doc.toBepaid}</td> 
                            </tr>
                        ))}
                    </tbody>
                </table>
                </Col>
            </Container>
            <Container>
                <Col md={{offset: 6 }}>
                    <Row>
                        <Col>
                            <Row>
                                <Col md={{ span: 2, offset: 2 }}>  <Button variant="outline-warning" class="text-warning" disabled>Total Amount</Button> </Col>
                                <Col md={{ span: 2, offset: 0 }}> <Form.Control value={tot_amount} style={{fontWeigh:"20px"}} placeholder="" disabled /></Col>
                            </Row>   
                        </Col>

                    </Row><br/>
                    <Row>
                        <Col>
                            <Row>
                                <Col md={{ span: 2, offset: 2 }}>  <Button variant="outline-warning" class="text-warning" disabled>Total ETF Amount</Button> </Col>
                                <Col md={{ span: 2, offset: 0 }}> <Form.Control value={tot_etf} style={{fontWeigh:"20px"}} placeholder="" disabled /></Col>
                            </Row>   
                        </Col>

                    </Row><br/>
                    <Row>
                        <Col>
                            <Row>
                                <Col md={{ span: 2, offset: 2 }}>  <Button variant="outline-warning" class="text-warning" disabled>Total Amount to Pay</Button> </Col>
                                <Col md={{ span: 2, offset: 0 }}> <Form.Control value={tot_amount_to_pay} style={{fontWeigh:"20px"}} placeholder="" disabled /></Col>
                            </Row>   
                        </Col>

                    </Row><br/>
                </Col>
                <Row >
                        <Col>
                            <Link to='/AdminPannel/EmployeeManager'><Button variant="outline-warning">Back</Button></Link>
                        </Col>
                </Row>
            </Container>
            
            
        </div>
    )
}

export default SalaryReport

