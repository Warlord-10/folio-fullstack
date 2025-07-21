"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import useAuthStore from '@/Stores/authStore';

export default function Page() {
    const router = useRouter();
    const [apiResponse, setApiResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const loginFunction = useAuthStore((s) => s.login);

    const validateInputs = (email, password) => {
        if (!email || !password) {
            throw new Error("Email and password are required");
        }
        if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            throw new Error("Please enter a valid email address");
        }
        // if (password.length < 6) {
        //     throw new Error("Password must be at least 6 characters long");
        // }
    };

    const signInFunction = async (e) => {
        setIsLoading(true);
        try {
            const email = e.get("email")?.trim();
            const password = e.get("password")?.trim();

            validateInputs(email, password);

            const dataToSend = { email, password };
            
            const response = await loginFunction(dataToSend);

            setApiResponse(
                <div className='text-green-500 text-sm flex justify-center'>
                    {response.message || "Successfully signed in!"}
                </div>
            );
            
            router.push(`/profile/${response.user._id}`);
            
        } catch (error) {
            const errorMessage = error.response?.data?.error || "Something went wrong, please try again!";
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
        <form action={signInFunction} className='border-2 border-white rounded-lg flex flex-col p-5 text-2xl space-y-5 bg-slate-950 text-white font-mono w-96'>
            <h1 className='text-3xl font-bold underline decoration-1 pb-1'>Sign In</h1>

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
                    autoComplete="current-password"
                />
            </div>
            {apiResponse}
            <button 
                type="submit"
                disabled={isLoading}
                className={`text-white border-white border-2 rounded-md hover:border-4 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
            <div className='text-base'>
                <span>Don't have an account? </span>
                <Link 
                    className='cursor-pointer underline' 
                    href="./register">
                        Sign up now.
                </Link>
            </div>
        </form>
    )
}