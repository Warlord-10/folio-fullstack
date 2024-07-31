"use client"
import React from 'react'
import { CopyBlock, vs2015} from 'react-code-blocks';

function Page5() {
    const obj = 
`
import React from 'react'
import ReactDOM from 'react-dom/client'
import { renderToString } from 'react-dom/server'
import Home from './Home.jsx'
const rootElement = document.getElementById('userPageRoot')
const rootString = renderToString(<Home />)
rootElement.innerHTML = rootString
const root = ReactDOM.hydrateRoot(rootElement, <Home />)

`;

    return (
        <div className='page page-5 bg-black flex flex-col items-center'>
            {/* <div className='text-white flex justify-between'>
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
            </div> */}

            <div className='text-[4rem] font-semibold font-sans text-center text-white mb-5'>
                <h1>From Code, to Host.</h1>
                <h1 className='text-transparent bg-clip-text bg-gradient-to-r from-red-900 to-blue-900'>Its Simple !!</h1>
                <h1>With just a click</h1>
            </div>
            <div className='capsule flex flex-col'>
                <div className='border-b-2 border-white p-2 flex justify-between bg-white font-mono rounded-sm'>
                    <div className='flex gap-2 py-2'>
                        <div className='bg-red-500 rounded-full h-[10px] aspect-square'></div>
                        <div className='bg-yellow-500 rounded-full h-[10px] aspect-square'></div>
                        <div className='bg-green-500 rounded-full h-[10px] aspect-square'></div>
                    </div>
                    index.jsx
                </div>
                <div className='h-full'>
                    <CopyBlock
                        text={obj}
                        language={"javascript"}
                        showLineNumbers={false}
                        wrapLines
                        theme={vs2015}
                    />
                </div>
            </div>

        </div>
    )
}

export default Page5