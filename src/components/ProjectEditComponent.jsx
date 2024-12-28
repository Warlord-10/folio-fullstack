import React, { useContext } from 'react'
import axios from "@/Networking/Axios";
import requests from '@/Networking/Requests';
import UserProjectContext from '@/utils/UserProjectContext';

function ProjectEditComponent({currentProjectData, setIsProjectEdit}) {
    const {projectData, setProjectData} = useContext(UserProjectContext);

    const updateProject = async (e, id) => {
        const dataToSend = new FormData()
        dataToSend.append("title", e.get("title"))
        dataToSend.append("description", e.get("description"))
        dataToSend.append("file", e.get("banner"))
        const response = await axios.patch(requests.getUpdateDeleteProjectById(id), dataToSend)
        
        const updatedProjectData = projectData.map(item => {
            if (item._id === id) {
                return response.data;
            }
            return item;
        });
        setProjectData(updatedProjectData);
    }

  return (
    <form action={(e) => { updateProject(e, currentProjectData._id); setIsProjectEdit(false) }}>
      <div className='p-4 space-y-6'>
        <div>
          <label htmlFor="title" className='block text-sm font-medium text-gray-400 mb-1'>Project Title</label>
          <input
            id="title"
            type='text'
            name='title'
            defaultValue={currentProjectData.title}
            className='w-full px-3 py-2 bg-gray-800 text-white placeholder-gray-500 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent'
          />
        </div>
        
        <div>
          <label htmlFor="description" className='block text-sm font-medium text-gray-400 mb-1'>Project Description</label>
          <textarea
            id="description"
            name='description'
            defaultValue={currentProjectData.description}
            className='w-full px-3 py-2 bg-gray-800 text-white placeholder-gray-500 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent'
            rows={5}
          />
        </div>
        
        <div>
          <label htmlFor="banner" className='block text-sm font-medium text-gray-400 mb-1'>Project Banner</label>
          <input
            id="banner"
            type='file'
            name='banner'
            accept='image/*'
            className='w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent'
          />
        </div>

        <div className='flex justify-between mt-6'>
          <button type='submit' className='px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-200'> Save </button>
        </div>
      </div>
    </form>
  )
}

export default ProjectEditComponent