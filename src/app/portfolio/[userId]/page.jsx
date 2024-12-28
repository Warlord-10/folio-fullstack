import Banner from '@/DefaultPortfolio/Banner'
import Navbar from '@/DefaultPortfolio/Navbar'
import React from 'react'
import "@/DefaultPortfolio/parallax.css"
import "@/DefaultPortfolio/default.css"
import Script from 'next/script'
import requests from "@/Networking/Requests";
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
    // const response = await axios.get(requests.getUserProfilePage(params.userId));
    return (
      <>
        <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />
        <Script src={`${requests.userBundles()}${await response.data}`} strategy="afterInteractive" />
        <div id='userPageRoot'></div>
      </>
    );
  } catch (error) {
    return originalFolio();
  }
}
