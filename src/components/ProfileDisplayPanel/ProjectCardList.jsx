"use client"
import React, { useState } from 'react'
import ProjectCard from './ProjectCard';
import CreateProjectComponent from './CreateProjectComponent';
import axios from "@/Networking/Axios";
import requests from "@/Networking/Requests";


function ProjectCardList({ projects }) {
    const userPermission = projects.permission;
    const [projectData, setProjectData] = useState(projects.data)

    const createProject = async (dataToSend) => {
        try {
            const response = await axios.post(requests.createUserProject(), dataToSend);
            setProjectData([...projectData, response.data.data])
        } catch (error) {
            console.error("Project creation failed!", error);
        }
    }
    const deleteProject = async (pid) => {
        try {
            const response = await axios.delete(requests.getUpdateDeleteProjectById(pid));
            setProjectData(projectData.filter((project) => project._id !== pid));
        } catch (error) {
            console.error("Failed to delete project", error);
        }
    }
    const editProject = async (dataToSend, pid) => {
        const response = await axios.patch(requests.getUpdateDeleteProjectById(pid), dataToSend)

        const updatedProjectData = projectData.map(item => {
            if (item._id === pid) {
                return response.data;
            }
            return item;
        });
        setProjectData(updatedProjectData);
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projectData.map((project, index) => (
                <ProjectCard
                    key={index}
                    projectData={project}
                    userPermission={userPermission}
                    toDelete={deleteProject}
                    toEdit={editProject}
                />
            ))}

            {userPermission === "OWNER" &&
                <CreateProjectComponent onCreateProject={createProject} />
            }
        </div>
    )
}

export default ProjectCardList