import { BrowserRouter as Router, Route, Switch,Link } from "react-router-dom";
import React, { useState } from 'react'
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
//import Controls from "../../components/controls/Controls";
//import Popup from "../../components/Popup";
//import Employees from "./Employees";
import PageHeader from "./PageHeader";
import { Form, Button,Row,Col,Container } from "react-bootstrap";
import Avatar from '@material-ui/core/Avatar';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import { Grid, } from '@material-ui/core';
import image2 from './image/r.jpg';


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
        title="Report Dashboard"
        //subTitle="Form design with validation"
        icon={<SpeakerNotesIcon fontSize="large" />}
        />

        <div>
        <Grid container>
              <Grid item xs={6}>
                <Link to="/adminPannel/EmployeeManager/employeeSalary"><Button style={{
                          borderRadius: 15,
                          /*padding: "10px 20px",*/
                          backgroundColor: "#424242",
                          width: "330px",
                          margin : "130px 0px 30px 200px",
                          color : "#ffffff",
                          }}
                          variant="contained">
                    Employee salary report
                </Button></Link>

                <Link to="/adminPannel/EmployeeManager/BarChart"><Button style={{
                          borderRadius: 15,
                          /*padding: "10px 20px",*/
                          backgroundColor: "#424242",
                          width: "330px",
                          margin : "0px 0px 30px 200px",
                          color : "#ffffff",
                          }}
                          variant="contained" >
                     Contract based employee report
                </Button></Link>

              </Grid>
              <Grid item xs={6}>
                <Avatar style={{
                        borderRadius: 15,
                        /*padding: "10px 20px",
                        backgroundColor: "#ffcc00",*/
                        width: "55%",
                        height : "75%",
                        margin : "80px 0px 0px 100px",
                        }}
                        src={image2} />
              </Grid>
        </Grid>             
      </div>

      <br/><br/>
      <br/><br/>
  

        
    </>
    )
}

