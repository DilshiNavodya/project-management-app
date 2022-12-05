import React, { useRef, useState } from "react";
import Modal from "../UI/Modal";
import classes from "./AddProject.module.css";
import apiClient from "../../services/ApiClient";

function AddProject(props) {
  const projectNameRef = useRef();
  const projectDescriptionRef = useRef();
  const [error, setError] = useState("");
  const submitHandler = async (event) => {
    setError("");
    event.preventDefault();
    let name = projectNameRef.current.value;
    let desc = projectDescriptionRef.current.value;
    if (name.trim() === "" || desc.trim() === "") {
      setError("Fill All Fields");
    } else {
      const { dataresponse, error } = await apiClient.addNewProject({
        name: projectNameRef.current.value,
        description: projectDescriptionRef.current.value,
      });
      if (dataresponse.result) {
        window.location.reload();
      } else {
        setError("Something Went Wrong");
      }
    }
  };
  return (
    <Modal onCloseModal={props.onClose}>
      <form className={classes.formElement} onSubmit={submitHandler}>
      {error && <p className={classes["error-text"]}>{error}</p>}
        <label htmlFor="projectname">
          <span>Project Name</span>
        </label>
        <input
          type="text"
          name="projectname"
          className={classes.inputField}
          id="projectname"
          ref={projectNameRef}
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
          ref={projectDescriptionRef}
        ></textarea>
        <div className={classes.actions}>
          <button className={classes.actionbtn}>Add</button>
          <button className={classes.actionbtn} type="" onClick={props.onClose}>
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}
export default AddProject;
