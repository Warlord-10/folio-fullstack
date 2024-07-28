import React from 'react'

function Page4() {
    return (
        <div className='page-4 font-[Anta]'>

            <div className='grid grid-cols-2 page sticky top-0'>
                <div className='page text-white perspective bg-blue-400 flex flex-col justify-center z-20'>
                    <h1 className='leading-[1] text-[10rem] p-5 bg-violet-950'>YOUR</h1>
                    <div className='glowing-text text-[10rem] p-5'>
                        <span className='hover:text-red-600'>P</span>
                        <span className='hover:text-teal-600'>O</span>
                        <span className='hover:text-yellow-400'>R</span>
                        <span className='hover:text-purple-800'>T</span>
                        <span className='hover:text-pink-900'>F</span>
                        <span className='hover:text-violet-600'>O</span>
                        <span className='text-violet-600'>L</span>
                        <span className='text-violet-600'>I</span>
                        <span className='text-violet-600'>O</span>
                    </div>
                </div>
                <div className='card-holder text-[2rem] bg-blue-800 z-10'>
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

            <div className='page'></div>

        </div>
    )
}

export default Page4