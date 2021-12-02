import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { Link } from "react-router-dom";
import { Table, ButtonGroup,Button, Form } from "react-bootstrap";
import PageHeader from "./PageHeader";
import PersonIcon from '@material-ui/icons/Person';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button1 from '@material-ui/core/Button';
import { Grid, } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
//import { gray } from '@material-ui/core/colors';
import Paper from '@material-ui/core/Paper';
//import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

function DisplayEmployee(props) {

    const [employees, setEmployees] = useState([]);
    const [editEmployee, setEditEmployee] = useState(props);
    const [viewEmployee, setViewEmployee] = useState(props);
    const [searchTerm, setSearchTerm] = useState("");

    const db = firebase.firestore();

    useEffect(() => {
        db.collection("employees").onSnapshot((snapshot) => {
          const arr = snapshot.docs.map((doc) => ({
            ID: doc.id,
            data: doc.data(),
          }));
    
          setEmployees(arr);
        });
      }, [db]);
    
      function deleteEmployee(ID) {
        db.collection("employees")
          .doc(ID)
          .delete()
          .then(() => {
            alert(ID, "Employee successfully deleted...!");
          })
          .catch((err) => {
            console.error("Error removing Employee ", err);
          });
      }
    
      function editingEmployee(id) {
        alert("Edit employee", id);
        editEmployee.editEmployeeHandler(id);
      }
    
      function ViewEmployee(name) {
        //alert("view cli", id);
        viewEmployee.viewEmployeeHandler(name);
      }

      const classes = useStyles();

    return (
      <>
      <PageHeader
      title="Employee Details"
      //subTitle="Form design with validation"
      icon={<PersonIcon fontSize="large" />}
      />
        <div>

    <br />
    <Grid container>
      <Grid item xs={6}>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField id="filled-basic" label="Search by Employee Name" variant="standard" 
                  onChange={(event) => {
                    setSearchTerm(event.target.value);
                  }}
                  style={{
                    borderRadius: 15,
                    /*padding: "10px 20px",*/
                    /*backgroundColor: "#ffffff",*/
                    width: "350px",
                    height : "100px",
                    margin : "0px 0px 0px 20px",
                    color : "#ffffff",
                    }}
                   />
      
      

      </form>
      </Grid>

      <Grid item xs={6}>
      <Link to ='/adminPannel/EmployeeManager/AddEmployee'>
                                        <Button style={{
                                                borderRadius: 15,
                                                /*padding: "10px 20px",*/
                                                backgroundColor: "#ffcc00",
                                                width: "250px",
                                                height : "50px",
                                                margin : "0px 0px 0px 60px",
                                                color : "#ffffff",
                                                fontWeight : "bold",
                                                }}
                                                variant="warning"
                                                >
                                                Add Employee
                                        </Button>
                                        </Link>
        </Grid>
        </Grid>
      
      <Table bordered size="sm" >
        <thead>
          <tr>
            <th style={{ display: "none" }}>Document ID</th>
            <th style={{ textAlign: "center" }}>
              Employee Name
            </th>
            <th style={{ textAlign: "center" }}>Address</th>
            <th style={{ textAlign: "center" }}>
              Phone Number
            </th>
            <th style={{ textAlign: "center" }}>
              Designation
            </th>
            <th style={{ textAlign: "center" }}>
              Start Date
            </th>
            <th style={{ textAlign: "center" }}>
              Type
            </th>
            <th style={{ textAlign: "center", verticalAlign: "middle" }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {employees
            .filter((employee) => {
              if (searchTerm == "") {
                return employee;
              } else if (
                employee.data.employeeName
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              ) {
                return employee;
              }
            })
            .map((employee) => (
              <tr>
                <td style={{ display: "none" }}>{employee.ID}</td>
                <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                  {employee.data.employeeName}
                </td>
                <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                  {employee.data.address}
                </td>
                <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                  {employee.data.phoneNumber}
                </td>
                <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                  {employee.data.designation}
                </td>
                <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                  {employee.data.startdate}
                </td>


                <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                  {employee.data.empType}
                </td>
                <td style={{ textAlign: "center" }}>

                  
                    <Link to="/adminPannel/EmployeeManager/EmployeeProfile">
                      <Button
                        style={{ backgroundColor : "#ffffff" }}
                        //variant="info"
                        onClick={() => {
                          ViewEmployee(employee.data.employeeName);
                        }}
                      >
                        <VisibilityIcon fontSize="small" 
                        color="action"/>
                        
                      </Button>
                    </Link>

                    <Link to="/adminPannel/EmployeeManager/EditEmployee">
                      <Button
                        style={{ backgroundColor : "#ffffff"}}
                        //variant="warning"
                        onClick={() => {
                          editingEmployee(employee.ID);
                        }}
                      >
                        <EditIcon fontSize="small" 
                        color="action" />
                      </Button>
                    </Link>
                    <Button
                      style={{backgroundColor : "#ffffff",
                             }}
                      variant="danger"
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete this Employee's details?"
                          )
                        ) 
                        {
                        deleteEmployee(employee.ID);
                        }
                      }}
                    >
                      <DeleteIcon fontSize="small" 
                      color="action"/>
                    </Button>
                  
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 25, 100]}
        component="div"

      />
            
        </div>
        </>
    )
}

export default DisplayEmployee
