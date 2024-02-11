import Banner from '@/DefaultPortfolio/Banner'
import Footer from '@/DefaultPortfolio/Footer'
import Navbar from '@/DefaultPortfolio/Navbar'
import ProjectSection from '@/DefaultPortfolio/ProjectSection'
import React from 'react'
import "@/DefaultPortfolio/parallax.css"
import "@/DefaultPortfolio/default.css"

function page() {
    return (
      <div className='bg-[#030014]'>
        {/* <StarsCanvas /> */}
        <Navbar />
        <div className='parallax'>
          <Banner />
          <ProjectSection />
          <Footer />
          {/* <Par /> */}
        </div>
      </div>
    )
}

export default page