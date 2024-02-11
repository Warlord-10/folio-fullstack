import React from 'react';
// import blackHole from "/blackhole.webm"


function Blackhole() {
  return (
    <div id='id-blackhole' className='blackhole-holder parallax-layer parallax-4 border-4 border-gray-700 bg-green-300'>
      <video autoPlay muted loop className='rotate-180 border-2 border-red-800 absolute'>
        <source src="/blackhole.webm" alt="balckhole gif" type='video/webm'/>
      </video>
    </div>
  )
}

export default Blackhole