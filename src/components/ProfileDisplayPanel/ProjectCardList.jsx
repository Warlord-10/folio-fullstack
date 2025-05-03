"use client"
import React, { useState } from 'react'
import ProjectCard from './ProjectCard';
import CreateProjectComponent from './CreateProjectComponent';
import axios from "@/Networking/Axios";
import requests from "@/Networking/Requests";
import { toast } from 'sonner'


function ProjectCardList({ projects }) {
    const userPermission = projects?.permission || "VISITOR";
    const [projectData, setProjectData] = useState(projects?.data || [])

    const createProject = async (dataToSend) => {
        if (!dataToSend?.title?.trim()) {
            toast.error("Project title cannot be empty")
            return;
        }

        try {
            const response = await axios.post(requests.createUserProject(), dataToSend);
            toast.success("Project created successfully")

            setProjectData(prev => [...prev, response.data.data])
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || "Failed to create project")
        }
    }

    const deleteProject = async (pid) => {
        // Optimistic update
        const previousData = [...projectData];
        setProjectData(prev => prev.filter(project => project._id !== pid));

        try {
            await axios.delete(requests.getUpdateDeleteProjectById(pid));
            toast.success("Project deleted successfully")
        } catch (error) {
            // Rollback on error
            setProjectData(previousData);
            toast.error( error.response?.data?.message || "Failed to delete project")
        }
    }

    const editProject = async (dataToSend, pid) => {
        const previousData = [...projectData];
        // Optimistic update
        setProjectData(prev => prev.map(item => 
            item._id === pid ? { ...item, ...dataToSend } : item
        ));

        try {
            const response = await axios.patch(requests.getUpdateDeleteProjectById(pid), dataToSend)
            toast.success("Project updated successfully")
        } catch (error) {
            // Rollback on error
            setProjectData(previousData);
            toast.error(error.response?.data?.message || "Failed to update project")
        }
    }


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projectData.map((project) => (
                <ProjectCard
                    key={project._id}
                    projectData={project}
                    userPermission={userPermission}
                    toDelete={deleteProject}
                    toEdit={editProject}
                />
            ))}

            {userPermission === "OWNER" && (
                <CreateProjectComponent 
                    onCreateProject={createProject}
                />
            )}
        </div>
    )
}

export default ProjectCardList