import Link from 'next/link'
import React from 'react'
import { redirect } from 'next/navigation'
import { deleteCookie } from 'cookies-next'

export default function Navbar({isLogged=false}) {

  const SignOut = async ()=>{
    deleteCookie("accessToken")
    deleteCookie("refreshToken")
  }

  return (
    <div className='h-[50px] bg-black flex text-white items-center p-5 justify-between'>
        <Link href="/" className='font-[Anta] text-[1.5rem] text-transparent bg-clip-text bg-gradient-to-r from-red-900 to-blue-900'>Folio</Link>

        {isLogged
          ?<button 
            onClick={SignOut} 
            className='font-[Anta] text-[1.5rem] text-transparent bg-clip-text bg-gradient-to-r from-red-900 to-blue-900'>
              Sign Out
          </button>
          :<Link 
            href="/auth/login" 
            className='font-[Anta] text-[1.5rem] text-transparent bg-clip-text bg-gradient-to-r from-red-900 to-blue-900'>
              Login
          </Link>
        }
    </div> 
  )
}

