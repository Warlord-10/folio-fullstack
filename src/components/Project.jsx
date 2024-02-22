import React, { useState } from 'react'
import axios from "@/Networking/Axios";
import requests from "@/Networking/Requests";
import Link from "next/link";

function Project({ data, deleteFunction }) {
  const [isProjectEdit, setIsProjectEdit] = useState(false);

  const editProjectData = async (e) => {
    e.preventDefault();
    setIsProjectEdit(false);
  }
  const test = async(e) => {
    e.preventDefault();
    const response = axios.get(requests.transpileProject(data._id))
    console.log(response.data);
  }

  return (
    <Link className="project border-white border-2 p-3 rounded-md 
      hover:shadow-lg flex flex-col justify-between gap-3" href={`/user/${data.owner}/${data._id}`}>
      <h1 className='heading font-bold text-3xl'>{data.title}</h1>
      <h1 className='description font-medium'>{data.description}</h1>
      <div className='flex justify-between pt-2 mt-2'>
        <button onClick={(e)=>deleteFunction(e, data._id)} className='bg-red-500 rounded-md p-1 hover:bg-red-800'>Delete</button>

        <button onClick={test} className="p-2">Transpile</button>

        {isProjectEdit
          ? <button onClick={null} className='bg-green-500 rounded-md p-1 hover:bg-green-800'>Save</button>
          : <button onClick={(e) => setIsProjectEdit(true)} className='bg-green-500 rounded-md p-1 hover:bg-green-800'>Edit</button>
        }

      </div>
    </Link>
  )
}
export default Project;