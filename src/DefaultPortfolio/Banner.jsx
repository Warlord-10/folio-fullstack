"use client"

function Banner() {
  return (
    <div className='banner'>

      <div className='relative h-[250px] w-full'>
        <video autoPlay muted loop className='rotate-180 absolute top-[-370px] object-cover z-[1] w-full left-0'>
          <source src="/blackhole.webm" alt="balckhole gif" type='video/webm'/>
        </video>
      </div>

      <div id='about-me' className='sticky top-[100px] z-[2] flex flex-col gap-2 text-6xl font-sans font-bold text-white p-5'>
          <span>Hi, I am</span>
          <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500'> Deepanshu Joshi</span>
          <span className='text-2xl font-mono font-medium mt-5'>I am a developer who loves creating new things</span>
      </div>

      <div className="h-[100vh] border-2 border-white"></div>

    </div>
  )
}

export default Banner;