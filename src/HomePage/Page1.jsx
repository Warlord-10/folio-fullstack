import React from 'react'
// import "./homePage.css"
import CodeEditorHomePage from '@/components/CodeEditorHomePage';

function Page1() {
  return (
    <div className='page-1 page flex justify-evenly py-10 bg-black'>
        <div className='mt-10 flex flex-col gap-5'>
          <h1 className='text-[15rem] font-[Anta] leading-[1] text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500'>FOLIO</h1>
          <h1 className='text-white'>Code. Deploy. Portfolio. Simplified.</h1>
          <h1 className='text-[3rem] font-mono text-white'> Where Your Ideas Take Shape</h1>
        </div>
        <CodeEditorHomePage styles={"mt-10 codeEditor"} />
    </div>
  )
}

export default Page1