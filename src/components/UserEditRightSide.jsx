"use client"
import React, { useState } from 'react'
import axios from "@/Networking/Axios";
import requests from '@/Networking/Requests';
import Project from './Project';

function UserEditRightSide({data}) {
    const [newProjectData, setNewProjectData] = useState(false);
    const [projectData, setProjectData] = useState(data);

    const createNewProject = async (e) => {
        try {
            const dataToSend = {
                title: e.get("title"),
                description: e.get("about")
            }
            const response = await axios.post(requests.createUserProject(), dataToSend);
            console.log(response.data)
            setProjectData([...projectData, response.data.pid])
            setNewProjectData(false);
        } catch (error) {
            console.error("Project creation falied!", error);
        }
    }
    const deleteProject = async (e, pid) => {
        e.preventDefault()
        const response = await axios.delete(requests.getUpdateDeleteProjectById(pid));
        setProjectData(projectData.filter((comp) => comp._id !== pid));
    }
    

    return (
        <div className='p-3 flex flex-col w-[60%]'>
            <div className='flex justify-between p-2'>
                <h1 className='text-4xl underline underline-offset-2'>Your Projects</h1>
                {/* <button className='bg-green-500 rounded-md pr-8 pl-8'>Edit</button> */}
            </div>

            {/* Holds all the projects details */}
            <div className="projectMenu grid grid-cols-2 gap-2 self-start w-full">
                {projectData.map((m) => (
                    <Project key={m._id} data={m} deleteFunction={deleteProject} />
                ))}

                {/* button to add new project */}
                <div
                    className='border-dashed border-2 border-black flex justify-center items-center cursor-pointer rounded-md p-2'
                    onClick={() => setNewProjectData(true)} >
                    <svg xmlns="http://www.w3.org/2000/svg" height="64" width="64" viewBox="0 0 576 512">
                        <path d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384v38.6C310.1 219.5 256 287.4 256 368c0 59.1 29.1 111.3 73.7 143.3c-3.2 .5-6.4 .7-9.7 .7H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128zm48 96a144 144 0 1 1 0 288 144 144 0 1 1 0-288zm16 80c0-8.8-7.2-16-16-16s-16 7.2-16 16v48H368c-8.8 0-16 7.2-16 16s7.2 16 16 16h48v48c0 8.8 7.2 16 16 16s16-7.2 16-16V384h48c8.8 0 16-7.2 16-16s-7.2-16-16-16H448V304z" />
                    </svg>
                </div>
            </div>

            {newProjectData !== false &&
                <form 
                    className='border-2 border-black mt-5 mb-5 relative pl-2 pr-2 text-black'
                    action={createNewProject}>

                    <div className='h-full w-4 absolute z-1 bg-gradient-to-b from-pink-900 to-purple-950 ml-5' />

                    <div className='relative z-2 space-y-16 m-3'>
                        <h1 className='p-2 bg-green-500 rounded-md text-xl flex justify-between'>
                            Add a new Project
                            <button
                                className='bg-red-500 pl-2 pr-2 rounded-md hover:bg-red-700'
                                type="button"
                                onClick={() => setNewProjectData(false)}>
                                X
                            </button>
                        </h1>

                        <div className='space-y-1'>
                            <h1 className='p-1 bg-green-500 rounded-md'>Title</h1>
                            <input
                                className='p-2 border-2 border-black w-[25em] rounded-md'
                                type='text'
                                name='title'
                                placeholder='Title of the Project'
                            />
                        </div>
                        <div className='space-y-1'>
                            <h1 className='p-1 bg-green-500 rounded-md'>Description(optional)</h1>
                            <textarea
                                type='text'
                                name='about'
                                placeholder='About the project'
                                cols={50}
                                className='p-2 border-2 border-black rounded-md'
                            />
                        </div>
                        {/* <input
                              onChange={(e) => setNewProjectData({ ...newProjectData, files: [...e.target.files] })}
                              type='file'
                              multiple
                          /> */}

                        <button
                            className='p-1 bg-green-500 rounded-md hover:bg-green-700'
                            type='submit'>
                            Create
                        </button>
                    </div>
                </form>
            }
        </div>
    )
}

export default UserEditRightSide