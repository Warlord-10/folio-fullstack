import React from 'react'

function PopUpBox({children, toClose, heading, customStyle}) {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-70 backdrop-blur-sm">
        <div className='w-full max-w-lg bg-gray-900 rounded-lg shadow-lg overflow-hidden border border-purple-500 h-full max-h-[32rem] flex flex-col relative' style={customStyle}>
            <div className='flex justify-between items-center p-4'>
                <h2 className='text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'> {heading} </h2>
                <button onClick={() => {toClose(false)}} className='text-gray-400 hover:text-white transition duration-200'>    
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
            {children}
        </div>
    </div>
  )
}

export default PopUpBox