import React from "react";
import classes from "./SideBar.module.css";
import { Plus } from "react-feather";
import { Fragment, useState } from "react";
import AddProject from "./AddProject";
function SideBar(props) {
  const [showAddProject, setShowAddProject] = useState(false)
  const showAddProjectHandler = () => {
    setShowAddProject(true);
  };
  const hideAddProjectHandler = () => {
    setShowAddProject(false);
  };

  const selectProjectHandler = (data) => {
    props.onSelectProject(data)
  }
  return (
    <Fragment>
      {showAddProject && <AddProject onClose={hideAddProjectHandler} />}
    <div className={classes.sidebar}>
      <button type="button" className={classes.addtaskBtn} onClick={showAddProjectHandler}>
        <Plus />
        <div>Add Project</div>
      </button>
      {props.projects && <ul className={classes.projectList}>
        {props.projects.map((data) => {
          return <li className={classes.project} key={data._id}><button onClick={()=>{selectProjectHandler(data._id)}}>{data.name}</button></li>
        })}
      </ul>}
    </div>
    </Fragment>
  );
}
export default SideBar;
