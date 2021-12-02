import React,{useState,useEffect} from 'react';
import {Button,Card,Form, Row,Col,Image} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import "../Styles/SupplierCategorySearch.css";
import firebase from "../../../firebase";
import supplierIcon from "../Images/supplierIcon.png";

var db = firebase.firestore();

export default function SupplierCategorySearch(props) {

    const [supplierCategories, setSupplierCategories] = useState([]);
    const[selectSupCategory, setSelectSupCategory] = useState('');
    const[suppliersData,setSuppliersData]= useState([]);
    const[editingSupplier,setEditingSupplier] = useState(props);

    //fetch supplier catgories
    function fetchSupplierData(){

        //fetch supplier categories
        db.collection("Supplier").onSnapshot((snapshot)=>{
           
            const arry = [];
            const supCategorySet = new Set();

            //fetch supplier object to an array
            snapshot.docs.forEach((doc)=>{
               arry.push(doc.data());
           }); 
        
           //create an set and to get only unique categories from array
           arry.map((supplier)=>(
                supCategorySet.add(supplier.supplierCategory)
           ));
          //console.log(supCategorySet);

          //creatin an arry an push unique categories into it
           const supCategoriesArry = [];

            supCategorySet.forEach(e=>{
                supCategoriesArry.push(e);
            })
            //console.log(supCategoriesArry);

            setSupplierCategories(supCategoriesArry);
    
       });

    }


     //fetch supplier details based on category
     function fetchSupplierDataBasedCategory(e){
        e.preventDefault();

        //get data based on category select
        db.collection("Supplier").where("supplierCategory","==",selectSupCategory).get().then(querySnapshot=>{
            
            const suppliers = [];
            // console.log(querySnapshot.docs);
      
            querySnapshot.docs.forEach(doc=>{
                // console.log(doc.data());
                const sup = {
                    supplierID: doc.id,
                    company:doc.data().company,
                    certificate:doc.data().certificate,
                    contactNo: doc.data().contactNo,
                    email: doc.data().email
                    

                }
                // console.log(sup);
                // console.log(doc.id);
                suppliers.push(sup);


            })
            // console.log(suppliers);
            setSuppliersData(suppliers);
        })
        .catch(err=>{
            console.log(err.message);
        })
        
    }

    useEffect(()=>{

        fetchSupplierData();

    },[]);

     //edit supplier
     function editSupplier(supID){

        editingSupplier.editSupplierHandler(supID); //same as props.editSupplierHandler
        setEditingSupplier(props);
    }


    return (
        <div>

            <div className= "container">
                        
                <Form onSubmit = {e=>fetchSupplierDataBasedCategory(e)}>
                    <Row className= "mb-3" controlId = "">

                        <Form.Group as = {Col} className="mb-3" controlId="" >
                                    
                                    <Form.Control as="select" value = {selectSupCategory} onChange = {e=>setSelectSupCategory(e.target.value)}>

                                            <option value = "" >Select Supplier Category</option>
                                                {supplierCategories.map(category=>(

                                                    <option value = {category}> {category}</option>
                                                    
                                                ))}
                                                    
                                                
                                    </Form.Control> 
                                
                        </Form.Group>

                        <Form.Group as = {Col} className="mb-3" controlId="">  
                                    <Button variant="outline-warning" type = "submit" className = "supplierSearchBtn">Search</Button>
                        </Form.Group>
                        
                    </Row>
                </Form>                            
                        
            </div> 

            <br/>

               {/* Display Result */}

            <div className = "container">
                
                                                
                <Row > {/*display col 3(4 by each) in one row */}
                
                    {suppliersData.map(supplier=>(

                    <Col  md = "4"> 
                        <Card className= "supplierCards">
                            <Card.Header className = "supplierCardHead">
                                
                                {/* <h5><b>SupplierID :</b></h5> 
                                <h6><i>{supplier.supplierID}</i> </h6> */}
                                <Row>
                                    <Col> <Image src = {supplierIcon} className = "supplierIcon"/></Col>
                                    <Col><h5 className = "supplierCardHeaderH6">{supplier.company}</h5></Col>
                                </Row>
                                <br/>
                              
                            </Card.Header>
                            
                            <Card.Body>
                                {/* <Card.Title>Supplier ID: <h6>{supplier.supplierID}</h6></Card.Title> */}

                                <Card.Text>
                                     {/* <b>Company:</b>  {supplier.company} <br/> */}
                                     <b>Contact No: </b> {supplier.contactNo} <br/>
                                     <b>Email: </b>{supplier.email} <br/>
                                     <b>Certification: </b>{supplier.certificate} <br/>
                                    
                                </Card.Text>

                                <Link to = "/adminPannel/supplierManager/editSupplier">
                                    <Button variant="outline-warning" size = "sm" onClick ={()=>{editSupplier(supplier.supplierID)}} >Edit</Button>
                                </Link>
                                 <br/><br/>

                                <Link to = "/adminPannel/supplierManager/addSupplierOrder">
                                    <Button variant="secondary" className = "supplierAddOrderBtn" size = "sm" onClick = {()=>{editSupplier(supplier.supplierID)}}>Add Order</Button>
                                </Link>

                            </Card.Body>
                            
                        </Card>
                    </Col> 
                     
                      ))}
                      
                </Row>
                   
              
            </div> 
            <br/>  
        
            
        </div>
    )
}
