import React, { useState, useEffect, useContext } from "react";
import Board from "../board/Board";
import Filters from "../board/Filters";
import classes from "./ProjectDetails.module.css";
import { DragDropContext } from "react-beautiful-dnd";
import apiClient from "../../services/ApiClient";
import AuthContext from "../../store/auth-context";
function ProjectDetails(props) {
  const authCtx = useContext(AuthContext);
  const boards = [
    {
      key: 1,
      data: "ToDo",
    },
    {
      key: 2,
      data: "InProgress",
    },
    {
      key: 3,
      data: "Done",
    },
  ];
  const [tasks, setTasks] = useState();
  const [tasksTmp, setTasksTmp] = useState();
  const [assignees, setAssignees] = useState();
  const [search, setSearch] = useState();
  const [myTasks, setMyTasks] = useState();
  useEffect(() => {
    const fetchTasks = async () => {
      const { dataresponse, error } = await apiClient.fetchTasks({
        projectid: props.project._id,
      });
      console.log(dataresponse.result);
      setTasks(dataresponse.result);
      setTasksTmp(dataresponse.result);
    };
    fetchTasks();
  }, [props.project]);
  const filtermyTasks = async (task) => {
    let uid = await authCtx.userid;
    let res = 'false';
    console.log(uid);
    const { dataresponse, error } = await apiClient.fetchAssignees({
      projectid: props.project._id,
      taskid: task._id,
    });
    dataresponse.result.map((user) => {
      if (user.assigneeid === uid) {
        res = "true";
      }
    });
    return res;
  };
  const filterAssignees = async (task, filterdata) => {
    let res = 'false';
    const { dataresponse, error } = await apiClient.fetchAssignees({
      projectid: props.project._id,
      taskid: task._id,
    });
      dataresponse.result.map((user) => {
        filterdata.map((data) => {
          if(user._id === data.value) {
            res = "true";
          }
        });
      });
      return res;
  };
  const MyTasksFilterHandler = async (filterData) => {
    let Tasks = tasksTmp;
    if (filterData) {
      await Tasks.map(async (task) => {
        let res = await filtermyTasks(task);
        console.log(res);
        if (res === "false") {
          setTasks(tasks.filter((data) => data._id !== task._id));
          console.log(tasks.filter((data) => data._id !== task._id));
        }
      });
    } else {
      setTasks(tasksTmp);
    }
  };
  const searchFilterHandler = (data) => {
    let Tasks = tasksTmp;
    setTasks(
      Tasks.filter((task) => {
        return task.name.toLowerCase().indexOf(data.toLowerCase()) !== -1;
      })
    );
    console.log(
      Tasks.filter((task) => {
        return task.name.toLowerCase().indexOf(data.toLowerCase()) !== -1;
      })
    );
  };
  const AssigneeFilterHandler = async (assignees) => {
    let Tasks = tasksTmp
    console.log(assignees)
    console.log(assignees.length)
    if(assignees.length === 0) {
      setTasks(tasksTmp)
    } else {
      await Tasks.map(async (task) => {
        let res = await filterAssignees(task, assignees);
        console.log(res)
        if (res === "false") {
          setTasks(tasks.filter((data) => data._id !== task._id));
        }
      });
    }
  }
  return (
    <div className={classes.projectDetails}>
      <div className="d-flex justify-content-between">
        <h3 className={classes.ProjectName}>{props.project.name}</h3>
        {tasks && (
          <Filters
            onMyTaskFilter={MyTasksFilterHandler}
            onSearchFilterHandler={searchFilterHandler}
            onSelectAssigneeFilter={AssigneeFilterHandler}
          />
        )}
      </div>
      <div className={classes.projectBoard}>
        {/* <DragDropContext onDragEnd={onDragEnd}> */}
        {boards.map((board) => {
          if (tasks) {
            return (
              <Board
                key={board.key}
                boardName={board.data}
                projectid={props.project._id}
                status={board.key}
                tasks={tasks.filter((task) => task.status === board.key)}
              />
            );
          }
        })}
        {/* </DragDropContext> */}
      </div>
    </div>
  );
}

export default ProjectDetails;
