import React, { useContext } from 'react'
import axios from "@/Networking/Axios";
import requests from '@/Networking/Requests';
import UserProjectContext from '@/utils/UserProjectContext';

function CreateNewProjectComponent({ setIsCreatingNewProject }) {
    const { projectData, setProjectData } = useContext(UserProjectContext);

    const createNewProject = async (e) => {
        try {
            const dataToSend = {
                title: e.get("title"),
                description: e.get("about")
            }
            const response = await axios.post(requests.createUserProject(), dataToSend);
            setProjectData([...projectData, response.data.pid])
            setIsCreatingNewProject(false);
        } catch (error) {
            console.error("Project creation failed!", error);
        }
    }

    return (
        <div className='fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-70 backdrop-blur-sm'>
            <form 
                className='w-full max-w-md bg-gray-900 rounded-lg shadow-lg overflow-hidden border border-purple-500'
                action={createNewProject}>
                <div className='p-6 space-y-6'>
                    <div className='flex justify-between items-center'>
                        <h1 className='text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>
                            Create New Project
                        </h1>
                        <button
                            className='text-gray-400 hover:text-white transition duration-200'
                            type="button"
                            onClick={() => setIsCreatingNewProject(false)}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                    </div>

                    <div className='space-y-4'>
                        <div>
                            <label htmlFor="title" className='block text-sm font-medium text-gray-400 mb-1'>Project Title</label>
                            <input
                                id="title"
                                className='w-full px-3 py-2 bg-gray-800 text-white placeholder-gray-500 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent'
                                type='text'
                                name='title'
                                placeholder='Enter project title'
                            />
                        </div>
                        <div>
                            <label htmlFor="about" className='block text-sm font-medium text-gray-400 mb-1'>Description (optional)</label>
                            <textarea
                                id="about"
                                name='about'
                                placeholder='Describe your project'
                                rows={4}
                                className='w-full px-3 py-2 bg-gray-800 text-white placeholder-gray-500 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent'
                            />
                        </div>
                    </div>

                    <button
                        className='w-full px-4 py-2 text-white font-semibold bg-gradient-to-r from-purple-500 to-pink-600 rounded-md hover:from-purple-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 transition duration-200'
                        type='submit'>
                        Create Project
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreateNewProjectComponent