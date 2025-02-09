import React, { useContext } from 'react'
import axios from "@/Networking/Axios";
import requests from '@/Networking/Requests';

function ProjectEditComponent({projectData}) {

  return (
      <div className='space-y-6'>
        <div>
          <label htmlFor="title" className='block text-sm font-medium text-gray-400 mb-1'>Project Title</label>
          <input
            id="title"
            type='text'
            name='title'
            defaultValue={projectData.title}
            className='w-full px-3 py-2 bg-gray-800 text-white placeholder-gray-500 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent'
          />
        </div>
        
        <div>
          <label htmlFor="description" className='block text-sm font-medium text-gray-400 mb-1'>Project Description</label>
          <textarea
            id="description"
            name='description'
            defaultValue={projectData.description}
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
      </div>
  )
}

export default ProjectEditComponent