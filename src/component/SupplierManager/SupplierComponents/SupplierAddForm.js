import React,{useState} from 'react';
import { Form,Button,Col,Row} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "../Styles/SupplierAddForm.css";
import firebase from "../../../firebase";
var db = firebase.firestore();

export default function SupplierAddForm() {

    const [supplierCategory,setSupplierCategory] = useState('');
    const [company, setComapany] = useState('');
    const [certificate, setCertificate] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [email, setEmail] = useState('');

    //error states
    const [companyError,setCompanyError] = useState("");
    const [certificateError,setCertificateError] = useState("");
    const [contactNoError,setContactNoError] = useState("");
    const [emailError,setEmailError] = useState("");

    const [comapnyNameValid,setCompanyNameValid] = useState(false);

    function sendSupplierData(e){
        e.preventDefault();

        if(isSupplierDataValid() && isCompanyValid()){
           
            //send data to collection called SupplierData
            db.collection("Supplier").doc().set({
                supplierCategory:supplierCategory,
                company:company,
                certificate:certificate,
                contactNo:contactNo,
                email :email,
            
                
            }).then(()=>{
                alert("Supplier added");
            
            }).catch((e)=>{
                alert(e.message)
                
            })

            setComapany('');
            setCertificate('');
            setContactNo('');
            setEmail('');
            setSupplierCategory('');
            setCompanyError('');
            setCertificateError('');
            setContactNoError('');
            setEmailError('');
            setCompanyNameValid(false);
        }
    }

    //validate data
    function isSupplierDataValid(){
        if(company === ""){
            setCompanyError("Requried Field");
            return false;
        }
        else if(certificate === ""){
            setCompanyError("");
            setCertificateError("Required Field");
            return false;
        }
        else if(contactNo === ""){
            setCompanyError("");
            setCertificateError("");
            setContactNoError("Required Field");
            return false;
        }
        else if(email === ""){
            setCompanyError("");
            setCertificateError("");
            setContactNoError("");
            setEmailError("Requried Field");
            return false;
        }
        else 
            return true;

    }

    //check company name valid
    function isCompanyValid(){

        db.collection("Supplier").where("company","==",company).where("supplierCategory","==",supplierCategory).get().then(querySnapshot=>{
        
        // console.log(querySnapshot.empty);
        if(querySnapshot.empty)
            setCompanyNameValid(true);
       
        }).catch(err=>{
            console.log(err.message);
        })
      
        if(comapnyNameValid === true)
            return true;
        else{
            setCompanyError("Company name is already exists within this category");
            setCertificateError("");
            setContactNoError("");
            setEmailError("");
            return false;
        }    
   
    }



    return (

        <div className = "container">
        
            <Form className ="supplierAddForm" onSubmit = {e=>{sendSupplierData(e)}}>

                <Row className = "addSupplierHeaderBackground">
                    <h3 className = "addSupplierH3"> Add New Supplier</h3>
                </Row>
                
                <br/>

                <Form.Group className="mb-3" controlId="formGroupText">
                    <Form.Label className= "supplierAddFormLabel">Supplier Category</Form.Label>
                    <Form.Control as="select" value = {supplierCategory} onChange = {e=>{setSupplierCategory(e.target.value)}}>
                            <option value = ""> Select Category</option>
                            <option value = "Tile">Tile</option>
                            <option value = "Steel">Steel</option>
                            <option value = "Cement">Cement</option>
                        
                    </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGroupText">
                    <Form.Label  className= "supplierAddFormLabel">Company Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter company name" value = {company} onChange = {(e)=>{ setComapany(e.target.value) }} />
                </Form.Group>
                <div className = "supplierAddFormErroMsg">{companyError}</div>

                <Form.Group className="mb-3" controlId="formGroupText">
                    <Form.Label  className= "supplierAddFormLabel">Certification</Form.Label>
                    <Form.Control type="text" placeholder="Enter Certification" value = {certificate} onChange = {e=>{setCertificate(e.target.value)}}/>
                </Form.Group>
                <div className = "supplierAddFormErroMsg">{certificateError}</div>

                <Row className = "mb-3">
                    <Form.Group as = {Col} className="mb-3" controlId="formGroupPhone">
                        <Form.Label  className= "supplierAddFormLabel">Contact No</Form.Label>
                        <Form.Control type="phone" placeholder="Enter Contact No" value = {contactNo} onChange = {e=>{setContactNo(e.target.value)}} pattern = "[0-9]{10}"/>
                    </Form.Group>

                    <Form.Group as = {Col} className="mb-3" controlId="formGroupEmail">
                        <Form.Label  className= "supplierAddFormLabel">Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email address" value = {email} onChange = {e=>{setEmail(e.target.value)}} pattern = "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,3}$"/>
                    </Form.Group>
                </Row>

                <Row>
                    <Col>
                        <div className = "supplierAddFormErroMsg">{contactNoError}</div>
                    </Col>

                    <Col>
                        <div className = "supplierAddFormErroMsg">{emailError}</div>
                    </Col>
                </Row>
                <br/>
                <Row className = "mb-3">
                    <Form.Group as = {Col} className="mb-3" controlId="">
                        <Button variant="primary" type="submit" size= "md" className="supplierAddFormSubmitBtn" >
                            Add Supplier
                        </Button>
                    
                    </Form.Group>

                    <Form.Group as = {Col} className="mb-3" controlId="">
                        <Link to ="/adminPannel/supplierManager"><Button variant="secondary" size= "md">
                            Back
                        </Button></Link>
                    </Form.Group>
                </Row>
            </Form>
        </div>
    )
}
