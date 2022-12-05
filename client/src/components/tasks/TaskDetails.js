import React, { useEffect, useState } from "react";
import Modal from "../UI/Modal";
import classes from "./TaskDetails.module.css";
import Select from "react-select";
import { Trash2 } from "react-feather";
import apiClient from "../../services/ApiClient";

function TaskDetails(props) {
  const [users, setUsers] = useState()
  const defaultAssignees = [];
  const [taskName, settaskName] = useState(props.task.name);
  const [taskDescription, settaskDescription] = useState(props.task.description);
  const [taskDueDate, settaskDueDate] = useState(props.task.dueDate.toString().slice(0, 10));
  const [assignees, setAssignees] = useState();
  const [priority, setPriority] = useState(props.task.priority);
  const [error, setError] = useState('');
  useEffect(() => {
    const fetchUsers = async () => {
      const { dataresponse, error } = await apiClient.fetchUsers();
      let users = []
      dataresponse.result.map((user) => {
        users.push({ value: user._id, label: user.name });
      });
      setUsers(users)
    };
    fetchUsers();
  }, [props]);
  useEffect(() => {
    const fetchAssignees = async () => {
      const { dataresponse, error } = await apiClient.fetchAssignees({
        projectid: props.task.projectid,
        taskid: props.task._id,
      });
      dataresponse.result.map((user) => {
        defaultAssignees.push({ value: user.assigneeid, label: user.name });
      });
      setAssignees(defaultAssignees)
    };
    fetchAssignees();
  }, [props.project]);
  const selectedAssigneesHandler = (selected) => {
    setAssignees(selected);
  };
  const selectedPriorityHandler = (selected) => {
    setPriority(selected.value);
  };
  const selectedStatusHandler = async (selected) => {
    setError("")
    const { dataresponse, error } = await apiClient.changeStatus({
      taskid: props.task._id,
      status: selected.value
    });
    if (dataresponse.result) {
      window.location.reload();
    } else {
      setError("Something Went Wrong")
    }
  };
  const submitFormHandler = async (event) => {
    setError("")
    event.preventDefault();
    if(taskName.trim() === "" || taskDescription.trim() === "" || !taskDueDate === true || !priority === true || !assignees === true) {
      setError("Fill All Fields")
    } else {
      const { dataresponse, error } = await apiClient.updateTaskDetails({
        name: taskName,
        description: taskDescription,
        dueDate: taskDueDate,
        assignees: assignees,
        priority: priority,
        status: props.status,
        taskid: props.task._id,
        projectid: props.task.projectid,
      });
      if (dataresponse.result) {
        window.location.reload();
      } else {
        setError("Something Went Wrong")
      }
    }
  };
  const deleteTaskHandler = async (event) => {
    setError("")
    event.preventDefault();
    const { dataresponse, error } = await apiClient.deleteTask({
      taskid: props.task._id
    });
    if (dataresponse.result) {
      window.location.reload();
    } else {
      setError("Something Went Wrong")
    }
  }
  const status = [
    { value: 1, label: "ToDo" },
    { value: 2, label: "InProgress" },
    { value: 3, label: "Done" },
  ];
  const Priority = [
    {
      value: 1,
      label: "Highest",
    },
    {
      value: 2,
      label: "Medium",
    },
    {
      value: 3,
      label: "Low",
    },
    {
      value: 4,
      label: "Lowest",
    },
  ];
  return (
    <Modal onCloseModal={props.onCloseTaskDetails}>
      <div className="d-flex justify-content-between gap-4 p-3">
        <Select
          options={status}
          className="basic-single"
          onChange={selectedStatusHandler}
          defaultValue={{
            value: status[parseInt(props.status) - 1].value,
            label: status[parseInt(props.status) - 1].label,
          }}
        />
        <Trash2 type="button" onClick={deleteTaskHandler}/>
      </div>
      <form onSubmit={submitFormHandler}>
        <div className={classes.formElement}>
        {error && <p className={classes["error-text"]}>{error}</p>}
          <div className="d-flex gap-4 justify-content-start">
            <div className={classes.detailbox}>
            <label htmlFor="task">
                <span>Task</span>
              </label>
              <input
                type="text"
                name="task"
                className={classes.inputField}
                id="task"
                value={taskName}
                onChange={(event) => {settaskName(event.target.value)}}
              />
              <div className={classes.divider} />
              <label htmlFor="description">
                <span>Description</span>
              </label>
              <textarea
                name="description"
                rows="2"
                className={classes.inputField}
                id="description"
                value={taskDescription}
                onChange={(event) => {settaskDescription(event.target.value)}}
              ></textarea>
            </div>
            <div className={classes.detailbox}>
              <label htmlFor="task">
                <span>Due Date</span>
              </label>
              <input
                type="date"
                name="task"
                className={classes.inputField}
                id="task"
                value={taskDueDate}
                onChange={(event) => {settaskDueDate(event.target.value)}}
              />
              <div className={classes.divider} />
              <label htmlFor="description">
                <span>Assignee</span>
              </label>
              <Select
                isMulti={true}
                name="assignees"
                options={users}
                className="basic-multi-select"
                onChange={selectedAssigneesHandler}
                defaultValue={defaultAssignees}
              />
              <div className={classes.divider} />
              <label htmlFor="description">
                <span>Priority</span>
              </label>
              <Select
                options={Priority}
                className="basic-single"
                value={Priority.value}
                defaultValue={{
                  label: Priority[parseInt(priority) - 1].label,
                  value: Priority[parseInt(priority) - 1].value,
                }}
                onChange={selectedPriorityHandler}
              />
            </div>
          </div>

          <div className={classes.actions}>
            <button className={classes.actionbtn} type="submit">
              Save
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
export default TaskDetails;
