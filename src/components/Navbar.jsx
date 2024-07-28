"use client"
import axios from "@/Networking/Axios";
import requests from "@/Networking/Requests";
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import SearchBar from './SearchBar';



export default function Navbar() {
  const [sessionData, setSessionData] = useState(null);

  const GetSession = async ()=>{
    try {
      const response = await axios.get(requests.getSession());
      setSessionData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const SignOut = async ()=>{
    try {
      const response = await axios.get(requests.userSignOut());
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    GetSession();
  }, [])


  return (
    <div className='h-[50px] bg-black flex text-white items-center p-5 justify-between'>
        <Link href="/" className='font-[Anta] text-[1.5rem] text-transparent bg-clip-text bg-gradient-to-r from-red-900 to-blue-900'>Folio</Link>

        <div className='flex items-center justify-between gap-5'>
          <SearchBar />

          {sessionData !== null
            ?<Link 
              href={`/`}
              className='rounded-full h-full'
              onClick={()=>{SignOut()}}> LOGOUT
            </Link>
            :<Link 
              href="/auth/login" 
              className='font-[Anta] text-[1.5rem] text-transparent bg-clip-text bg-gradient-to-r from-red-900 to-blue-900'>
                Login
            </Link>
          }
        </div>
    </div> 
  )
}

