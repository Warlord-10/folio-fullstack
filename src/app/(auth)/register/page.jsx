"use client"
import Link from 'next/link'
import axios from "@/Networking/Axios";
import requests from '@/Networking/Requests';
import { useRouter } from 'next/navigation'
import { useState, useContext } from 'react';



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

            const response = await axios.post(requests.userSignUp(), dataToSend).then(res => res.data);
            localStorage.setItem("user", JSON.stringify(response.user));

            setApiResponse(
                <div className='text-green-500 text-sm flex justify-center'>
                    {response.message}
                </div>
            );
            
            router.push(`/profile/${response.user._id}`)

        } catch (error) {
            setApiResponse(
                <div className='text-red-500 text-sm flex justify-center'>
                    {error.response.data || "Something went wrong, please try again!"}
                </div>
            )
            setTimeout(() => {
                setApiResponse(null);
            }, 2000);
        }
    };

    return (
        <form action={signUpFunction} className='border-2 border-white rounded-lg flex flex-col p-5 text-2xl space-y-5 bg-slate-950 text-white font-mono w-96'>
            <h1 className='text-3xl font-bold underline decoration-1 pb-1'>Sign Up</h1>

            <div className='flex flex-col'>
                <h1 className='text-base font-thin'>Full Name</h1>
                <input 
                    className='text-black p-2 border-2 rounded-lg text-sm border-black outline-none' 
                    type='text'
                    name='name'
                    placeholder='Name'>
                </input>
            </div>
            <div className='flex flex-col'>
                <h1 className='text-base font-thin'>Email Id</h1>
                <input 
                    className='text-black p-2 border-2 rounded-lg text-sm border-black outline-none' 
                    type='email' 
                    name='email'
                    placeholder='Email'>
                </input>
            </div>            
            <div className='flex flex-col'>
                <h1 className='text-base font-thin'>Password</h1>
                <input 
                    className='text-black p-2 border-2 rounded-lg text-sm border-black outline-none' 
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
    )
}