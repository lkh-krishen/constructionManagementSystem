import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { DropdownButton,Dropdown,Button,Col,Row} from "react-bootstrap";

import {  Link } from "react-router-dom";

export default function Navigation(){

  //

    return(
      <div>
      
             
             <Row>  
                <Col md={{ span: 2, offset: 1 }}>
                            <DropdownButton
                                id="dropdown-button-dark-example2"
                                variant="secondary"
                                menuVariant="dark"
                                title="Projects"
                                className="mt-2"
                            >
                           
                           <Dropdown.Item variant="dark">
                               
                           <Link to="/adminPannel/ProjectManagement">
                                 <Button variant="outline-warning"> Ongoing  </Button>
                            </Link>
                           </Dropdown.Item>
                            <Dropdown.Divider />
                          <Dropdown.Item  variant="dark">
                              
                          <Link to="/adminPannel/ProjectManagement/Comp">
                              <Button variant="outline-warning"> Completed </Button>
                           </Link>
                          </Dropdown.Item>
                            <Dropdown.Divider />
                          </DropdownButton>
                         
                </Col>
             </Row>  

        </div>
  
   
 
    );
}