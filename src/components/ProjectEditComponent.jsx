import React, {useContext} from 'react'
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
    <div className='fixed top-0 left-0 z-1000 flex justify-center items-center h-screen w-screen backdrop-blur-sm'>
        <form
          className='flex flex-col gap-5 text-white font-mono border-white border-2 p-10 rounded-md bg-black'
          action={(e) => { updateProject(e, currentProjectData._id); setIsProjectEdit(false) }}>
          <label className='flex flex-col text-md'>Project Title:
            <input
              type='text'
              name='title'
              defaultValue={currentProjectData.title}
              className='p-2 rounded-md text-black'
            />
          </label>
          <label className='flex flex-col text-md'>Project Description:
            <textarea
              type='text'
              name='description'
              defaultValue={currentProjectData.description}
              className='p-2 rounded-md text-black'
              cols={5}
              rows={5}
            />
          </label>
          <label>Project banner:
            <input
              type='file'
              name='banner'
              accept='image/*'
            />
          </label>
    
          <div className='flex justify-between'>
            <button onClick={() => setIsProjectEdit(false)} className='bg-red-500 rounded-md p-2 hover:bg-red-800'>Cancel</button>
            <button type='submit' className='bg-green-500 rounded-md p-2 hover:bg-green-800'>Save</button>
          </div>
        </form >
    </div>
  )
}

export default ProjectEditComponent