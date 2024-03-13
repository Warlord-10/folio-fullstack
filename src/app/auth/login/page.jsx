"use client"
import Link from 'next/link'
import axios from "@/Networking/Axios";
import requests from '@/Networking/Requests';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';


export default function Page() {
    const router = useRouter();
    const [apiResponse, setApiResponse] = useState(null);

    const signInFunction = async (e) => {
        try {
            const dataToSend = {
                email: e.get("email"),
                password: e.get("password")
            }
            const response = await axios.post(requests.userSignIn(), dataToSend);
            setApiResponse(
                <div className='text-green-500 text-sm flex justify-center'>
                    Login Successful
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

    
    useEffect(()=>{
        async function autoSignIn(){
            try {
                const response = await axios.get(requests.getDeleteUpdateUserById(null))
                router.push(`/profile/${response.data._id}`)
            } catch (error) {
                
            }
        }
        // autoSignIn();
    }, [])

    return (
        // bg-gradient-to-br from-purple-950 via-black to-purple-950
        <div className='loginScreen flex justify-center items-center h-screen bg-gradient-to-br from-purple-950 via-black to-purple-950'>
            <form action={signInFunction} className='border-2 border-white rounded-lg flex flex-col p-5 pl-10 pr-10 text-2xl space-y-5 bg-slate-950 text-white font-mono'>
                <h1 className='text-3xl font-bold underline decoration-1 pb-1'>Sign In</h1>
    
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
                <button className='text-white border-white border-2 rounded-md hover:border-4'>
                    Sign In
                </button>
                <div className='text-base'>
                    <span>Dont have an account? </span>
                    <Link 
                        className='cursor-pointer underline' 
                        href="./register">
                            Sign up now.
                    </Link>
                </div>
            </form>
        </div>
    )
    
}