"use client"
import Link from 'next/link'
import axios from "@/Networking/Axios";
import requests from '@/Networking/Requests';
import { useRouter } from 'next/navigation'
import { useState } from 'react';

export default function Page() {
    const router = useRouter();
    const [apiResponse, setApiResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const validateInputs = (name, email, password) => {
        if (!name || !email || !password) {
            throw new Error("All fields are required");
        }
        if (name.trim().length < 2) {
            throw new Error("Name must be at least 2 characters long");
        }
        if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            throw new Error("Please enter a valid email address");
        }
        // if (password.length < 6) {
        //     throw new Error("Password must be at least 6 characters long");
        // }
    };

    const signUpFunction = async (e) => {
        setIsLoading(true);
        try {
            const name = e.get("name")?.trim();
            const email = e.get("email")?.trim();
            const password = e.get("password")?.trim();

            validateInputs(name, email, password);

            const dataToSend = { name, email, password };

            const response = await axios.post(requests.userSignUp(), dataToSend).then(res => res.data);
            
            if (!response) {
                throw new Error("Invalid response from server");
            }

            setApiResponse(
                <div className='text-green-500 text-sm flex justify-center'>
                    {response.message || "Successfully registered!"}
                </div>
            );
            
            router.push(`/profile/${response.user_id}`)

        } catch (error) {
            const errorMessage = error.response?.data || error.message || "Something went wrong, please try again!";
            setApiResponse(
                <div className='text-red-500 text-sm flex justify-center'>
                    {errorMessage}
                </div>
            );
            setTimeout(() => {
                setApiResponse(null);
            }, 3000);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form action={signUpFunction} className='border-2 border-white rounded-lg flex flex-col p-5 text-2xl space-y-5 bg-slate-950 text-white font-mono w-96'>
            <h1 className='text-3xl font-bold underline decoration-1 pb-1'>Sign Up</h1>

            <div className='flex flex-col'>
                <label htmlFor="name" className='text-base font-thin'>Full Name</label>
                <input 
                    id="name"
                    className='text-black p-2 border-2 rounded-lg text-sm border-black outline-none' 
                    type='text'
                    name='name'
                    placeholder='Name'
                    required
                    disabled={isLoading}
                    autoComplete="name"
                />
            </div>
            <div className='flex flex-col'>
                <label htmlFor="email" className='text-base font-thin'>Email Id</label>
                <input 
                    id="email"
                    className='text-black p-2 border-2 rounded-lg text-sm border-black outline-none' 
                    type='email' 
                    name='email'
                    placeholder='Email'
                    required
                    disabled={isLoading}
                    autoComplete="email"
                />
            </div>            
            <div className='flex flex-col'>
                <label htmlFor="password" className='text-base font-thin'>Password</label>
                <input 
                    id="password"
                    className='text-black p-2 border-2 rounded-lg text-sm border-black outline-none' 
                    type='password'  
                    name='password'
                    placeholder='Password'
                    required
                    disabled={isLoading}
                    autoComplete="new-password"
                />
            </div>
            {apiResponse}
            <button 
                type="submit"
                disabled={isLoading}
                className={`text-white border-white border-2 rounded-md hover:border-4 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            > 
                {isLoading ? 'Signing Up...' : 'Sign Up'}
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