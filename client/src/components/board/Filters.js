import React, { useEffect, useState } from "react";
import { Search } from "react-feather";
import classes from "./Filters.module.css";
import Select from "react-select";
import apiClient from "../../services/ApiClient";

function Filters(props) {
  const [users, setUsers] = useState()
  const [assignees, setAssignees] = useState(null)
  const [search, setSearch] =useState(null)
  const [myTasks, setMyTasks] = useState(false)
  useEffect(()=>{
    const fetchUsers = async () => {
      const { dataresponse, error } = await apiClient.fetchUsers()
      let users = []
      dataresponse.result.map(user =>{
        users.push({value: user._id, label: user.name})
      })
      setUsers(users)
    }
    fetchUsers()
  },[props])
  const selectedAssigneesHandler = (selected) => {
    setAssignees(selected)
    console.log(selected)
    props.onSelectAssigneeFilter(selected)
  }
  const myTasksFiltersHandler = () => {
    setMyTasks(!myTasks)
    setAssignees(null)
    setSearch(null)
    props.onMyTaskFilter(!myTasks)
  }
  const searchHandler = (event) => {
    setSearch(event.target.value)
    setMyTasks(!myTasks)
    setAssignees(null)
    props.onSearchFilterHandler(event.target.value)
  }
  const clearFiltersHandler = () => {
    setAssignees(null)
    setSearch(null)
    setMyTasks(false)
  }
  const myTaskbtnClass = myTasks ? `focusbtn` : `btn`
  return (
    <div className={classes.filters}>
      <div className={classes.form}>
        <input
          type="text"
          className="form-control form-input"
          placeholder="Search Task..."
          value={search}
          onChange={searchHandler}
        />
      </div>
      <Select
            isMulti
            name="colors"
            options={users}
            className={classes["basic-multi-select"]}
            placeholder="Search Assignees"
            value={assignees}
            onChange={selectedAssigneesHandler}
            maximumSelectionLength={1}
          />
      <button className={classes[myTaskbtnClass]} onClick={myTasksFiltersHandler}>Only My Tasks</button>
    </div>
  );
}
export default Filters;
