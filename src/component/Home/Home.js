import React, { useEffect,useState } from 'react';
import '../../assets/css/home/bootstrap.min.css';
import '../../assets/css/home/agency.min.css';
import Portfolio from './compoents/Portfolio';
import {  Link } from "react-router-dom";
import { Modal,Form,Row,Col,Container,Button,NavDropdown} from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import firebase from 'firebase';
import './home.css';

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



function Home() {
    const db = firebase.firestore();
    const [show, setShow] = useState(false);
    const [auth,setAuth] = useState(false);
    const [user,setUser] = useState({name:""});
    const [open1, setOpen1] = useState(false);
    const [upradater,setUpdater] =useState(true);
    const [password,setPassword] = useState("");
    const [username,setUserName] = useState("");
    const [invalidUserMsg,setinvalidUserMsg] =useState(false);


    const handleClose = () => setShow(false);
    const handleShow = () =>{setShow(true);
        setinvalidUserMsg(false);
        setPassword("");
        setUserName("");
    }

    const error1HandleClick = () => {
        setOpen1(true);
    };
    const error1HandleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen1(false);
    };

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
                } else {
                console.log('Document data:', doc.data());
                setUser({name:doc.data().userName});
                setAuth(true);
                }
            }
           
            
        }
        func();
        
    }, [upradater])

    function login(e){
        e.preventDefault();
        setinvalidUserMsg(false);
        setUpdater(false);
        db.collection("AdminAccounts")
        .where('password', '==',password).where('userName','==',username).get()
        .then((querySnapshot) => {
            console.log(querySnapshot.docs,"pass:", password,"usernamr :",username);
            querySnapshot.docs.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                localStorage.setItem("token", doc.id);
                handleClose();
                error1HandleClick();
                setUpdater(true)
            
            })
            if(querySnapshot.docs.length==0){
                setUpdater(false);
                setinvalidUserMsg(true);
                
                console.log("invalid user name or password")
            }
        
        
  
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
            
            
        
    }

    function logout(){
        localStorage.setItem("token", null);
        setUpdater(false);
    }
  
    return (
        
        <div classNameName="App">
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Admin Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <Row className="d-flex justify-content-center ">
                            <div className="w-100 align-middle mh-100 d-flex justify-content-center ">
                            <Form className="w-75 justify-content-center mb-5"  onSubmit={login} >
                            
                                <Row className="d-flex justify-content-center align-items-center w-100">
                                    <span className={(invalidUserMsg)? `home__invalidYouser_error_msg_visible` :`home__invalidYouser_error_msg_hidden` } >Invalid username or password!</span>
                                </Row>
                                <Row className="d-flex justify-content-center align-items-center mt-3 w-100">
                                    
                                
                                    <Form.Group className="mb-1 " controlId="formBasicEmail">
                                        <Form.Label>
                                            <h6 className="" >Username :</h6>
                                        </Form.Label>
                                        <input type="text" class="form-control" id="userName1" placeholder="Username"
                                        value={username} onChange={(e)=>{setUserName(e.target.value);}}/>
                                    </Form.Group>
                                    
                                </Row>
                                <Row className="d-flex justify-content-center align-items-center  mt-3 w-100">
                                    
            
                                    <Form.Group className="mb-1 " controlId="formBasicEmail">
                                        <Form.Label>
                                            <h6 className="" >Password :</h6>
                                        </Form.Label>
                                        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"
                                        value={password} onChange={(e)=>{setPassword(e.target.value);}}/>
                                    </Form.Group>
                                    
                                </Row>
                                
                                <Row className="justify-content-center mt-1 w-100">
                                    <Col xs lg="12" className=" d-flex justify-content-center">
                                        <Button type="submit" variant="warning" className="">
                                            Login
                                        </Button>
                                    </Col>
                                </Row> 
                                <Row className="d-flex justify-content-center mt-1 w-100">
        
                                    Forgot password? <Button className="d-inline " variant="link">Contact Admin</Button>
                                    
                                </Row>   
                            
                            </Form>
                            
                                 
                            </div>
                        </Row>
                </Modal.Body>
                
            </Modal>
            <Snackbar open={open1} autoHideDuration={2200} onClose={error1HandleClose}>
                <Alert onClose={error1HandleClose} severity="success">
                    Successfully LoggeIn
                </Alert>
            </Snackbar>
            <nav className="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
                <div className="container">
                <a className="navbar-brand" href="#page-top"><img src="assets/img/7a67f2976c750a4c9055d4bf1dc646aa.png" alt="..." /></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    Menu
                    <i className="fa fa-bars ms-1"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav text-uppercase ms-auto py-4 py-lg-0">
                    <li className="nav-item"><a className="nav-link" href="#services">Services</a></li>
                    <li className="nav-item"><a className="nav-link" href="#portfolio">Portfolio</a></li>
                    <li className="nav-item"><a className="nav-link" href="#about">About</a></li>
                    <li className="nav-item"><a className="nav-link" href="#team">Team</a></li>
                    <li className="nav-item"><a className="nav-link" href="#contact">Contact</a></li>
                    <li className={(auth)? `nav-item` :`home__hide_adminPannel` }><Link to='/adminPannel'  className="nav-link" >Admin Pannel</Link></li>
                    <li className={(auth)? `home__hide_adminPannel` :`nav-item` } onClick={handleShow}><Button variant="warning" className="rounded-circle shadow">Log In</Button></li>
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
            {/*<!-- Masthead-->*/}
            <header className="masthead">
                <div className="container">
                <div className="masthead-subheading">Welcome To Kuruduwaththa Construtions!</div>
                <div className="masthead-heading text-uppercase">It's Nice To Meet You</div>
                <a className="btn btn-warning btn-xl text-uppercase" href="#services">Tell Me More</a>
                </div>
            </header>
            {/*<!-- Services-->*/}
            <section className="page-section" id="services">
                <div className="container">
                <div className="text-center">
                    <h2 className="section-heading text-uppercase">Services</h2>
                    <h3 className="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
                </div>
                <div className="row text-center">
                    <div className="col-md-4">
                    <span className="fa-stack fa-4x">
                        <i className="fa fa-circle fa-stack-2x text-warning"></i>
                        <i className="fa fa-flag fa-stack-1x fa-inverse"></i>
                    </span>
                    <h4 className="my-3">Island Wide Constructions</h4>
                    <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p>
                    </div>
                    <div className="col-md-4">
                    <span className="fa-stack fa-4x">
                        <i className="fa fa-circle fa-stack-2x text-warning"></i>
                        <i className="fa fa-graduation-cap fa-stack-1x fa-inverse"></i>
                        
                    </span>
                    <h4 className="my-3">Service Of Qualified Engineers</h4>
                    <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p>
                    </div>
                    <div className="col-md-4">
                    <span className="fa-stack fa-4x">
                        <i className="fa fa-circle fa-stack-2x text-warning"></i>
                        <i className="fa fa-thumbs-up fa-stack-1x fa-inverse"></i>
                    </span>
                    <h4 className="my-3">Flexible Payment Schedules</h4>
                    <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p>
                    </div>
                </div>
                </div>
            </section>
            {/*<!-- Portfolio Grid-->*/}
            <Portfolio/>
            
            {/*<!-- About-->*/}
            <section className="page-section" id="about">
                <div className="container">
                <div className="text-center">
                    <h2 className="section-heading text-uppercase">About</h2>
                    <h3 className="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
                </div>
                <ul className="timeline">
                    <li>
                    <div className="timeline-image"><img className="rounded-circle img-fluid" src="assets/img/about/1.jpg" alt="..." /></div>
                    <div className="timeline-panel">
                        <div className="timeline-heading">
                        <h4>1995-2021</h4>
                        <h4 className="subheading">25 Years of Trustness</h4>
                        </div>
                        <div className="timeline-body"><p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt ut voluptatum eius sapiente, totam reiciendis temporibus qui quibusdam, recusandae sit vero unde, sed, incidunt et ea quo dolore laudantium consectetur!</p></div>
                    </div>
                    </li>
                    <li className="timeline-inverted">
                    <div className="timeline-image"><img className="rounded-circle img-fluid" src="assets/img/about/2.jpg" alt="..." /></div>
                    <div className="timeline-panel">
                        <div className="timeline-heading">
                        <h4>March 1995</h4>
                        <h4 className="subheading">An Agency is Born</h4>
                        </div>
                        <div className="timeline-body"><p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt ut voluptatum eius sapiente, totam reiciendis temporibus qui quibusdam, recusandae sit vero unde, sed, incidunt et ea quo dolore laudantium consectetur!</p></div>
                    </div>
                    </li>
                    <li>
                    <div className="timeline-image"><img className="rounded-circle img-fluid" src="assets/img/about/3.jpg" alt="..." /></div>
                    <div className="timeline-panel">
                        <div className="timeline-heading">
                        <h4>December 2005</h4>
                        <h4 className="subheading">First Government Project</h4>
                        </div>
                        <div className="timeline-body"><p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt ut voluptatum eius sapiente, totam reiciendis temporibus qui quibusdam, recusandae sit vero unde, sed, incidunt et ea quo dolore laudantium consectetur!</p></div>
                    </div>
                    </li>
                    <li className="timeline-inverted">
                    <div className="timeline-image"><img className="rounded-circle img-fluid" src="assets/img/about/4.jpg" alt="..." /></div>
                    <div className="timeline-panel">
                        <div className="timeline-heading">
                        <h4>July 2006</h4>
                        <h4 className="subheading">Started Island wide Constructions</h4>
                        </div>
                        <div className="timeline-body"><p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt ut voluptatum eius sapiente, totam reiciendis temporibus qui quibusdam, recusandae sit vero unde, sed, incidunt et ea quo dolore laudantium consectetur!</p></div>
                    </div>
                    </li>
                    <li className="timeline-inverted">
                    <div className="timeline-image">
                        <h4>
                        Be Part
                        <br />
                        Of Our
                        <br />
                        Story!
                        </h4>
                    </div>
                    </li>
                </ul>
                </div>
            </section>
            {/*<!-- Team-->*/}
            <section className="page-section bg-light" id="team">
                <div className="container">
                <div className="text-center">
                    <h2 className="section-heading text-uppercase">Our Amazing Team</h2>
                    <h3 className="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
                </div>
                <div className="row">
                    <div className="col-lg-4">
                    <div className="team-member">
                        <img className="mx-auto rounded-circle" src="assets/img/team/1.jpg" alt="..." />
                        <h4>Mr.K.S.Samarathunge</h4>
                        <p className="text-muted">Proude company owner</p>
                        <a className="btn btn-dark btn-social mx-2" href="#!"><i className="fa fa-twitter"></i></a>
                        <a className="btn btn-dark btn-social mx-2" href="#!"><i className="fa fa-facebook-f"></i></a>
                        <a className="btn btn-dark btn-social mx-2" href="#!"><i className="fa fa-linkedin-in"></i></a>
                    </div>
                    </div>
                    <div className="col-lg-4">
                    <div className="team-member">
                        <img className="mx-auto rounded-circle" src="assets/img/team/2.jpg" alt="..." />
                        <h4>Ms.N.P.Gunarathne</h4>
                        <p className="text-muted">Lead Marketer</p>
                        <a className="btn btn-dark btn-social mx-2" href="#!"><i className="fa fa-twitter"></i></a>
                        <a className="btn btn-dark btn-social mx-2" href="#!"><i className="fa fa-facebook-f"></i></a>
                        <a className="btn btn-dark btn-social mx-2" href="#!"><i className="fa fa-linkedin-in"></i></a>
                    </div>
                    </div>
                    <div className="col-lg-4">
                    <div className="team-member">
                        <img className="mx-auto rounded-circle" src="assets/img/team/3.jpg" alt="..." />
                        <h4>Mr.Sampath De Silva</h4>
                        <p className="text-muted">Lead Manager</p>
                        <a className="btn btn-dark btn-social mx-2" href="#!"><i className="fa fa-twitter"></i></a>
                        <a className="btn btn-dark btn-social mx-2" href="#!"><i className="fa fa-facebook-f"></i></a>
                        <a className="btn btn-dark btn-social mx-2" href="#!"><i className="fa fa-linkedin-in"></i></a>
                    </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-8 mx-auto text-center"><p className="large text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut eaque, laboriosam veritatis, quos non quis ad perspiciatis, totam corporis ea, alias ut unde.</p></div>
                </div>
                </div>
            </section>
            
            {/*<!-- Contact-->*/}
            <section className="page-section" id="contact">
                <div className="container">
                <div className="text-center">
                    <h2 className="section-heading text-uppercase">Contact Us</h2>
                    <h3 className="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
                </div>
                {/*<!-- * * * * * * * * * * * * * * *-->*/}
                {/*<!-- * * SB Forms Contact Form * *-->*/}
                {/*<!-- * * * * * * * * * * * * * * *-->*/}
                {/*<!-- This form is pre-integrated with SB Forms.-->*/}
                {/*<!-- To make this form functional, sign up at-->*/}
                {/*<!-- https://startbootstrap.com/solution/contact-forms-->*/}
                {/*<!-- to get an API token!-->*/}
                <form id="contactForm" data-sb-form-api-token="API_TOKEN">
                    <div className="row align-items-stretch mb-5">
                    <div className="col-md-6">
                        <div className="form-group">
                        {/*<!-- Name input-->*/}
                        <input className="form-control" id="name" type="text" placeholder="Your Name *" data-sb-validations="required" />
                        <div className="invalid-feedback" data-sb-feedback="name:required">A name is required.</div>
                        </div>
                        <div className="form-group">
                        {/*<!-- Email address input-->*/}
                        <input className="form-control" id="email" type="email" placeholder="Your Email *" data-sb-validations="required,email" />
                        <div className="invalid-feedback" data-sb-feedback="email:required">An email is required.</div>
                        <div className="invalid-feedback" data-sb-feedback="email:email">Email is not valid.</div>
                        </div>
                        <div className="form-group mb-md-0">
                        {/*<!-- Phone number input-->*/}
                        <input className="form-control" id="phone" type="tel" placeholder="Your Phone *" data-sb-validations="required" />
                        <div className="invalid-feedback" data-sb-feedback="phone:required">A phone number is required.</div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group form-group-textarea mb-md-0">
                        {/*<!-- Message input-->*/}
                        <textarea className="form-control" id="message" placeholder="Your Message *" data-sb-validations="required"></textarea>
                        <div className="invalid-feedback" data-sb-feedback="message:required">A message is required.</div>
                        </div>
                    </div>
                    </div>
                    {/*<!-- Submit success message-->*/}
                    {/*<!---->*/}
                    {/*<!-- This is what your users will see when the form-->*/}
                    {/*<!-- has successfully submitted-->*/}
                    <div className="d-none" id="submitSuccessMessage">
                    <div className="text-center text-white mb-3">
                        <div className="fw-bolder">Form submission successful!</div>
                        To activate this form, sign up at
                        <br />
                        <a href="https://startbootstrap.com/solution/contact-forms">https://startbootstrap.com/solution/contact-forms</a>
                    </div>
                    </div>
                    {/*<!-- Submit error message-->*/}
                    {/*<!---->*/}
                    {/*<!-- This is what your users will see when there is-->*/}
                    {/*<!-- an error submitting the form-->*/}
                    <div className="d-none" id="submitErrorMessage"><div className="text-center text-danger mb-3">Error sending message!</div></div>
                    {/*<!-- Submit Button-->*/}
                    <div className="text-center"><button className="btn btn-primary btn-xl text-uppercase disabled" id="submitButton" type="submit">Send Message</button></div>
                </form>
                </div>
            </section>
            {/*<!-- Footer-->*/}
            <footer className="footer py-4">
                <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-4 text-lg-start">Copyright &copy; Your Website 2021</div>
                    <div className="col-lg-4 my-3 my-lg-0">
                    <a className="btn btn-dark btn-social mx-2" href="#!"><i className="fa fa-twitter"></i></a>
                    <a className="btn btn-dark btn-social mx-2" href="#!"><i className="fa fa-facebook-f"></i></a>
                    <a className="btn btn-dark btn-social mx-2" href="#!"><i className="fa fa-linkedin-in"></i></a>
                    </div>
                    <div className="col-lg-4 text-lg-end">
                    <a className="link-dark text-decoration-none me-3" href="#!">Privacy Policy</a>
                    <a className="link-dark text-decoration-none" href="#!">Terms of Use</a>
                    </div>
                </div>
                </div>
            </footer>
            {/*<!-- Portfolio Modals-->*/}
            {/*<!-- Portfolio item 1 modal popup-->*/}
            <div className="portfolio-modal modal fade" id="portfolioModal1" tabindex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog">
                <div className="modal-content">
                    <div className="close-modal" data-bs-dismiss="modal"><img src="assets/img/close-icon.svg" alt="Close modal" /></div>
                    <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                        <div className="modal-body">
                            {/*<!-- Project details-->*/}
                            <h2 className="text-uppercase">Project Name</h2>
                            <p className="item-intro text-muted">Lorem ipsum dolor sit amet consectetur.</p>
                            <img className="img-fluid d-block mx-auto" src="assets/img/portfolio/1.jpg" alt="..." />
                            <p>Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae cupiditate, maiores repudiandae, nostrum, reiciendis facere nemo!</p>
                            <ul className="list-inline">
                            <li>
                                <strong>Client:</strong>
                                Threads
                            </li>
                            <li>
                                <strong>Category:</strong>
                                Illustration
                            </li>
                            </ul>
                            <button className="btn btn-primary btn-xl text-uppercase" data-bs-dismiss="modal" type="button">
                            <i className="fa fa-times me-1"></i>
                            Close Project
                            </button>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            {/*<!-- Portfolio item 2 modal popup-->*/}
            <div className="portfolio-modal modal fade" id="portfolioModal2" tabindex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog">
                <div className="modal-content">
                    <div className="close-modal" data-bs-dismiss="modal"><img src="assets/img/close-icon.svg" alt="Close modal" /></div>
                    <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                        <div className="modal-body">
                            {/*<!-- Project details-->*/}
                            <h2 className="text-uppercase">Project Name</h2>
                            <p className="item-intro text-muted">Lorem ipsum dolor sit amet consectetur.</p>
                            <img className="img-fluid d-block mx-auto" src="assets/img/portfolio/2.jpg" alt="..." />
                            <p>Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae cupiditate, maiores repudiandae, nostrum, reiciendis facere nemo!</p>
                            <ul className="list-inline">
                            <li>
                                <strong>Client:</strong>
                                Explore
                            </li>
                            <li>
                                <strong>Category:</strong>
                                Graphic Design
                            </li>
                            </ul>
                            <button className="btn btn-primary btn-xl text-uppercase" data-bs-dismiss="modal" type="button">
                            <i className="fa fa-times me-1"></i>
                            Close Project
                            </button>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            {/*<!-- Portfolio item 3 modal popup-->*/}
            <div className="portfolio-modal modal fade" id="portfolioModal3" tabindex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog">
                <div className="modal-content">
                    <div className="close-modal" data-bs-dismiss="modal"><img src="assets/img/close-icon.svg" alt="Close modal" /></div>
                    <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                        <div className="modal-body">
                            {/*<!-- Project details-->*/}
                            <h2 className="text-uppercase">Project Name</h2>
                            <p className="item-intro text-muted">Lorem ipsum dolor sit amet consectetur.</p>
                            <img className="img-fluid d-block mx-auto" src="assets/img/portfolio/3.jpg" alt="..." />
                            <p>Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae cupiditate, maiores repudiandae, nostrum, reiciendis facere nemo!</p>
                            <ul className="list-inline">
                            <li>
                                <strong>Client:</strong>
                                Finish
                            </li>
                            <li>
                                <strong>Category:</strong>
                                Identity
                            </li>
                            </ul>
                            <button className="btn btn-primary btn-xl text-uppercase" data-bs-dismiss="modal" type="button">
                            <i className="fa fa-times me-1"></i>
                            Close Project
                            </button>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            {/*<!-- Portfolio item 4 modal popup-->*/}
            <div className="portfolio-modal modal fade" id="portfolioModal4" tabindex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog">
                <div className="modal-content">
                    <div className="close-modal" data-bs-dismiss="modal"><img src="assets/img/close-icon.svg" alt="Close modal" /></div>
                    <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                        <div className="modal-body">
                            {/*<!-- Project details-->*/}
                            <h2 className="text-uppercase">Project Name</h2>
                            <p className="item-intro text-muted">Lorem ipsum dolor sit amet consectetur.</p>
                            <img className="img-fluid d-block mx-auto" src="assets/img/portfolio/4.jpg" alt="..." />
                            <p>Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae cupiditate, maiores repudiandae, nostrum, reiciendis facere nemo!</p>
                            <ul className="list-inline">
                            <li>
                                <strong>Client:</strong>
                                Lines
                            </li>
                            <li>
                                <strong>Category:</strong>
                                Branding
                            </li>
                            </ul>
                            <button className="btn btn-primary btn-xl text-uppercase" data-bs-dismiss="modal" type="button">
                            <i className="fa fa-times me-1"></i>
                            Close Project
                            </button>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            {/*<!-- Portfolio item 5 modal popup-->*/}
            <div className="portfolio-modal modal fade" id="portfolioModal5" tabindex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog">
                <div className="modal-content">
                    <div className="close-modal" data-bs-dismiss="modal"><img src="assets/img/close-icon.svg" alt="Close modal" /></div>
                    <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                        <div className="modal-body">
                            {/*<!-- Project details-->*/}
                            <h2 className="text-uppercase">Project Name</h2>
                            <p className="item-intro text-muted">Lorem ipsum dolor sit amet consectetur.</p>
                            <img className="img-fluid d-block mx-auto" src="assets/img/portfolio/5.jpg" alt="..." />
                            <p>Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae cupiditate, maiores repudiandae, nostrum, reiciendis facere nemo!</p>
                            <ul className="list-inline">
                            <li>
                                <strong>Client:</strong>
                                Southwest
                            </li>
                            <li>
                                <strong>Category:</strong>
                                Website Design
                            </li>
                            </ul>
                            <button className="btn btn-primary btn-xl text-uppercase" data-bs-dismiss="modal" type="button">
                            <i className="fa fa-times me-1"></i>
                            Close Project
                            </button>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Home
