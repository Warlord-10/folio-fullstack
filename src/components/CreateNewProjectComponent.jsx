import React, { useContext } from 'react'
import axios from "@/Networking/Axios";
import requests from '@/Networking/Requests';
import UserProjectContext from '@/utils/UserProjectContext';

function CreateNewProjectComponent() {
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
        <form className='' action={createNewProject}>
            <div className='p-6 space-y-6'>
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

                <button
                    className='w-full px-4 py-2 text-white font-semibold bg-gradient-to-r from-purple-500 to-pink-600 rounded-md hover:from-purple-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 transition duration-200'
                    type='submit'>
                    Create Project
                </button>
            </div>
        </form>
    )
}

export default CreateNewProjectComponent