import React from 'react'
// import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <div className="navbar fixed shadow-lg h-[60px] top-0 bg-[#03001420] backdrop-blur-md w-full z-50 flex p-2 justify-center items-center font-mono text-white">
      <div className='rounded-full w-[40%] h-full bg-black/25 backdrop-blur-md p-3 flex justify-between'>
        <button>Home</button>
        <button>Projects</button>
        <button>About</button>
      </div>
    </div>
  )
}

export default Navbar;