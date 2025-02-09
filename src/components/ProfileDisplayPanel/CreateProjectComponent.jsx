import React, { useState } from 'react'
import PopUpBox from '../PopUpBox';

function CreateNewProjectComponent({ onCreateProject }) {
    const [isCreating, setIsCreating] = useState(false);

    const handleCreateProject = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const dataToSend = Object.fromEntries(formData);
        onCreateProject(dataToSend)
        setIsCreating(false)
    }

    return (
        <>
            <div
                className='border-2 border-dashed border-purple-500 rounded-lg p-6 flex justify-center items-center cursor-pointer hover:bg-gray-800 transition duration-300'
                onClick={() => setIsCreating(true)} >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
            </div>

            <PopUpBox
                isOpen={isCreating}
                onClose={() => setIsCreating(false)}
                onConfirm={handleCreateProject}
                title="Create New Project"
                confirmTitle="Create Project"
                customStyle={{ height: "fit-content" }}
            >
                <div className='p-6 space-y-6'>
                    <div>
                        <label htmlFor="title" className='block text-sm font-medium text-gray-400 mb-1'>Project Title</label>
                        <input
                            id="title"
                            name='title'
                            className='w-full px-3 py-2 bg-gray-800 text-white placeholder-gray-500 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent'
                            type='text'
                            placeholder='Enter project title'
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className='block text-sm font-medium text-gray-400 mb-1'>Description (optional)</label>
                        <textarea
                            id="description"
                            name='description'
                            placeholder='Describe your project'
                            rows={4}
                            className='w-full px-3 py-2 bg-gray-800 text-white placeholder-gray-500 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent'
                        />
                    </div>
                </div>
            </PopUpBox>
        </>
    )
}

export default CreateNewProjectComponent