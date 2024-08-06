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

        <div className='page page-2-card-3 flex sticky top-0'></div>

        <div className='cloud-transition page page-2-card-4 text-[20rem] sticky top-0 bg-black w-screen flex flex-col justify-center'>
          <h1 className='text-center text-white w-max'>Unleash your 
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#8B0000] to-[#000080] font-extrabold'> Creativity</span>
          </h1>
        </div>

        <div className='page-2-card-5 h-[200vh] flex sticky top-0'></div>
    </div>
  )
}

export default Page2