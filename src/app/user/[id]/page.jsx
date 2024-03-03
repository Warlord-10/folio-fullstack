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


function originalFolio() {
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


async function page({ params }) {
  try {
    const response = await axios.get(requests.getUserProfilePage(params.id));
    return (
      <>
        <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />
        <div id='userPageRoot'></div>
        <Script src={`${requests.userBundles()}${await response.data}`} strategy="afterInteractive" />
      </>
    );
  } catch (error) {
    return originalFolio();
  }
}

export default page