import React from 'react'

function Page6() {
    return (
        <div className='page page-6 font-mono bg-black overflow-clip p-10 flex justify-between items-center flex-col'>

            <h1 className='leading-[1] text-[4rem] text-white'>Managing Files Is</h1>

            <div className='relative items-center flex flex-col h-full mt-3'>
                <div className='page-6-text-content text-[4rem] text-white text-center w-[50%]'>
                    <h1 className='leading-[1] text-transparent bg-clip-text bg-gradient-to-r from-red-900 to-blue-900'>Now Easier</h1>
                    <p className='text-[1.2rem]'>
                        Effortlessly capture, organize, and safeguard your code with the seamless file storage solution. Instantly upload, access, and share your projects anytime, anywhere.
                    </p>
                </div>

                <div className='page-6-file-manager min-w-96 rounded-md border-2 border-white w-[60%] overflow-hidden bg-[#0d0a15]'>
                    <h1 className='border-b-2 border-white text-white text-[2rem] p-3 '>
                        Folio
                    </h1>

                    <div className='flex flex-col page-6-file-manager-content h-[256px]'>
                        <div className='p-2 flex justify-between gap-x-5 hover:bg-[#120e1daf] cursor-pointer items-center'>
                            <h1 className='items-center flex text-white gap-3'>
                                <img src='/folderIcon.svg' />
                                ...
                            </h1>
                            <div className='flex gap-3'>
                                <img src='/editIcon.svg' className='h-[20px] aspect-square'/>
                                <img src='/trashIcon.svg' className='h-[20px] aspect-square'/>
                            </div>
                        </div>
                        <div className='p-2 flex justify-between gap-x-5 hover:bg-[#120e1daf] cursor-pointer items-center'>
                            <h1 className='items-center flex text-white gap-3'>
                                <img src='/folderIcon.svg' />
                                src
                            </h1>
                            <div className='flex gap-3'>
                                <img src='/editIcon.svg' className='h-[20px] aspect-square'/>
                                <img src='/trashIcon.svg' className='h-[20px] aspect-square'/>
                            </div>
                        </div>
                        <div className='p-2 flex justify-between gap-x-5 hover:bg-[#120e1daf] cursor-pointer items-center'>
                            <h1 className='items-center flex text-white gap-3'>
                                <img src='/folderIcon.svg' />
                                app
                            </h1>
                            <div className='flex gap-3'>
                                <img src='/editIcon.svg' className='h-[20px] aspect-square'/>
                                <img src='/trashIcon.svg' className='h-[20px] aspect-square'/>
                            </div>
                        </div>
                        <div className='p-2 flex justify-between gap-x-5 hover:bg-[#120e1daf] cursor-pointer items-center'>
                            <h1 className='items-center flex text-white gap-3'>
                                <img src='/folderIcon.svg' />
                                public
                            </h1>
                            <div className='flex gap-3'>
                                <img src='/editIcon.svg' className='h-[20px] aspect-square'/>
                                <img src='/trashIcon.svg' className='h-[20px] aspect-square'/>
                            </div>
                        </div>
                        <div className='p-2 flex justify-between gap-x-5 hover:bg-[#120e1daf] cursor-pointer items-center'>
                            <h1 className='items-center flex text-white gap-3'>
                                <img src='/folderIcon.svg' />
                                components
                            </h1>
                            <div className='flex gap-3'>
                                <img src='/editIcon.svg' className='h-[20px] aspect-square'/>
                                <img src='/trashIcon.svg' className='h-[20px] aspect-square'/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Page6