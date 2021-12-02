import React,{useState,useEffect} from 'react';
import "../Styles/SupplierEditForm.css";
import { Form,Button,Col,Row} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import firebase from "../../../firebase";
var db = firebase.firestore();

export default function SupplierEditForm(props) {

    const[supID, setSupID] = useState(props.supplierID);

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
    const [contactNoValidError,setContactNoValidError]= useState('');
    const [emailValidError,setEmailValidError] = useState('');

    const [comapnyNameValid,setCompanyNameValid] = useState(false);

    //fetch supplier details based on ID
    useEffect(() => {

        fetchSupplier();
  
      },[]);
  
      function fetchSupplier(){
  
          db.collection("Supplier").doc(supID).get()
          .then(doc=>{
              
              const supplier = doc.data();
              console.log(supplier);
          
              setSupplierCategory(supplier.supplierCategory);
              setComapany(supplier.company);
              setContactNo(supplier.contactNo);
              setEmail(supplier.email);
              setCertificate(supplier.certificate);
  
          })
          .catch(err=>{
              alert(err.message);
          })
    };

    //update supplier details
    function updateSupplierData(e){
        e.preventDefault();

        if(isSupplierEditDataValid() && isContactNoValid() && isEmailValid() && isCompanyValid()){

            //update
            db.collection("Supplier").doc(supID).update({
                supplierCategory:supplierCategory,
                company:company,
                certificate:certificate,
                contactNo:contactNo,
                email :email,

            }).then(()=>{

                alert("Update successfully");   

            }).catch((err)=>{

                alert(err.message);
            })

            //reset
            setCompanyError('');
            setCertificateError('');
            setContactNoError('');
            setEmailError('');
            setContactNoValidError('');
            setEmailValidError('');
            setSupID(props.supplierID);
            setCompanyNameValid(false);

        }
        
    };

    //delete supplier details
    function deleteSupplier(e){

        e.preventDefault();
        db.collection("Supplier").doc(supID).delete().then(()=>{
            alert("Supplier deleted successfully");
        }).catch((err)=>{
            alert(err.message);
        })

    }

    //validate supplier update data
    function isSupplierEditDataValid(){
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

    //validate phone number
    function isContactNoValid(){

        if(contactNo.match('[0-9]{10}') == null){

            setCompanyError("");
            setCertificateError("");
            setContactNoError("");
            setEmailError("");
            setEmailValidError("");
            setContactNoValidError("Invalid contactNo");
            return false;
        }
        else if(contactNo.length > 10){

            setCompanyError("");
            setCertificateError("");
            setContactNoError("");
            setEmailError("");
            setEmailValidError("");
            setContactNoValidError("Invalid contactNo");
            return false;
        }
        else
            return true;
    }

    //validate email
    function isEmailValid(){

        if(email.match('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+[.]+[a-z]{2,3}$') == null){

            setCompanyError("");
            setCertificateError("");
            setContactNoError("");
            setEmailError("");
            setContactNoValidError("");
            setEmailValidError('Invalid Email');
            return false;
        }
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
            setContactNoValidError("");
            setEmailValidError("");
            return false;
        }    
    }

    return (

        <div className = "container">
        
            <Form className ="supplierEditForm">

                <Row className = "supplierEditFormHeaderBackground">
                    <h3 className = "supplierEditFormHeader3"> Edit Supplier Details</h3>
                </Row>
                <br/>
                <h5>Supplier ID: {supID} </h5>
                <br/><br/>

                <Form.Group className="mb-3" controlId="formGroupText">
                    <Form.Label className= "supplierEditFormLabel">Supplier Category</Form.Label>
                    <Form.Control as="select"  value = {supplierCategory} onChange={e=>{setSupplierCategory(e.target.value)}}>
                            <option value = ""> Select Category</option>
                            <option value = "Tile">Tile</option>
                            <option value = "Steel">Steel</option>
                            <option value = "Cement">Cement</option>
                        
                    </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGroupText">
                    <Form.Label  className= "supplierEditFormLabel">Company Name</Form.Label>
                    <Form.Control type="text"  value = {company} onChange={e=>{setComapany(e.target.value)}}/>
                </Form.Group>
                <div className = "supplierEditFormErroMsg">{companyError}</div>

                <Form.Group className="mb-3" controlId="formGroupText">
                    <Form.Label  className= "supplierEditFormLabel">Certification</Form.Label>
                    <Form.Control type="text" value = {certificate} onChange={e=>{setCertificate(e.target.value)}}/>
                </Form.Group>
                <div className = "supplierEditFormErroMsg">{certificateError}</div>

                <Row className = "mb-3">
                    <Form.Group as = {Col} className="mb-3" controlId="formGroupPhone">
                        <Form.Label  className= "supplierEditFormLabel">Contact No</Form.Label>
                        <Form.Control type="phone" value = {contactNo} onChange={e=>{setContactNo(e.target.value)}}  />
                    </Form.Group>

                    <Form.Group as = {Col} className="mb-3" controlId="formGroupEmail">
                        <Form.Label  className= "supplierEditFormLabel">Email</Form.Label>
                        <Form.Control type="email" value = {email} onChange={e=>setEmail(e.target.value)} />
                    </Form.Group>
                </Row>

                <Row>
                    <Col>
                        <div className = "supplierEditFormErroMsg">{contactNoError}</div>
                        <div className = "supplierEditFormErroMsg">{contactNoValidError}</div>

                    </Col>
                    
                    <Col>
                        <div className = "supplierEditFormErroMsg">{emailError}</div>
                        <div className = "supplierEditFormErroMsg">{emailValidError}</div>
                    </Col>
                </Row>

                <br/>
                
                <Row className = "mb-3">
                    <Form.Group as = {Col} className="mb-3" controlId="">
                        <Button variant="primary" type="submit" size= "md" className="supplierEditFormSubmitBtn" onClick ={e=>{updateSupplierData(e)}}>
                            Edit 
                        </Button>
                        
                        <Button variant="danger" type="submit" size= "md" className="supplierEditFormSubmitBtn" onClick = {e=>{deleteSupplier(e)}}>
                            Delete 
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
