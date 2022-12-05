import React,{ Fragment, useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./Task.module.css";
import TaskDetails from "./TaskDetails";
import ClickableDiv from "react-clickable-div";
import { ArrowUp, ArrowDown } from "react-feather";

function Task(props) {
  // const [remainingdays, setremainingdays] = useState(0);
  // const [remaininghours, setremaininghours] = useState(0);
  // const [remainingmins, setremainingmins] = useState(0);
  const [reaminTime, setreaminTime] = useState();
  useEffect(()=>{
    const claculateRemainingTime = () => {
      let remainingdays = 0
      let remaininghours = 0
      let remainingmins = 0
      let diff = (Date.parse(new Date(props.task.dueDate)) - Date.parse(new Date())) / 1000;
      if (diff >= 86400) { // 24 * 60 * 60
        remainingdays = Math.floor(diff / 86400)
        diff -= remainingdays * 86400;
      }
      if (diff >= 3600) { // 60 * 60
        remaininghours = Math.floor(diff / 3600)
        diff -= remaininghours * 3600;
      }
      if (diff >= 60) {
        remainingmins = Math.floor(diff / 60)
        diff -= remainingmins * 60;
      }
      if (diff <= -86400) { // 24 * 60 * 60
        remainingdays = Math.floor(diff / 86400)
        diff += remainingdays * 86400;
      }
      if (diff <= -3600) { // 60 * 60
        remaininghours = Math.floor(diff / 3600) 
        diff += remaininghours * 3600;
      }
      if (diff <= -60) {
        remainingmins = Math.floor(diff / 60) 
        diff += remainingmins * 60;
      }
      if(remainingdays !== 0) {
        if(remainingdays === 1) {
          setreaminTime(remainingdays + ` day remaining`)
        } else if (remainingdays === -1) {
          setreaminTime(remainingdays*(-1) + ` day due`)
        } else if (remainingdays < 0) {
          setreaminTime(remainingdays*(-1) + ` days due`)
        } else {
          setreaminTime(remainingdays + ` days remaining`)
        }
      } else if(remaininghours !== 0) {
        if(remaininghours === 1) {
          setreaminTime(remaininghours + ` hour remaining`)
        } else if (remaininghours === -1) {
          setreaminTime(remaininghours*(-1) + ` hour due`)
        } else if (remaininghours < 0) {
          setreaminTime(remaininghours*(-1) + ` hours due`)
        } else {
          setreaminTime(remaininghours + ` hours remaining`)
        }
      } else {
        if(remainingmins === 1) {
          setreaminTime(remainingmins + ` min remaining`)
        } else if (remainingmins === -1) {
          setreaminTime(remainingmins*(-1) + ` min due`)
        } else if (remainingmins < 0) {
          setreaminTime(remainingmins*(-1) + ` mins due`)
        } else {
          setreaminTime(remainingmins + ` mins remaining`)
        }
      }
    }
    claculateRemainingTime()
  },[])
  const [taskDetailsShown, setTaskDEtailsShown] = useState(false);
  const showTaskDetails = () => {
    setTaskDEtailsShown(true);
  };
  const hideTaskDetails = () => {
    setTaskDEtailsShown(false);
  };
  const Priority = [
    {
      id: 1,
      icon: <ArrowUp color="red" />,
      tag: "Highest",
    },
    {
      id: 2,
      icon: <ArrowUp color="green" />,
      tag: "Medium",
    },
    {
      id: 3,
      icon: <ArrowDown color="green" />,
      tag: "Low",
    },
    {
      id: 4,
      icon: <ArrowDown color="red" />,
      tag: "Lowest",
    },
  ];
  return (
    <Fragment>
      {taskDetailsShown && <TaskDetails onCloseTaskDetails={hideTaskDetails} task={props.task} status={props.status}/>}
      <Card>
        <ClickableDiv onClick={showTaskDetails} className="d-flex flex-column gap-4">
          <div className={classes.Taskname}>
            {props.task.name}
          </div>
          <div className="d-flex justify-content-between">
            <div className={classes.Taspriority}>{Priority[props.task.priority-1].icon}</div>
            <div className={classes.reaminTime}>{reaminTime}</div>
          </div>
        </ClickableDiv>
      </Card>
    </Fragment>
  );
}
export default Task;
