import React,{useState} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import AddProject from '../ProjectManagement/Add_Pro';
import RetProject from '../ProjectManagement/Ret_Project';
import UpProject from '../ProjectManagement/Update_Pro';
import Ongoing from '../ProjectManagement/Ongoing';
import CompProject from '../ProjectManagement/Comp';
import Search from '../ProjectManagement/SearchProject';
import Header from './Nav';

//

function ProjectUI() {
      const [currentPro, setCurrent] = useState("");
      const [upPro, setUp] = useState("");
      const [title, setTitle] = useState("");

      function CurrentProject(cid) {
            console.log("Current Project id", cid);
            setCurrent(cid);
          }

       function CurrentTitle(title) {
            console.log("Current Project title", title);
            setTitle(title);
          }

      function UpdateProject(id) {
            console.log("Update Project id", id);
            setUp(id);
      }
      
    return (
        
        <div>
            
        <Router>
           
           
             <Header/>
            
            
            <Switch>

            <Route path="/adminPannel/ProjectManagement/Search">
                  <Search title={title} SearchPro={CurrentTitle} CurProject={CurrentProject} />
            </Route>
            <Route path="/adminPannel/ProjectManagement/Comp" >
                  <CompProject/>
            </Route>

            <Route path="/adminPannel/ProjectManagement/Add" >
                  <AddProject/>
            </Route>
            
            <Route path="/adminPannel/ProjectManagement/RetProject" >
                  <RetProject currentid={currentPro} updateid={UpdateProject}  />
            </Route>
            <Route path="/adminPannel/ProjectManagement/UpdatePro">
                  <UpProject updateId={upPro} />
            </Route>

            <Route path="/adminPannel/ProjectManagement">
                  <Ongoing CurProject={CurrentProject} SearchPro={CurrentTitle}/>
            </Route>


            


            </Switch>
            
     
        </Router>
   
        </div>
        
        
    )
}

export default ProjectUI;
