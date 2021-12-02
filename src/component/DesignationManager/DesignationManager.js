import 'bootstrap/dist/css/bootstrap.min.css';
import AddDesignation from './AddDesignation';
import RetrieveDesignations from './RetrieveDesignations';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import EditDesignation from './EditDesignations';
import React, { useState, useEffect } from 'react';

function DesignationManager() {
    
    const [editingDesignation, setEditingDesignation] = useState("");



    function EditDesignationHandler(ID){
    console.log("DesignationID in app.js>>>>>>>>>",ID);
    setEditingDesignation(ID);

    }
    
    return (
        <div>
            <Router>
            <Switch>
              <Route path='/AdminPannel/DesignationManager' exact component={RetrieveDesignations}>
                <RetrieveDesignations EditDesignationHandler={EditDesignationHandler}/>
              </Route>
              <Route path='/AdminPannel/DesignationManager/editDesignation'>
                <EditDesignation id={editingDesignation}></EditDesignation>
              </Route>
              <Route path='/AdminPannel/DesignationManager/addDesignation'>
                <AddDesignation></AddDesignation>
              </Route>
            </Switch>
            </Router>
        </div>
    )
}

export default DesignationManager
