import React, {useContext} from 'react'
import axios from "@/Networking/Axios";
import requests from '@/Networking/Requests';
import UserProjectContext from '@/utils/UserProjectContext';

function CreateNewProjectComponent({ setIsCreatingNewProject }) {
    const { projectData, setProjectData} = useContext(UserProjectContext);

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
            console.error("Project creation falied!", error);
        }
    }
    

  return (
    <div className='fixed top-0 left-0 z-1000 flex justify-center items-center h-screen w-screen backdrop-blur-sm'>
        <form 
            className='border-2 border-white text-black bg-black rounded-md overflow-hidden'
            action={createNewProject}>

            {/* <div className='h-full w-4 absolute z-1 bg-gradient-to-b from-pink-900 to-purple-950 ml-5' /> */}

            <h1 className='p-2 bg-green-500 text-xl flex justify-between'>
                Create a new Project
                <button
                    className='bg-red-500 pl-2 pr-2 rounded-md hover:bg-red-700'
                    type="button"
                    onClick={() => setIsCreatingNewProject(false)}>
                    X
                </button>
            </h1>

            <div className='m-3 space-y-10 mt-10'>
                <div className=''>
                    <h1 className='p-1 bg-green-500 rounded-md'>Title</h1>
                    <input
                        className='p-2 border-2 border-black rounded-md w-full'
                        type='text'
                        name='title'
                        placeholder='Title of the Project'
                    />
                </div>
                <div className=''>
                    <h1 className='p-1 bg-green-500 rounded-md'>Description(optional)</h1>
                    <textarea
                        type='text'
                        name='about'
                        placeholder='About the project'
                        cols={50}
                        className='p-2 border-2 border-black rounded-md w-full'
                    />
                </div>
                <button
                    className='p-1 bg-green-500 rounded-md hover:bg-green-700'
                    type='submit'>
                    Create
                </button>
            </div>
        </form>
    </div>
  )
}

export default CreateNewProjectComponent