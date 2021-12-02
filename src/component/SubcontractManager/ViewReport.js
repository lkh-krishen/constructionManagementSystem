import React, { useState, useEffect } from "react";
import firebase from "../../firebase";
import { Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function ViewReport(props) {
  
  const [type, setType] = useState([]);
  const [payments, setPayments] = useState([]);
  const db = firebase.firestore();
  const [comName, setComName] = useState(props.name);

  useEffect(() => {
    db.collection("subcontractors")
      .where("comName", "==", comName)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          //setClientName(doc.data().clientName);
           setType(doc.data().type);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  }, [db, comName]);

  useEffect(() => {
    async function fetchData() {
      const paymentsRef = db.collection("Subcontracts");
      const snapshot = await paymentsRef
        .where("comName", "==", comName)
        .get();
      if (snapshot.empty) {
        console.log("No matching documents.");
        return;
      }

      snapshot.forEach((doc) => {
        console.log(doc.id, "=>", doc.data());
        const arr = snapshot.docs.map((doc) => ({
          ID: doc.id,
          data: doc.data(),
        }));

        setPayments(arr);
      });
    }
    fetchData();
  }, [db, comName]);

  return (
    <div className="container" style={{backgroundColor : ' #f5f6fa'}}>
      <br />
      <div >
      <div className="container" style={{backgroundColor : 'white'}}>
      <br/>
      <center> <h4> {comName} </h4> </center>
     
      <br/>
      
      <Table striped bordered hover>
        <thead>
           <tr style={{backgroundColor: '#ffb84d'}}> 
             <th>Project</th>   
             <th>Advance Amount</th>
             <th>First Phase Paid Amount</th>
             <th>Second Phase Paid Amount</th>
             <th>Total Amount</th>
                   
           </tr>
        </thead>
        <tbody>
            {payments.map((payment) => (
              <tr>
                  <td>{payment.data.Title}</td> 
                  <td>{payment.data.advance_money}</td> 
                  <td>{payment.data.first_phase}</td> 
                  <td>{payment.data.second_phase}</td> 
                  <td>{payment.data.advance_money+payment.data.first_phase+payment.data.second_phase}</td> 
              </tr>
            ))}
        </tbody>
      </Table>
      <br/>
      </div>
     </div>
    </div>
  );
}

export default ViewReport;
