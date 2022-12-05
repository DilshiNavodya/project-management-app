import React, { useState, useEffect, useContext } from "react";
import Board from "../board/Board";
import Filters from "../board/Filters";
import classes from "./ProjectDetails.module.css";
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
  useEffect(() => {
    const fetchTasks = async () => {
      const { dataresponse, error } = await apiClient.fetchTasks({
        projectid: props.project._id,
      });
      setTasks(dataresponse.result);
      setTasksTmp(dataresponse.result);
    };
    fetchTasks();
  }, [props.project]);
  const filterAssignees = async (task, filterdata) => {
    let res = false;
    const { dataresponse, error } = await apiClient.fetchAssignees({
      projectid: props.project._id,
      taskid: task,
    });
      dataresponse.result.map((user) => {
        filterdata.map((data) => {
          if(user.assigneeid === data.value) {
            res = true;
          }
        });
      });
      return res;
  };
  const MyTasksFilterHandler = async (filterData) => {
    let Tasks = tasksTmp;
    let temp = tasksTmp
    let uid = authCtx.uid
    if (filterData) {
      Tasks.map(async (task) => {
        const { dataresponse, error } = await apiClient.fetchAssignees({
          projectid: props.project._id,
          taskid: task._id,
        });
        let res = false;
        dataresponse.result.map((user) => {
          if (user.assigneeid === uid) {
            res = true;
          }
        });
        if (!res) {
          temp = temp.filter((data) => data._id !== task._id);
        }
        setTasks(temp)
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
  };
  const AssigneeFilterHandler = async (assignees) => {
    let Tasks = tasksTmp
    let temp = tasksTmp
    if(assignees.length === 0) {
      setTasks(tasksTmp)
    } else {
     Tasks.map(async (task) => {
        let res = await filterAssignees(task._id, assignees);
        if (!res) {
          temp = temp.filter((data) => data._id !== task._id);
        }
        setTasks(temp)
      });
    }
  }
  const FilterByDateHandler = (date) => {
    let Tasks = tasksTmp
    if(date !== null) {
      Tasks = Tasks.filter((task) => task.dueDate.toString().slice(0,10) === date.toString())
    }
    setTasks(Tasks)
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
            onFilterByDate={FilterByDateHandler}
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
