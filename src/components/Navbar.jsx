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
    <div className='h-[50px] bg-black flex text-white items-center px-2 p-1 justify-between'>
        
        <Link href="/" className='font-[Anta] text-[1.5rem] text-transparent bg-clip-text bg-gradient-to-r from-red-900 to-blue-900'>Folio</Link>

        <SearchBar />

        <div className='h-full flex items-center justify-between gap-2'>

          {sessionData !== null
            ?<>
              <Link 
                className="h-full aspect-square flex items-center justify-center p-1" 
                href={"/profile/" + sessionData._id}
              >
                <img
                  className="h-full aspect-square rounded-full"
                  src={sessionData.avatar ? `${requests.publicFiles() + sessionData.avatar}` : "https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/a/9/4/a940fe649d1d5bb4355b3dc5ccdee540bb7d2929.png"}
                />
              </Link>

              <Link 
                onClick={SignOut}
                className="h-full p-1"
                href={"/auth/login"}
              >
                <svg xmlns="http://www.w3.org/2000/svg" height="h-full" width="h-full" viewBox="0 0 512 512"><path fill="white" d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"/></svg>
              </Link>
            </>

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

