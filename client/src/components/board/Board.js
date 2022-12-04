import React from "react";
import classes from "./Board.module.css";
import { Plus } from "react-feather";
import Task from "../tasks/Task";
import { Fragment, useState } from "react";
import AddTask from "../tasks/AddTask";

function Board(props) {
  const [showAddTask, setShowAddTask] = useState(false);
  const showAddTaskHandler = () => {
    setShowAddTask(true);
  };
  const hideAddTaskHandler = () => {
    setShowAddTask(false);
  };
  return (
    <Fragment>
      {showAddTask && (
        <AddTask
          onClose={hideAddTaskHandler}
          status={props.status}
          projectid={props.projectid}
        />
      )}
      <div className={classes.board}>
        <div className={classes.boardTop}>
          <p>{props.boardName}</p>
        </div>
        <div className={classes.addtask}>
          <div
            type="button"
            className={classes.addtaskBtn}
            onClick={showAddTaskHandler}
          >
            <Plus />
            <div>Add Task</div>
          </div>
        </div>
        <div className="d-flex flex-column gap-4 p-2">
          {props.tasks.map((task) => {
            return <Task key={task._id} status={props.status} task={task} />;
          })}
        </div>
      </div>
    </Fragment>
  );
}

export default Board;
