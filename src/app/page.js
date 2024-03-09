import React from 'react'
import "./homePage.css"
import CodeEditorHomePage from '@/components/CodeEditorHomePage';
import Link from 'next/link';


export default function Home() {
  return (
    <div className=''>
      <div className='page page-1 flex justify-evenly py-10 bg-black'>
        <div className='mt-10 flex flex-col gap-5'>
          <h1 className='text-[15rem] font-[Anta] leading-[1] text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500'>FOLIO</h1>
          <h1 className='text-[3rem] font-mono text-white'> Where Your Ideas Take Shape</h1>
        </div>
        <CodeEditorHomePage styles={"mt-10 codeEditor"} />
      </div>



      <div className='page-2 bg-black font-[Anta] text-[25rem] overflow-clip'>
        <div className='page-2-card-1 sticky top-0 font-[Anta] text-[25rem] bg-black p-5'>
          <h1 className='text-center text-transparent bg-clip-text bg-gradient-to-r from-red-900 to-blue-900'>CODE</h1>
        </div>

        <div className='page-2-card-2 backdrop-blur-xl h-[100vh] p-5 flex justify-end sticky top-0'>
          <div className='text-reveal border-2 border-white rounded-lg text-white flex flex-col text-[1.5rem] gap-1 p-5'>
            <p>
              <span>
                {"// Welcome to Folio! "}<br></br>
                {"// Built with passion and innovation. "}<br></br>
                {"function greetUser(name) { "} <br></br>
                {"return `Hello, ${name}! Welcome to Folio. Let's innovate!`;"} <br></br>
                {"}"} <br></br>
                {'const userName = "New User"; '}<br></br>
                {'console.log(greetUser(userName)); '}<br></br>
              </span>
            </p>
          </div>
        </div>
        <div className='p-5 sticky top-[100px] max-w-[40%] h-[100vh] bg-black'>
          <p className='slide-up-panel text-center text-transparent bg-clip-text bg-gradient-to-r from-red-900 to-blue-900 text-[3rem]'>
            Welcome to the future of coding!
            Folio features an intuitive, inbuilt code editor that
            puts the power of programming right at your fingertips.
          </p>
        </div>

      </div>


      <div className='page page-3 p-5 font-[Anta] text-[25rem] bg-black overflow-clip'>
        <h1 className='text-center text-transparent bg-clip-text bg-gradient-to-r from-red-900 to-blue-900'>CREATE</h1>
      </div>


      <div className='page-4 font-[Anta] bg-black flex flex-col overflow-clip'>
        <div className='flex flex-row'>
          <div className='relative text-white perspective'>
            <div className='glowing-text text-[10rem] p-5'>
              <span className='hover:text-red-600'>D</span>
              <span className='hover:text-teal-600'>E</span>
              <span className='hover:text-yellow-400'>S</span>
              <span className='hover:text-purple-800'>I</span>
              <span className='hover:text-pink-900'>G</span>
              <span className='hover:text-violet-600'>N</span>
            </div>
            <h1 className='leading-[1] text-[10rem] p-5 bg-violet-950'>YOUR</h1>
            <h1 className='hanging-text text-[10rem] p-5'>PORTFOLIO</h1>
          </div>


          <div className='card-holder text-[2rem] text-white top-10'>
            <div className='inner-card flex flex-col gap-3'>
              <h1 className='p-3'>Portfolio</h1>
              <img src='https://i.pinimg.com/736x/e4/e0/d1/e4e0d1639ac7e36f52c9f6e0c2ac3b3d.jpg' />
            </div>
            <div className='inner-card flex flex-col gap-3'>
              <h1 className='p-3'>Projects</h1>
              <img src='https://blog.hubspot.com/hubfs/Google%20Drive%20Integration/dark%20website%20themes_22023-Mar-21-2023-01-31-00-1346-PM.jpeg' />
            </div>
          </div>
        </div>

        <div className='text-white flex p-5 justify-between m-10'>
          <div className='text-[1.5rem] font-mono gap-2 flex flex-col max-w-[45%]'>
            <h1 className='font-[Anta]'>
              You <span className='text-[2.5rem] text-transparent bg-clip-text bg-gradient-to-r from-red-900 to-blue-900'>CODE</span>, we <span className='text-[2.5rem] text-transparent bg-clip-text bg-gradient-to-r from-red-900 to-blue-900'>HOST</span>
            </h1>
            <h1>Creating a portfolio is just like creating a mini React App.</h1>
            <h1>Create a project, and set it as default Portfolio in the settings.</h1>
            <h1>
              Inside the project create an <span className='bg-gray-800 px-2 rounded-md'>index.jsx</span> file.
            </h1>
            <h1>This <span className='bg-gray-800 px-2 rounded-md'>index.jsx</span> file will serve as the entry point of the portfolio.</h1>
            <h1>Add the following code in the <span className='bg-gray-800 px-2 rounded-md'>index.jsx</span> file and import the component which needs to be rendered.</h1>
            <h1>After finishing the setup, transpile the project.</h1>
          </div>

          <div className='text-[1.2rem] border-white border-2 rounded-md bg-[#0d0a15] h-auto font-mono'>
            <div className='border-b-2 border-white p-2'>
              <div className='flex gap-2 py-2'>
                <div className='bg-red-500 rounded-full h-[10px] aspect-square'></div>
                <div className='bg-yellow-500 rounded-full h-[10px] aspect-square'></div>
                <div className='bg-green-500 rounded-full h-[10px] aspect-square'></div>
              </div>
              index.jsx:
            </div>

            <div className='p-4'>
              <h1>
                <span className='text-red-500'>import</span> React from <span className='text-yellow-500'>{`'react'`}</span>
              </h1>
              <h1>
                <span className='text-red-500'>import</span> ReactDOM from <span className='text-yellow-500'>{`'react-dom/client'`}</span>
              </h1>
              <h1>
                <span className='text-red-500'>import</span> {`{ renderToString }`} from <span className='text-yellow-500'>{`'react-dom/server'`}</span>
              </h1>
              <h1>
                <span className='text-red-500'>import</span> Home from <span className='text-yellow-500'>{`'./Home.jsx'`}</span>
              </h1>
              <h1>
                <span className='text-cyan-500'>const</span> rootElement = <span className='text-blue-500'>document</span>.<span className='text-green-500'>getElementById</span><span className='text-yellow-500'>{`('userPageRoot')`}</span>
              </h1>
              <h1>
                <span className='text-cyan-500'>const</span> rootString = <span className='text-green-500'>renderToString</span>{`(<Home />)`}
              </h1>
              <h1>
                <span className='text-blue-500'>rootElement</span>.innerHTML = rootString
              </h1>
              <h1>
                <span className='text-cyan-500'>const</span> root = <span className='text-blue-500'>ReactDOM</span>.<span className='text-green-500'>hydrateRoot</span>{`(rootElement, <Home />)`}
              </h1>
            </div>
          </div>
        </div>

      </div>



      <div className='page page-5 sticky top-0 font-[Anta] bg-black overflow-clip p-3'>
        <div className='rounded-md border-2 border-white w-[60%] overflow-hidden'>
          <div className='h-[80px] bg-[#0d0a15] border-b-2 border-white text-white text-[2rem] p-3'>
            Folio
          </div>

          <div className='flex flex-col bg-[#0d0a15]'>
            <div className='p-2 flex justify-between gap-x-5 hover:bg-[#120e1daf]'>
              <h1 className='items-center flex text-white gap-3'>
                <img src='/folderIcon.svg' />
                ...
              </h1>
              <div className='flex gap-3'>
                <img src='/editIcon.svg' />
                <img src='/trashIcon.svg' />
              </div>
            </div>
            <div className='p-2 flex justify-between gap-x-5 hover:bg-[#120e1daf]'>
              <h1 className='items-center flex text-white gap-3'>
                <img src='/folderIcon.svg' />
                src
              </h1>
              <div className='flex gap-3'>
                <img src='/editIcon.svg' />
                <img src='/trashIcon.svg' />
              </div>
            </div>
            <div className='p-2 flex justify-between gap-x-5 hover:bg-[#120e1daf]'>
              <h1 className='items-center flex text-white gap-3'>
                <img src='/folderIcon.svg' />
                app
              </h1>
              <div className='flex gap-3'>
                <img src='/editIcon.svg' />
                <img src='/trashIcon.svg' />
              </div>
            </div>
            <div className='p-2 flex justify-between gap-x-5 hover:bg-[#120e1daf]'>
              <h1 className='items-center flex text-white gap-3'>
                <img src='/folderIcon.svg' />
                public
              </h1>
              <div className='flex gap-3'>
                <img src='/editIcon.svg' />
                <img src='/trashIcon.svg' />
              </div>
            </div>
            <div className='p-2 flex justify-between gap-x-5 hover:bg-[#120e1daf]'>
              <h1 className='items-center flex text-white gap-3'>
                <img src='/folderIcon.svg' />
                components
              </h1>
              <div className='flex gap-3'>
                <img src='/editIcon.svg' />
                <img src='/trashIcon.svg' />
              </div>
            </div>
          </div>
        </div>

        <div className='text-[8rem] text-white p-5 absolute right-0 top-0 backdrop-blur-md leading-[1]'>
          <h1 className=''>MANAGE</h1>
          <h1 className=''>YOUR</h1>
          <h1>PROJECTS</h1>
        </div>
      </div>
    </div>
  );
}
