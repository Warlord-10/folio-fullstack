"use client"
import React, { useEffect, useState } from 'react';

import Blackhole from './Blackhole';

function Banner() {
  return (
    <div className='banner parallax-group flex'>
      
      <Blackhole />

      <div id='about-me' className='parallax-layer parallax-1 flex flex-col gap-2 text-6xl font-sans font-bold text-white p-5'>
          <span>Hi, I am</span>
          <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500'> Deepanshu Joshi</span>
          <span className='text-2xl font-mono font-medium mt-5'>I am a developer who loves creating new things</span>
      </div>

      {/* <img src={planet} alt="" id='planet-1' className='parallax-layer parallax-1 h-[100px]'/> */}
    </div>
  )
}

export default Banner;