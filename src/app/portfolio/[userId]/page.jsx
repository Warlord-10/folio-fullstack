// "use client"
import requests from "@/Networking/Requests";
import React from 'react'

import Banner from '@/DefaultPortfolio/Banner'
import "@/DefaultPortfolio/parallax.css"
import "@/DefaultPortfolio/default.css"
import Script from 'next/script'
import ProjectsPage from '@/DefaultPortfolio/projectPage'
import TechStackPage from '@/DefaultPortfolio/techStackPage'
import ComplexAnimationPage from '@/DefaultPortfolio/animationPage'
import Footer from '@/DefaultPortfolio/footer'
import Home from '@/DefaultPortfolio/test'


function originalFolio() {
  return (
    <div className='bg-[#030014]'>
      {/* <IntroPage /> */}
      {/* <StarsCanvas /> */}
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
  // No await here — nothing to catch. Any real failure bubbles to error.jsx.
  return (
    <>
      <Script src={requests.projectBundles(`${params.userId}/main.bundle.js`)} strategy="afterInteractive" />
      <Script src={requests.projectBundles(`${params.userId}/runtime.bundle.js`)} strategy="afterInteractive" />
      <Script src={requests.projectBundles(`${params.userId}/vendors.bundle.js`)} strategy="afterInteractive" />

      <div id='userPageRoot' className="min-h-screen bg-white">
        {/* This div will be hydrated by the bundle.js */}
      </div>
    </>
  );
}
