import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SubconMain from './SubconMain';
import AddSubcontractor from './AddSubcon';
import DisplaySubcontractor from "./DisplaySubcon";
import EditSubcon from "./EditSubcon";
import Report from "./Report";
import ViewReport from "./ViewReport";
import React,{ useState } from 'react';



function SubcontractManager() {

    const [editingSubconID, setEditingSubconID] = useState("");
    const [viewingReport , setViewingReport] = useState("");
  
  
    function editSubconHandler(SubID){
      console.log("SubID in app.js>>>>>>>>>",SubID);
      setEditingSubconID(SubID);
    }
    
    function viewReportHandler(SubName){
        setViewingReport(SubName);
    }


    return (
        <div>
            <Router>
               <Switch>
                   <Route path='/adminPannel/SubcontractManager/SubconMain' component={SubconMain}>
                       <SubconMain/>
                   </Route> 

                   <Route path='/adminPannel/SubcontractManager/addSubcon' >
                       <AddSubcontractor/>
                   </Route>

                   <Route path='/adminPannel/SubcontractManager/displaySubcontractors'  component={DisplaySubcontractor}>
                       <DisplaySubcontractor 
                           editSubconHandler={editSubconHandler} 
                          />
                   </Route>

                   <Route path='/adminPannel/SubcontractManager/editSubcon' >
                       <EditSubcon id={editingSubconID}/>
                   </Route>

                   <Route path='/adminPannel/SubcontractManager/report'  component={Report}>
                       <Report 
                            viewReportHandler={viewReportHandler}
                       />
                   </Route>

                   <Route path='/adminPannel/SubcontractManager/ViewReport' >
                       <ViewReport name={viewingReport}/>
                   </Route>
                   
               </Switch>
            </Router>
        </div>
    );
}

export default SubcontractManager
