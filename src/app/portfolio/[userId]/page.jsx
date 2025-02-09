// "use client"
import axios from "@/Networking/Axios";
import requests from "@/Networking/Requests";
import React from 'react'

import Banner from '@/DefaultPortfolio/Banner'
import Navbar from '@/DefaultPortfolio/Navbar'
import "@/DefaultPortfolio/parallax.css"
import "@/DefaultPortfolio/default.css"
import Script from 'next/script'
import StarsCanvas from '@/DefaultPortfolio/StarBackground'
import ProjectsPage from '@/DefaultPortfolio/projectPage'
import TechStackPage from '@/DefaultPortfolio/techStackPage'
import ComplexAnimationPage from '@/DefaultPortfolio/animationPage'
import Footer from '@/DefaultPortfolio/footer'
import IntroPage from '@/DefaultPortfolio/introPage'
import Home from '@/DefaultPortfolio/test'


function originalFolio() {
  return (
    <div className='bg-[#030014]'>
      {/* <IntroPage /> */}
      {/* <StarsCanvas /> */}
      <Navbar />
      <Banner />
      <ProjectsPage />
      <ComplexAnimationPage />
      <TechStackPage />
      <Footer />
      <Home />
    </div>
  )
}


export default async function Page({ params }) {
  try {
    return (
      <>
        <Script src={requests.projectBundles(`${params.userId}/main.bundle.js`)} strategy="afterInteractive" />
        <Script src={requests.projectBundles(`${params.userId}/runtime.bundle.js`)} strategy="afterInteractive" />
        <Script src={requests.projectBundles(`${params.userId}/vendors.bundle.js`)} strategy="afterInteractive" />

        <div id='userPageRoot' className="bg-white min-h-screen">
          {/* This div will be hydrated by the bundle.js */}
        </div>
      </>
    );
  } catch (error) {
    console.log(error);
    // return originalFolio();
    return <div className="text-white bg-red-800">{error.toString()}</div>
  }
}
