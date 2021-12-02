import React,{useEffect,useState} from 'react';
import '../../assets/css/home/bootstrap.min.css';
import '../../assets/css/home/agency.min.css';
import {  Link,useHistory } from "react-router-dom";
import { NavDropdown} from 'react-bootstrap';
import './Header.css'
import firebase from 'firebase';


import './Header.css'
//attendanceHeader
function AttendanceHeader() {
    const db = firebase.firestore();
    const [auth,setAuth] = useState(false);
    const [user,setUser] = useState({name:""});
    let history = useHistory();

    useEffect(() => {
        
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

    }, [])


    function logout(){
        localStorage.setItem("token", null);
        history.push('/');
    }
    

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
                            title="SubContractor Manager"
                            menuVariant="dark"
                            >

                            <Link to='/adminPannel/SubcontractManager/SubconMain'  className="nav-link" >
                                <NavDropdown.Item href="#action/3.1" >
                                    SubContractor Pannel
                                </NavDropdown.Item>
                            </Link>    
                            <Link to='/adminPannel/SubcontractManager/addSubcon' className="nav-link" >
                                <NavDropdown.Item href="#action/3.1">
                                    Add New Subcontractor
                                </NavDropdown.Item>
                             </Link>
                             <Link to='/adminPannel/SubcontractManager/displaySubcontractors' className="nav-link" >
                                
                                <NavDropdown.Item href="#action/3.1">
                                    Subcontractor's Details
                                </NavDropdown.Item>
                             </Link>
                             <Link to='/adminPannel/SubcontractManager/SubconMain' className="nav-link" >
                                <NavDropdown.Item href="#action/3.1">
                                    Subcontractor's Payments Report
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