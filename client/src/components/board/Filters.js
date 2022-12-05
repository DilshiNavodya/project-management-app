import React, { useEffect, useState } from "react";
import { X } from "react-feather";
import classes from "./Filters.module.css";
import Select from "react-select";
import apiClient from "../../services/ApiClient";

function Filters(props) {
  const [users, setUsers] = useState();
  const [myTasks, setMyTasks] = useState(false);
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
  const selectedAssigneesHandler = (selected) => {
    setMyTasks(false);
    props.onSelectAssigneeFilter(selected);
  };
  const myTasksFiltersHandler = () => {
    setMyTasks(!myTasks);
    props.onMyTaskFilter(!myTasks);
  };
  const searchHandler = (event) => {
    setMyTasks(false);
    props.onSearchFilterHandler(event.target.value);
  };
  const filterByDateHandler = (event) => {
    props.onFilterByDate(event.target.value);
    setMyTasks(false);
  };
  const clearDateHandler = () => {
    document.getElementById(
      'date').value = ''
    props.onFilterByDate(null)
  }
  const myTaskbtnClass = myTasks ? `focusbtn` : `btn`;
  return (
    <div className={classes.filters}>
      <div className={classes.form}>
        <input
          type="text"
          className="form-control form-input"
          placeholder="Search Task..."
          onChange={searchHandler}
        />
      </div>
      <Select
        isMulti
        name="colors"
        options={users}
        className={classes["basic-multi-select"]}
        placeholder="Search Assignees"
        onChange={selectedAssigneesHandler}
      />
      <button
        className={classes[myTaskbtnClass]}
        onClick={myTasksFiltersHandler}
      >
        Only My Tasks
      </button>
      <span className={classes.dateInput}>
        <input
          type="date"
          id="date"
          placeholder="Filter by date"
          onChange={filterByDateHandler}
        />
        <button className={classes.cancelBtn} onClick={clearDateHandler}><X/></button>
      </span>
    </div>
  );
}
export default Filters;
