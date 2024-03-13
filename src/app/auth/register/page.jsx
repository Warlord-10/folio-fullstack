"use client"
import Link from 'next/link'
import axios from "@/Networking/Axios";
import requests from '@/Networking/Requests';
import { useRouter } from 'next/navigation'
import { useState } from 'react';
import { setCookie } from 'cookies-next';



export default function Page() {
    const router = useRouter();
    const [apiResponse, setApiResponse] = useState(null);

    const signUpFunction = async (e) => {
        try {
            const dataToSend = {
                name: e.get("name"),
                email: e.get("email"),
                password: e.get("password")
            }
            // Make a PUT request using Axios
            const response = await axios.post(requests.userSignUp(), dataToSend);
            setApiResponse(
                <div className='text-green-500 text-sm flex justify-center'>
                    Sign Up Successful
                </div>
            );
            router.push(`/profile/${response.data._id}`)
        } catch (error) {
            setApiResponse(
                <div className='text-red-500 text-sm flex justify-center'>
                    {error.response.data}
                </div>
            )
            setTimeout(() => {
                setApiResponse(null);
            }, 2000);
        }
    };

    return (
        // bg-gradient-to-br from-purple-950 via-black to-purple-950
        <div className='registerScreen flex justify-center items-center h-screen bg-gradient-to-br from-purple-950 via-black to-purple-950'>
            <form action={signUpFunction} className='border-2 border-white rounded-lg flex flex-col p-5 pl-10 pr-10 text-2xl space-y-5 bg-slate-950 text-white font-mono'>
                <h1 className='text-3xl font-bold underline decoration-1 pb-1'>Sign Up</h1>
    
                <div>
                    <h1 className='text-base font-thin'>Full Name</h1>
                    <input 
                        className='text-black p-2 border-2 rounded-lg border-black outline-none' 
                        type='text'
                        name='name'
                        placeholder='Name'>
                    </input>
                </div>
                <div>
                    <h1 className='text-base font-thin'>Email Id</h1>
                    <input 
                        className='text-black p-2 border-2 rounded-lg border-black outline-none' 
                        type='email' 
                        name='email'
                        placeholder='Email'>
                    </input>
                </div>            
                <div>
                    <h1 className='text-base font-thin'>Password</h1>
                    <input 
                        className='text-black p-2 border-2 rounded-lg border-black outline-none' 
                        type='password'  
                        name='password'
                        placeholder='Password'>
                    </input>
                </div>
                {apiResponse}
                <button className='text-white border-white border-2 rounded-md'> 
                    Sign Up
                </button>
                <div className='text-base'>
                    <span>Have an account? </span>
                    <Link 
                        className='cursor-pointer underline' 
                        href="./login">
                            Sign In.
                    </Link>
                </div>
            </form>
        </div>
    )
}