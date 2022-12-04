import React, {useRef, useState} from "react";
import Modal from '../UI/Modal'
import classes from './AddProject.module.css'
import apiClient from '../../services/ApiClient'

function AddProject(props) {
  const projectNameRef = useRef();
  const projectDescriptionRef = useRef();
  const [successMsg, setSuccessMsg] = useState(false)
  const submitHandler = async (event) => {
    event.preventDefault();
    const { dataresponse, error } = await apiClient.addNewProject({
      name : projectNameRef.current.value,
      description: projectDescriptionRef.current.value
  })
  if(dataresponse.result) {
    window.location.reload()
  }
  }
    return (
        <Modal onCloseModal={props.onClose}>
            <form className={classes.formElement} onSubmit={submitHandler}>
            <label htmlFor="projectname">
            <span>Project Name</span>
          </label>
          <input
            type="text"
            name="projectname"
            className={classes.inputField}
            id="projectname"
            required
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
            required
            ref={projectDescriptionRef}
          ></textarea>
          <div className={classes.actions}>
            <button className={classes.actionbtn}>
             Add
            </button>
            <button
              className={classes.actionbtn}
              type=""
              onClick={props.onClose}
            >
              Cancel
            </button>
          </div>
            </form>
        </Modal>
    )
}
export default AddProject