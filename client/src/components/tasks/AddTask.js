import React, { useState, useEffect, useRef } from "react";
import Modal from "../UI/Modal";
import classes from "./AddTask.module.css";
import Select from "react-select";
import apiClient from "../../services/ApiClient";
function AddTask(props) {
  const [users, setUsers] = useState();
  const taskNameRef = useRef();
  const taskDescriptionRef = useRef();
  const taskDueDateRef = useRef();
  const [assignees, setAssignees] = useState();
  const [priority, setPriority] = useState();
  const [error, setError] = useState('');
  useEffect(() => {
    const fetchUsers = async () => {
      const { dataresponse, error } = await apiClient.fetchUsers();
      let users = [];
      dataresponse.result.map((user) => {
        users.push({ value: user._id, label: user.name });
      });
      setUsers(users);
    };
    fetchUsers();
  }, [props]);
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
  const selectedAssigneesHandler = (selected) => {
    setAssignees(selected);
  };
  const selectedPriorityHandler = (selected) => {
    setPriority(selected.value);
  };
  const submitFormHandler = async (event) => {
    setError("")
    event.preventDefault();
    let name = taskNameRef.current.value
    let desc = taskDescriptionRef.current.value
    let date = taskDueDateRef.current.value
    if(name.trim() === "" || desc.trim() === "" || !date === true || !priority === true || !assignees === true ){
      setError("Fill All Fields")
    } else {
      const { dataresponse, error } = await apiClient.addNewTask({
        name: taskNameRef.current.value,
        description: taskDescriptionRef.current.value,
        dueDate: taskDueDateRef.current.value,
        assignees: assignees,
        priority: priority,
        status: props.status,
        projectid: props.projectid,
      });
      if (dataresponse.result) {
        window.location.reload();
      } else {
        setError("Something Went Wrong")
      }
    }
  };
  return (
    <Modal onCloseModal={props.onClose}>
      <form onSubmit={submitFormHandler}>
        <div className={classes.formElement}>
        {error && <p className={classes["error-text"]}>{error}</p>}
          <h4 className={classes.formHeading}>Add Task</h4>
          <label htmlFor="task">
            <span>Task?</span>
          </label>
          <input
            type="text"
            name="task"
            className={classes.inputField}
            id="task"
            ref={taskNameRef}
          />
          <label htmlFor="description">
            <span>Description</span>
          </label>
          <textarea
            name="description"
            rows="2"
            className={classes.inputField}
            id="description"
            ref={taskDescriptionRef}
          ></textarea>
          <label htmlFor="task">
            <span>Due Date</span>
          </label>
          <input
            type="date"
            name="task"
            className={classes.inputField}
            id="task"
            ref={taskDueDateRef}
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
          />
          <div className={classes.divider} />
          <label htmlFor="description">
            <span>Priority</span>
          </label>
          <Select
            options={Priority}
            className="basic-single"
            value={Priority.value}
            onChange={selectedPriorityHandler}
          />
          <div className={classes.actions}>
            <button className={classes.actionbtn} type="submit">
              create
            </button>
            <button className={classes.actionbtn} onClick={props.onClose}>
              cancel
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
export default AddTask;
