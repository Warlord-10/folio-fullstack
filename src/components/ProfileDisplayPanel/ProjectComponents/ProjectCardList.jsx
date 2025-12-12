"use client"
import React, { useState } from 'react'
import ProjectCard from './ProjectCard';
import CreateProjectComponent from './CreateProjectComponent';
import { fetchClient } from '@/Networking/FetchInstanceClient'
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
            const response = await fetchClient(requests.createUserProject(), {
                method: "POST",
                body: JSON.stringify(dataToSend),
                headers: {
                    "Content-Type": "application/json",
                }
            })

            toast.success("Project created successfully")
            setProjectData(prev => [...prev, response.data])
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to create project")
        }
    }

    const deleteProject = async (pid) => {
        try {
            await fetchClient(requests.getUpdateDeleteProjectById(pid), {
                method: "DELETE",
            })

            toast.success("Project deleted successfully")
            setProjectData(prev => prev.filter(project => project._id !== pid));
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete project")
        }
    }

    const editProject = async (dataToSend, pid) => {
        try {
            const response = await fetchClient(requests.getUpdateDeleteProjectById(pid), {
                method: "PATCH",
                body: JSON.stringify(dataToSend),
                headers: {
                    "Content-Type": "application/json",
                }
            })

            toast.success("Project updated successfully")
            setProjectData(prev => prev.map(project =>
                project._id === pid ? { ...project, ...dataToSend } : project
            ));
        } catch (error) {
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