import React from 'react'
import "./homePage.css"
import Page1 from '@/HomePage/Page1';
import Page2 from '@/HomePage/Page2';
import Page3 from '@/HomePage/Page3';
import Page4 from '@/HomePage/Page4';
import Page5 from '@/HomePage/Page5';
import Page6 from '@/HomePage/Page6';



export default function Home() {
  return (
    <div className='main-home-page-container'>
      <Page1 />
      <Page2 />
      <Page3 />
      <Page4 />
      {/* <div className='h-[100vh] bg-green-400'></div> */}
      {/* <div className='h-[100vh] bg-gray-400'></div> */}
      <Page5 />
      {/* <Page6 /> */}

      <div className='page bg-blue-300'>
        <div className='sample text-[25rem] font-[Anta] font-extrabold'>HOST</div>
      </div>
    </div>
  );
}
