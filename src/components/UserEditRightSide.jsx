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
        <div className='p-3 flex flex-col w-[60%]'>
            <div className='flex justify-between p-2'>
                <h1 className='text-4xl underline underline-offset-2'>Your Projects</h1>
            </div>

            {/* Holds all the projects details */}
            <div className="projectMenu grid grid-cols-2 gap-2 self-start w-full">
                {projectData.map((m, index) => (
                    <ProjectCard
                        key={m._id}
                        currentProjectIndex={index}
                    />
                ))}

                {/* button to add new project */}
                {userPermission === "OWNER" &&
                    <div
                        className='border-dashed border-2 border-black flex justify-center items-center cursor-pointer rounded-md p-2'
                        onClick={() => setIsCreatingNewProject(true)} >
                        <svg xmlns="http://www.w3.org/2000/svg" height="64" width="64" viewBox="0 0 576 512">
                            <path d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384v38.6C310.1 219.5 256 287.4 256 368c0 59.1 29.1 111.3 73.7 143.3c-3.2 .5-6.4 .7-9.7 .7H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128zm48 96a144 144 0 1 1 0 288 144 144 0 1 1 0-288zm16 80c0-8.8-7.2-16-16-16s-16 7.2-16 16v48H368c-8.8 0-16 7.2-16 16s7.2 16 16 16h48v48c0 8.8 7.2 16 16 16s16-7.2 16-16V384h48c8.8 0 16-7.2 16-16s-7.2-16-16-16H448V304z" />
                        </svg>
                    </div>
                }
            </div>
            {
                isCreatingNewProject===true && 
                <CreateNewProjectComponent 
                    setIsCreatingNewProject={setIsCreatingNewProject}
                />
            }
        </div>
    )
}

export default UserEditRightSide