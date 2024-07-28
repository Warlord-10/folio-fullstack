import React, { useState, useContext } from 'react'
import axios from "@/Networking/Axios";
import requests from "@/Networking/Requests";
import Link from "next/link";
import ProjectEditComponent from './ProjectEditComponent';
import UserDataContext from '@/utils/UserDataContext';
import UserProjectContext from '@/utils/UserProjectContext';

function ProjectCard({ currentProjectIndex }) {
  // getting all the projects
  const { projectData, setProjectData} = useContext(UserProjectContext);
  const {userData, userPermission} = useContext(UserDataContext);

  const [isProjectEdit, setIsProjectEdit] = useState(false);
  const currentProjectData = projectData[currentProjectIndex];

  const deleteProject = async (pid) => {
    try {
      const response = await axios.delete(requests.getUpdateDeleteProjectById(pid));
      setProjectData(projectData.filter((comp) => comp._id !== pid));
    } catch (error) {

    }
  }

  return (
    <div className='border-white border-2 p-3 rounded-md hover:shadow-lg'>
      {isProjectEdit
        ? <ProjectEditComponent 
            currentProjectData={currentProjectData}
            setIsProjectEdit={setIsProjectEdit}
        />

        : <Link 
          className="project flex flex-col justify-between gap-3 h-full" 
          href={`/profile/${userData._id}/${currentProjectData._id}`}>
          <h1 className='heading font-bold text-3xl'>{currentProjectData.title}</h1>
          <h1 className='description font-medium'>{currentProjectData.description}</h1>

          {userPermission === "OWNER" &&
            <div className='flex justify-between pt-2 mt-2'>
              <button
                onClick={(e) => { e.preventDefault(); deleteProject(currentProjectData._id) }}
                className='bg-red-500 rounded-md p-1 hover:bg-red-800 px-5'>
                Delete
              </button>
              <button
                onClick={(e) => { e.preventDefault(); setIsProjectEdit(true) }}
                className='bg-green-500 rounded-md p-1 hover:bg-green-800 px-5'>
                Edit
              </button>
            </div>
          }
        </Link>
      }
    </div>
  )
}
export default ProjectCard;