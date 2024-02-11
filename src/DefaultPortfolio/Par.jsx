import React from 'react'
import "./parallax.css"

function Par() {
  return (
    <div className='parallax text-white'>
        <div className='parallax-group p-2'>
            <div className='parallax-1 h-[100px] w-full bg-slate-700'>Navbar</div>
        </div>
        <div className='parallax-group p-2'>
            <div className='parallax-1 w-[1200px] h-[500px] bg-red-300 mx-10 my-10'>Object 1</div>
            <div className='parallax-2 w-[200px] h-[50px] bg-red-800 mx-10 my-10'>Object 2</div>
        </div>
        <div className='parallax-group p-2'>
            <div className='parallax-2 w-[1200px] h-[500px] bg-green-300 mx-10 my-32'>Object 2</div>
        </div>
        <div className='parallax-group p-2'>
            <div className='parallax-1 w-[1200px] h-[500px] bg-blue-300 mx-10 my-10'>Object-3</div>
        </div>
    </div>

  )
}

export default Par