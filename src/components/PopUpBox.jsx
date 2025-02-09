import React from 'react'

function PopUpBox({ isOpen, onClose, title, onConfirm, children, confirmTitle, customStyle, tailwindcss }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-70 backdrop-blur-sm">
      <form 
        className={`flex flex-col space-y-4 w-full max-w-lg bg-gray-900 rounded-lg shadow-lg overflow-hidden border border-purple-500 relative p-4 ${tailwindcss}`} 
        style={customStyle}
        onSubmit={onConfirm}
      >

        <div className='flex justify-between items-center mb-2 flex-none'>
          <h2 className='text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'> {title} </h2>
          <button onClick={onClose} className='text-gray-400 hover:text-white transition duration-200' type='button'>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        {children}

        <button
          className="w-full px-4 py-2 text-white font-semibold bg-gradient-to-r from-purple-500 to-pink-600 rounded-md hover:from-purple-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 transition duration-200"
          type='submit'
        >
          {confirmTitle}
        </button>

      </form>
    </div>
  )
}

export default PopUpBox