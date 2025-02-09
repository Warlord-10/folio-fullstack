// "use client"
import axios from "@/Networking/Axios";
import requests from "@/Networking/Requests";
import Link from 'next/link'
import { cookies } from 'next/headers'
// import React, { useEffect, useState } from 'react'
import SearchBar from './SearchBar';
import { jwtDecode } from "jwt-decode";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { redirect } from "next/navigation";
import LogoutButton from "./LogoutButton";


export default async function Navbar() {
  try {
    const cookieStore = cookies()
    const refreshToken = cookieStore.get("refreshToken")?.value
    const userId = refreshToken != null ? jwtDecode(refreshToken) : null 

    return (
      <div className='sticky backdrop-blur-md top-0 w-full h-14 bg-gray-950/50 flex text-white items-center px-2 p-1 justify-between z-[50]'>

        <Link href="/home" className='font-[Anta] text-[1.5rem] text-transparent bg-clip-text bg-gradient-to-r from-red-900 to-blue-900'>Folio</Link>

        <SearchBar />

        {
          userId != null
            ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="rounded-full h-full">
                  <img alt="profile-pic" src={requests.publicFiles(`${userId.userId}/avatar.jpeg`)} className="rounded-full h-full aspect-square" />
                </DropdownMenuTrigger>

                <DropdownMenuContent className="bg-gray-900 text-gray-400">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href={`/profile/${userId.userId}`} className="w-full">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <LogoutButton />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link className="p-2 bg-gray-900 text-gray-400 rounded-md hover:bg-gray-700 font-semibold" href={"/login"}>Login</Link>
            )
        }


      </div>
    )
  } catch (error) {
    // redirect("/login")
  }
}

