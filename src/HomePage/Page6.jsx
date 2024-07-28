import React from 'react'

function Page6() {
    return (
        <div className='page page-6 font-[Anta] bg-black overflow-clip p-3'>
            <div className='rounded-md border-2 border-white w-[60%] overflow-hidden'>
                <div className='h-[80px] bg-[#0d0a15] border-b-2 border-white text-white text-[2rem] p-3'>
                    Folio
                </div>

                <div className='flex flex-col bg-[#0d0a15]'>
                    <div className='p-2 flex justify-between gap-x-5 hover:bg-[#120e1daf] cursor-pointer'>
                        <h1 className='items-center flex text-white gap-3'>
                            <img src='/folderIcon.svg' />
                            ...
                        </h1>
                        <div className='flex gap-3'>
                            <img src='/editIcon.svg' />
                            <img src='/trashIcon.svg' />
                        </div>
                    </div>
                    <div className='p-2 flex justify-between gap-x-5 hover:bg-[#120e1daf] cursor-pointer'>
                        <h1 className='items-center flex text-white gap-3'>
                            <img src='/folderIcon.svg' />
                            src
                        </h1>
                        <div className='flex gap-3'>
                            <img src='/editIcon.svg' />
                            <img src='/trashIcon.svg' />
                        </div>
                    </div>
                    <div className='p-2 flex justify-between gap-x-5 hover:bg-[#120e1daf] cursor-pointer'>
                        <h1 className='items-center flex text-white gap-3'>
                            <img src='/folderIcon.svg' />
                            app
                        </h1>
                        <div className='flex gap-3'>
                            <img src='/editIcon.svg' />
                            <img src='/trashIcon.svg' />
                        </div>
                    </div>
                    <div className='p-2 flex justify-between gap-x-5 hover:bg-[#120e1daf] cursor-pointer'>
                        <h1 className='items-center flex text-white gap-3'>
                            <img src='/folderIcon.svg' />
                            public
                        </h1>
                        <div className='flex gap-3'>
                            <img src='/editIcon.svg' />
                            <img src='/trashIcon.svg' />
                        </div>
                    </div>
                    <div className='p-2 flex justify-between gap-x-5 hover:bg-[#120e1daf] cursor-pointer'>
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
    )
}

export default Page6