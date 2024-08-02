import SearchBar from '@/components/SearchBar'
import Link from 'next/link'
import React from 'react'

function Page7() {
  return (
    <div className='min-h-[100vh] page-7 bg-black p-5 flex gap-5'>


      <div className='w-full rounded-md text-white text-[3rem] font-mono text-left p-10 flex flex-col gap-8'>
        <div>
          <h1 className=''>Join the Community, </h1>
          <h1 className=''>Unleash your <span className='text-transparent bg-clip-text bg-gradient-to-r from-red-900 to-blue-900 font-extrabold'>Creativity</span></h1>
        </div>

        <div className='text-[1.2rem] flex items-center gap-6'>
          <div className='relative group'>
            <div className='absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt'></div>
            <Link href={'/auth/login'} className='relative px-7 py-4 bg-black rounded-lg leading-none flex items-center divide-x divide-gray-600'>
              <span className='flex items-center space-x-5'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-600 -rotate-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className='pr-6 text-gray-100'>Sign In</span>
              </span>
              <span className='pl-6 text-indigo-400 group-hover:text-gray-100 transition duration-200'>Access Your Account &rarr;</span>
            </Link>
          </div>

          <div className='relative group'>
            <div className='absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt'></div>
            <Link href={'/auth/register'} className='relative px-7 py-4 bg-black rounded-lg leading-none flex items-center divide-x divide-gray-600'>
              <span className='flex items-center space-x-5'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 -rotate-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                <span className='pr-6 text-gray-100'>Sign Up</span>
              </span>
              <span className='pl-6 text-emerald-400 group-hover:text-gray-100 transition duration-200'>Create New Account &rarr;</span>
            </Link>
          </div>
        </div>

        <SearchBar />
      </div>


      <div className='relative w-[80%]'>
        <div className='absolute left-8 top-4 rounded-2xl text-white border-2 border-red-200 bg-gray-800 flex flex-col overflow-hidden items-center w-[400px]'>
          <img src='https://mycodelesswebsite.com/wp-content/uploads/2021/11/image-178.jpg' className='page-7-folio-cards object-cover w-full rounded-t-xl h-48'/>
          <img src='https://cdn.stackoverflow.co/images/jo7n4k8s/production/4ad62b6e76479a475c0d090f183c2e70a144eeeb-1920x1080.png?auto=format' className=' page-7-folio-cards object-cover w-full rounded-t-xl h-48'/>
          <img src='https://c4.wallpaperflare.com/wallpaper/725/218/339/sci-fi-lights-dark-theme-the-downbelow-wallpaper-preview.jpg' className='page-7-folio-cards object-cover w-full rounded-t-xl h-48'/>
        </div>

        <div className='absolute left-24 top-12 rounded-2xl text-white border-2 border-red-200 bg-gray-800 flex flex-col overflow-hidden items-center w-[400px]'> 
          <img src='https://mycodelesswebsite.com/wp-content/uploads/2021/11/image-178.jpg' className='page-7-folio-cards object-cover w-full rounded-t-xl h-48'/>
          <img src='https://cdn.stackoverflow.co/images/jo7n4k8s/production/4ad62b6e76479a475c0d090f183c2e70a144eeeb-1920x1080.png?auto=format' className=' page-7-folio-cards object-cover w-full rounded-t-xl h-48'/>
          <img src='https://c4.wallpaperflare.com/wallpaper/725/218/339/sci-fi-lights-dark-theme-the-downbelow-wallpaper-preview.jpg' className='page-7-folio-cards object-cover w-full rounded-t-xl h-48'/>
        </div>

        <div className='absolute left-40 top-20 rounded-2xl text-white border-2 border-red-200 bg-gray-800  flex flex-col overflow-hidden items-center w-[400px]'>
          <img src='https://mycodelesswebsite.com/wp-content/uploads/2021/11/image-178.jpg' className='page-7-folio-cards object-cover w-full rounded-t-xl h-48'/>
          <img src='https://cdn.stackoverflow.co/images/jo7n4k8s/production/4ad62b6e76479a475c0d090f183c2e70a144eeeb-1920x1080.png?auto=format' className=' page-7-folio-cards object-cover w-full rounded-t-xl h-48'/>
          <img src='https://c4.wallpaperflare.com/wallpaper/725/218/339/sci-fi-lights-dark-theme-the-downbelow-wallpaper-preview.jpg' className='page-7-folio-cards object-cover w-full rounded-t-xl h-48'/>
        </div>
      </div>


    </div>
  )
}

export default Page7