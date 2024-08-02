import React from 'react'

function Page2() {
  return (
    <div className='page-2 bg-black font-[Anta] text-[25rem] overflow-clip'>

        <div className='page page-2-card-2 sticky top-0 bg-black justify-center items-center flex'>
          <p className='text-reveal text-center text-white text-[5rem] font-mono p-10'>
            <span>
              Welcome to the future of coding!
            </span>
          </p>
        </div>

        <div className='h-[100vh] page-2-card-3 flex sticky top-0'></div>

        <div className='h-[100vh] page-2-card-4 sticky top-0 bg-black'>
          <h1 className='text-white w-[300vw] h-full'>Unleash your <span className='text-transparent bg-clip-text bg-gradient-to-r from-red-900 to-blue-900 font-extrabold'>Creativity</span></h1>
        </div>

        <div className='page-2-card-5 h-[200vh] flex sticky top-0'>

        </div>
    </div>
  )
}

export default Page2