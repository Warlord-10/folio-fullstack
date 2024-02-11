import React from 'react'
import Banner from './Banner'
import Navbar from './Navbar'
import StarsCanvas from './StarBackground'
import Footer from './Footer'
import ProjectSection from './ProjectSection'
import "./parallax.css"
import Par from './par'
import Blackhole from './Blackhole'

function UserPage() {
  return (
    <div className='bg-[#030014]'>
        {/* <StarsCanvas /> */}
        <Navbar />
        <div className='parallax'>
          {/* <Blackhole /> */}
          <Banner />
          <ProjectSection />
          <Footer />
          {/* <Par /> */}
        </div>
    </div>
  )
}

export default UserPage