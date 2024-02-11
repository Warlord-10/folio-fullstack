import React from 'react'


function ProjectCard({cardData}) {
  return (
    <div id="project-card" className='animated_border p-0.5 rounded-xl z-50'>
        <div className='rounded-xl shadow-lg border border-[#2A0E61] flex flex-col bg-[#030014] overflow-hidden'>
            <img src="https://camo.envatousercontent.com/0f97e1657b5b86a79a4e7c0c78315c0bfc337fb1/68747470733a2f2f692e6962622e636f2f523771713144702f6461726b2d746563682d74756e6e656c2d312e6a7067" alt="" className='w-[350px] object-contain'/>

            <div className='p-4'>
                <h1 className='text-2xl font-semibold text-white'>Heading</h1>
                <h1 className='text-gray-300'>Lorem Ipsum blah blah blah</h1>
            </div>
        </div>
    </div>
  )
}

export default ProjectCard;