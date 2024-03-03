import React from 'react'
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useRef } from 'react';
import axios from "../Networking/Axios";
import requests from '../Networking/Requests';
import { login, logout } from '../Redux/UserSlice';
// import { redirect, useNavigate } from 'react-router';

function LoginScreen() {
    const userEmail = useRef(null);
    const userPassword = useRef(null);
    const userFirst = useRef(null);
    const userSecond = useRef(null);

    const [isSignIn, setIsSignIn] = useState(true);
    const dispatch = useDispatch();

    // const navigate = useNavigate();

    const signUpFunction = async (e) => {
        e.preventDefault();
        try {
            // Data to be sent in the request body
            const dataToSend = {
                email: userEmail.current.value,
                firstName: userFirst.current.value,
                lastName: userSecond.current.value,
                password: userPassword.current.value,
            };
            // Make a PUT request using Axios
            const response = await axios.post(requests.userSignUp, dataToSend);
            if(response.status == 200){
                dispatch(login(response.data));
                sessionStorage.setItem("JWT", response.data.accessToken);
                sessionStorage.setItem("USER_ID", response.data.user._id);
                // navigate(`/${response.data.user.firstName}`);
            }
        } catch (error) {
        }
    };

    const signInFunction = async (e) => {
        e.preventDefault();
        try {
            // Data to be sent in the request body
            const dataToSend = {
                email: userEmail.current.value,
                password: userPassword.current.value,
            };
            // Make a PUT request using Axios
            const response = await axios.post(requests.userSignIn, dataToSend);
            if(response.status == 200){
                dispatch(login(response.data));
                sessionStorage.setItem("JWT", response.data.accessToken);
                sessionStorage.setItem("USER_ID", response.data.user._id);
                // navigate(`/${response.data.user._id}`);
            }
        } catch (error) {
        }
    };


  return (
    // bg-gradient-to-br from-purple-950 via-black to-purple-950
    <div className='loginScreen flex justify-center items-center h-screen bg-gradient-to-br from-purple-950 via-black to-purple-950'>
        <form className='border-2 border-white rounded-lg flex flex-col p-5 pl-10 pr-10 text-2xl space-y-5 bg-slate-950 text-white font-mono'>
            <h1 className='text-3xl font-bold underline decoration-1 pb-1'>{isSignIn ?"Sign In" :"Sign Up"}</h1>

            { isSignIn 
            ?null 
            :<>
                <div>
                    <h1 className='text-base font-thin'>First Name</h1>
                    <input className='text-black p-2 border-2 rounded-lg border-black outline-none' type='text' ref={userFirst} placeholder='First name'></input>
                </div>
                <div>
                    <h1 className='text-base font-thin'>Last Name</h1>
                    <input className='text-black p-2 border-2 rounded-lg border-black outline-none' type='text' ref={userSecond} placeholder='Last name'></input>
                </div>
            </>}
            
            <div>
                <h1 className='text-base font-thin'>Email Id</h1>
                <input className='text-black p-2 border-2 rounded-lg border-black outline-none' type='email' ref={userEmail} placeholder='Email'></input>
            </div>            
            <div>
                <h1 className='text-base font-thin'>Password</h1>
                <input className='text-black p-2 border-2 rounded-lg border-black outline-none' type='password' ref={userPassword} placeholder='Password'></input>
            </div>
            <button className='text-white border-white border-2 rounded-md' onClick={ isSignIn? signInFunction :signUpFunction}>{isSignIn ?"Sign In" :"Sign Up"}</button>
            <div className='text-base'>
                <span>Dont have an account? </span><span className='cursor-pointer underline' onClick={()=>{setIsSignIn(false)}}>Sign up now.</span>
            </div>
        </form>
    </div>
  )
}

export default LoginScreen;