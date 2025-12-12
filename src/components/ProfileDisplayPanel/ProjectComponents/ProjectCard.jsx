import React, { useState } from 'react'
import Link from "next/link";
import ProjectEditComponent from './ProjectEditComponent';
import { usePopUp } from '@/hooks/usePopUp';

function ProjectCard({ projectData, userPermission, toDelete, toEdit }) {
  const { PopUp: DeletePopup, open: openDelete, close: closeDelete } = usePopUp();
  const { PopUp: EditPopup, open: openEdit, close: closeEdit } = usePopUp();


  const handleEdit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)

    toEdit(Object.fromEntries(formData), projectData._id)
    closeEdit()
  }

  const handleDelete = (e) => {
    e.preventDefault()

    toDelete(projectData._id)
    closeDelete()
  }

  return (
    <div className='bg-gradient-to-br from-blue-800/10 to-zinc-600/90 from-[30%] rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 hover:shadow-black' >
      <Link
        className="flex flex-col justify-between h-full p-6"
        href={`/${projectData.owner_id}/${projectData.title}`}>
        <div>
          <h1 className='text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>
            {projectData.title}
          </h1>
          <p className='text-gray-300 mb-4'>{projectData.description}</p>
        </div>

        {userPermission === "OWNER" &&
          <div className='flex justify-end space-x-2 mt-4'>
            <button
              onClick={(e) => { e.preventDefault(); openDelete() }}
              className='bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-200'>
              Delete
            </button>
            <button
              onClick={(e) => { e.preventDefault(); openEdit() }}
              className='bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-200'>
              Edit
            </button>
          </div>
        }
      </Link>

      <DeletePopup
        onConfirm={handleDelete}
        title="Confirm Delete?"
        confirmTitle="Delete"
      >
        <div className='flex flex-col items-center justify-center'>
          <p className='text-gray-300'>Are you sure you want to delete project <span className='text-red-400 font-semibold text-lg'>&quot;{projectData.title}&quot;</span> ? Once deleted, it cannot be recovered.</p>
        </div>
      </DeletePopup>

      <EditPopup
        onConfirm={(e) => handleEdit(e)}
        title="Edit Project"
        confirmTitle="Save"
      >
        <ProjectEditComponent projectData={projectData} />
      </EditPopup>

    </div>
  )
}

export default ProjectCard;