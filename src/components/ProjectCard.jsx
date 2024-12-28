import React, { useState, useContext } from 'react'
import axios from "@/Networking/Axios";
import requests from "@/Networking/Requests";
import Link from "next/link";
import ProjectEditComponent from './ProjectEditComponent';
import UserDataContext from '@/utils/UserDataContext';
import UserProjectContext from '@/utils/UserProjectContext';
import PopUpBox from './PopUpBox';

function ProjectCard({ currentProjectIndex }) {
  const { projectData, setProjectData} = useContext(UserProjectContext);
  const {userData, userPermission} = useContext(UserDataContext);

  const [isProjectEdit, setIsProjectEdit] = useState(false);
  const [isDeletingProject, setIsDeletingProject] = useState(false);

  const currentProjectData = projectData[currentProjectIndex];

  const deleteProject = async (pid) => {
    try {
      const response = await axios.delete(requests.getUpdateDeleteProjectById(pid));
      setProjectData(projectData.filter((comp) => comp._id !== pid));
    } catch (error) {
      console.error("Failed to delete project", error);
    }
  }

  return (
    <div className='bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition duration-300'>
      <Link 
        className="flex flex-col justify-between h-full p-6" 
        href={`/profile/${userData._id}/${currentProjectData._id}`}>
        <div>
          <h1 className='text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>
            {currentProjectData.title}
          </h1>
          <p className='text-gray-300 mb-4'>{currentProjectData.description}</p>
        </div>

        {userPermission === "OWNER" &&
          <div className='flex justify-end space-x-2 mt-4'>
            <button
              onClick={(e) => { e.preventDefault(); setIsDeletingProject(true) }}
              className='bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-200'>
              Delete
            </button>
            <button
              onClick={(e) => { e.preventDefault(); setIsProjectEdit(true) }}
              className='bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-200'>
              Edit
            </button>
          </div>
        }
      </Link>

      {isProjectEdit && 
        <PopUpBox toClose={setIsProjectEdit} heading={'Edit Project'}>
          <ProjectEditComponent currentProjectData={currentProjectData} setIsProjectEdit={setIsProjectEdit} />
        </PopUpBox>
      }
      
      {isDeletingProject && 
        <PopUpBox toClose={setIsDeletingProject} customStyle={{height: 'fit-content'}} heading={'Confirm Delete?'}> 
            <div className='flex flex-col items-center justify-center px-4'>
              <p className='text-gray-300'>Are you sure you want to delete this project? Once deleted, it cannot be recovered.</p>
              <button className='bg-red-600 text-white p-2 m-4 rounded-md hover:bg-red-700 transition duration-200 w-2/4' onClick={() => {e.preventDefault(); deleteProject(currentProjectData._id); setIsDeletingProject(false)}}>Yes</button>
            </div>
        </PopUpBox>
      }
    </div>
  )
}

export default ProjectCard;