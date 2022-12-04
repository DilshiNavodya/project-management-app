import React, { useState, useEffect } from "react";
import ProjectDetails from "../components/projects/ProjectDetails"
import SideBar from "../components/projects/SideBar"
import apiClient from '../services/ApiClient'
function Projects () {
    const [projects, setProjects] = useState()
    const [selectedProject, setSelectedProject] = useState()
    useEffect(()=>{
        const fetchProjects = async () => {
          const { dataresponse, error } = await apiClient.fetchProjects()
        setProjects(dataresponse.result)
        if(dataresponse.result.length !== 0){
            setSelectedProject(dataresponse.result[0])
        }
        }
        fetchProjects()
      },[])
    const selectProjectHandler = (project) => {
        projects.map((data) => {
            if(data._id === project) {
                setSelectedProject(data)
            }
        })
    }
    return (
        <div className='d-flex flex column'>
            <SideBar onSelectProject={selectProjectHandler} projects={projects}/>
            {selectedProject && <ProjectDetails project={selectedProject}/>}
        </div>
    )
}
export default Projects