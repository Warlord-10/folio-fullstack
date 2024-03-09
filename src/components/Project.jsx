import React, { useState } from 'react'
import axios from "@/Networking/Axios";
import requests from "@/Networking/Requests";
import Link from "next/link";

function Project({ data, deleteFunction, updateFunction, permission }) {
  const [isProjectEdit, setIsProjectEdit] = useState(false);

  
  return (
    <div className='border-white border-2 p-3 rounded-md hover:shadow-lg'>
      {isProjectEdit
        ? <form
          className='flex flex-col gap-5 text-white font-mono'
          action={(e) => { updateFunction(e, data._id); setIsProjectEdit(false) }}>
          <label className='flex flex-col text-md'>Project Title:
            <input
              type='text'
              name='title'
              defaultValue={data.title}
              className='p-2 rounded-md text-black'
            />
          </label>
          <label className='flex flex-col text-md'>Project Description:
            <textarea
              type='text'
              name='description'
              defaultValue={data.description}
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

        : <Link className="project flex flex-col justify-between gap-3 h-full" href={`/user/${data.owner}/${data._id}`}>
          <h1 className='heading font-bold text-3xl'>{data.title}</h1>
          <h1 className='description font-medium'>{data.description}</h1>
          {permission==="OWNER" &&
            <div className='flex justify-between pt-2 mt-2'>
              <button
                onClick={(e) => { e.preventDefault(); deleteFunction(data._id) }}
                className='bg-red-500 rounded-md p-1 hover:bg-red-800 px-5'>
                Delete
              </button>
              <button
                onClick={(e) => { e.preventDefault(); setIsProjectEdit(true) }}
                className='bg-green-500 rounded-md p-1 hover:bg-green-800 px-5'>
                Edit
              </button>
            </div>
          }
        </Link>
      }
    </div>
  )
}
export default Project;