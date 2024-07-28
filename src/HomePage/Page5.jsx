import React from 'react'

function Page5() {
    return (
        <div className='page page-5 bg-black'>
            <div className='text-white flex justify-between'>
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
    )
}

export default Page5