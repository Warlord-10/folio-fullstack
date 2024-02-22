import Banner from '@/DefaultPortfolio/Banner'
import Footer from '@/DefaultPortfolio/Footer'
import Navbar from '@/DefaultPortfolio/Navbar'
import ProjectSection from '@/DefaultPortfolio/ProjectSection'
import React from 'react'
import "@/DefaultPortfolio/parallax.css"
import "@/DefaultPortfolio/default.css"
import Script from 'next/script'
import axios from "@/Networking/Axios";
import requests from "@/Networking/Requests";


async function page() {
  try {
    const response = await axios.get(requests.getUserProfilePage("65c88ebdc1ddaeba86f9af02"));

    return (
      <>
        <div id='userPageRoot'></div>
        <Script src="http://127.0.0.1:3005/test/65c88ea2c1ddaeba86f9aeff/65c88ebdc1ddaeba86f9af02/bundle.js" strategy="afterInteractive"/>
      </>
    );


  } catch (error) {
    console.log(error)
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

}

export default page