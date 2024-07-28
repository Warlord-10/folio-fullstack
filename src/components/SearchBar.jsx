"use client"
import { React, useState } from 'react'
import axios from "@/Networking/Axios";
import requests from "@/Networking/Requests";
import Link from 'next/link';
import "./SearchBar.css"

function SearchBar() {
    const [lastApiCall, setLastApiCall] = useState(Date.now());
    const [searchData, setSearchData] = useState(null)


    const searchUser = async (name) => {
        const now = Date.now();
        const timeSinceLastCall = now - lastApiCall;
        if (timeSinceLastCall < 1000 || !name || name.trim() === '') {
            return;
        }
        setLastApiCall(now);
        const response = await axios.get(requests.getSearchUser(name));
        setSearchData(response.data);
    }

    return (
        <div className='flex flex-col relative'>
            <div className='flex rounded-md overflow-hidden'>
                <input 
                    className='search-bar p-1 px-3 text-black font-[Anta] w-full outline-none'
                    type='text'
                    name='search'
                    placeholder='Search'
                    autoComplete='off'
                    onChange={(e)=> searchUser(e.target.value)}
                    // onBlur={() => setSearchData(null)}
                >
                </input>  
                <button 
                    className='text-gray-500 bg-white px-3 p-1 hover:bg-slate-300'
                    onClick={() => setSearchData(null)}>
                    X
                </button>  
            </div>
            {searchData && 
                <div className="search-list backdrop-blur-md top-full absolute flex flex-col w-full rounded-md p-2 mt-2 border-2 border-blue-500 gap-y-2 max-h-[300px] overflow-y-scroll">
                    {searchData.map((user) => (
                        <Link href={`/profile/${user._id}`} key={user._id} className='flex justify-between items-center hover:underline'>
                            <span className='text-md'>{user.name}</span>
                            <span className='text-xs'>{user._id}</span>
                        </Link> 
                    ))}
                </div> 
            }
        </div>
    )
}

export default SearchBar