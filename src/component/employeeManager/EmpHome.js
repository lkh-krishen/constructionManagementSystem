
import React, { useState } from 'react'
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
//import Controls from "../../controls/Controls";
//import Popup from "../../Popup";
import PageHeader from "./PageHeader";
import PersonIcon from '@material-ui/icons/Person';
import Avatar from '@material-ui/core/Avatar';
import { Grid, } from '@material-ui/core';
import {  Link } from "react-router-dom";
import image1 from './image/emp.jpg';
import { Form, Button,Row,Col,Container } from "react-bootstrap";




const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

  

export default function EmpHome() {
    return (
    <>
    
        <PageHeader
        title="Employee Dashboard"
        //subTitle="Form design with validation"
        icon={<PersonIcon fontSize="large" />}
        />

        <div>
        <Grid container>
                <Grid item xs={6}>
                <Link to ='/adminPannel/EmployeeManager/DisplayEmployee'>
                                        <Button style={{
                                                borderRadius: 15,
                                                /*padding: "10px 20px",*/
                                                backgroundColor: "#424242",
                                                width: "200px",
                                                margin : "95px 0px 30px 150px",
                                                color : "#ffffff",
                                                }}
                                                variant="contained"
                                                >
                                                Employees
                                        </Button>
                                        </Link>
                                        <br/>
                                        
                                        <Link to='/adminPannel/EmployeeManager/ReportHome'>
                                        <Button style={{
                                                borderRadius: 15,
                                                /*padding: "10px 20px",*/
                                                backgroundColor: "#424242",
                                                width: "200px",
                                                margin : "0px 0px 30px 150px",
                                                color : "#ffffff",
                                                }}
                                                variant="contained" >
                                                View Reports
                                        </Button>
                                        </Link>
                                        
                                        <Link to='/adminPannel/EmployeeManager/EmployeeProject'>
                                        <Button style={{
                                                borderRadius: 15,
                                                /*padding: "10px 20px",*/
                                                backgroundColor: "#424242",
                                                width: "200px",
                                                margin : "0px 0px 30px 150px",
                                                color : "#ffffff",
                                                }}
                                                variant="contained">Assign to a project
                                        </Button>
                                        </Link>
                </Grid>
                <Grid item xs={6}>
                        <Avatar style={{
                                        borderRadius: 15,
                                        /*padding: "10px 20px",
                                        backgroundColor: "#ffcc00",*/
                                        width: "55%",
                                        height : "75%",
                                        margin : "40px 0px 0px 100px",
                                        }}
                                        src={image1} />
                </Grid>
        </Grid>
                <br/><br/>
        </div>
  

        
    </>
    )
}

