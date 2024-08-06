"use client"
import React, { useState, useContext } from 'react'
import ProjectCard from './ProjectCard';
import UserDataContext from '@/utils/UserDataContext';
import CreateNewProjectComponent from './CreateNewProjectComponent';
import UserProjectContext from '@/utils/UserProjectContext';

function UserEditRightSide() {
    const { userData, userPermission } = useContext(UserDataContext);
    const {projectData, setProjectData} = useContext(UserProjectContext);
    
    const [isCreatingNewProject, setIsCreatingNewProject] = useState(false);

    return (
        <div className='p-6 flex flex-col w-full lg:w-[60%] bg-gray-950 rounded-lg shadow-lg'>
            <div className='flex justify-between items-center mb-6'>
                <h1 className='text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>Your Projects</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projectData.map((m, index) => (
                    <ProjectCard
                        key={m._id}
                        currentProjectIndex={index}
                    />
                ))}

                {userPermission === "OWNER" &&
                    <div
                        className='border-2 border-dashed border-purple-500 rounded-lg p-6 flex justify-center items-center cursor-pointer hover:bg-gray-800 transition duration-300'
                        onClick={() => setIsCreatingNewProject(true)} >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </div>
                }
            </div>
            {isCreatingNewProject && 
                <CreateNewProjectComponent 
                    setIsCreatingNewProject={setIsCreatingNewProject}
                />
            }
        </div>
    )
}

export default UserEditRightSide