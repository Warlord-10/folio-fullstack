import React from 'react'

function Page2() {
  return (
    <div className='page-2 bg-black font-[Anta] text-[25rem] overflow-clip'>

        <div className='page page-2-card-1 sticky top-0 font-[Anta] text-[25rem] bg-black p-5'>
          <h1 className='text-center text-transparent bg-clip-text bg-gradient-to-r from-red-900 to-blue-900'>CODE</h1>
        </div>

        <div className='page page-2-card-2 sticky top-0 bg-black justify-center items-center flex'>
          <p className='text-reveal text-center text-white text-[8rem] font-[Anta]'>
            <span>
              Welcome to the future of coding!
              {/* Folio features an intuitive, inbuilt code editor that
              puts the power of programming right at your fingertips. */}
            </span>
          </p>
        </div>

        <div className='h-[150vh] page-2-card-3 flex sticky top-0 border-2 border-white'>
          
        </div>

    </div>
  )
}

export default Page2