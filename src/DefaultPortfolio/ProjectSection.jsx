import React from 'react'
import ProjectCard from './ProjectCard'

function ProjectSection() {
  return (
    <div className='parallax-group bg-gradient-to-b from-[#030014] via-[#0a0d16] to-[#141b2e] items-center flex flex-col p-2 py-20' id='project-section'>

        <h1 className='text-4xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 p-2 my-10'>My Projects</h1>

        <div id="project-holder" className='grid grid-cols-3 gap-10'>
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
        </div>

        <img src="/planet4.png" alt="planet" className='parallax-layer left-0 max-h-[120vh]'/>

    </div>
  )
}

export default ProjectSection