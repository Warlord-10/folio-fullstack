import React from 'react'
import CodeEditorHomePage from '@/components/CodeEditorHomePage'

function Page1() {
  return (
    <div className='page-1 page flex flex-col lg:flex-row justify-evenly items-center py-10 bg-black min-h-screen'>

      <div className='relative mt-10 flex flex-col gap-5 animate-fadeIn'>
        <h1 className='text-[10rem] lg:text-[15rem] font-[Anta] leading-none text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 glow-effect'>
          FOLIO
        </h1>
        <h1 className='text-[1rem] lg:text-[2rem] font-mono text-white typewriter w-max'>
          Where Your Ideas Take Shape
        </h1>
      </div>

      <div className='animate-fadeIn'>
        <CodeEditorHomePage styles="codeEditor floating" />
      </div>
    </div>
  )
}

export default Page1