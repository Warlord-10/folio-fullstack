"use client"
import React, { useState } from 'react'
import axios from "@/Networking/Axios";
import requests from '@/Networking/Requests';
import Link from 'next/link';

function UserEditLeftSide({ data }) {
    const [isUserEdit, setIsUserEdit] = useState(false);
    const [userData, setUserData] = useState(data);
    console.log(userData)

    const updateUser = async (e) => {
        try {
            const dataToSend = new FormData()
            dataToSend.append("name", e.get("name"))
            dataToSend.append("email", e.get("email"))
            dataToSend.append("about", e.get("about"))
            dataToSend.append("file", e.get("avatar"))
            const response = await axios.patch(requests.getDeleteUpdateUserById(userData._id), dataToSend);
            setUserData(response.data);
            setIsUserEdit(false);
        } catch (error) {
            console.log(error)
        }
    }
    const deleteUser = async (e) => {
        try {
            await axios.delete(requests.getDeleteUserById(null));
            return redirect("/auth/login");
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='flex flex-col p-3 max-w-[400px]'>
            {isUserEdit
                ? <form action={updateUser} className='border-2 border-white text-black rounded-md flex flex-col p-5'>
                    <label>
                        {/* "https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/a/9/4/a940fe649d1d5bb4355b3dc5ccdee540bb7d2929.png" */}
                        <img className='rounded-full object-contain cursor-pointer' src={userData.avatar}
                        />
                        <input type='file' className='hidden' name='avatar'/>
                    </label>
                    <h1 className='text-white text-lg'>Name: </h1>
                    <input
                        className='p-2 rounded-md'
                        name='name'
                        defaultValue={userData.name}
                        type="text"
                    />
                    <h1 className='text-white text-lg mt-2'>Email: </h1>
                    <input
                        className='p-2 rounded-md'
                        name='email'
                        defaultValue={userData.email}
                        type="email"
                    />
                    <h1 className='text-white text-lg mt-2'>About: </h1>
                    <textarea
                        className='p-2 rounded-md'
                        name='about'
                        defaultValue={userData.about}
                        cols={5}
                        rows={5}
                    />

                    <div className='flex justify-between mt-5'>
                        <button
                            className='rounded-md bg-red-500 hover:bg-red-700 p-2'
                            type='button'
                            onClick={() => setIsUserEdit(false)}>
                            Cancel
                        </button>
                        <button
                            className='rounded-md bg-green-500 hover:bg-green-700 p-2'
                            type='submit'>
                            Submit
                        </button>
                    </div>
                </form>

                : <>
                    <img className='rounded-full object-contain'
                        src={userData.avatar}
                    />
                    <h1 className='text-3xl text-left mt-5'>{userData.name}</h1>
                    <h1 className='text-lg text-left text-gray-600'>{userData.email}</h1>
                    <p className='text-base mt-2'>{userData.about}</p>

                    <div className='flex flex-col'>
                        <div className='flex gap-5'>
                            <button
                                className='mt-5 p-2 w-full rounded-md bg-green-500 hover:bg-green-600' onClick={() => setIsUserEdit(true)}>
                                Edit Profile
                            </button>
                            <button
                                className='mt-5 p-2 w-full rounded-md bg-green-500 hover:bg-green-600'>
                                <Link href={`/user/${userData._id}`}>
                                    Portfolio
                                </Link>
                            </button>
                        </div>
                        <button
                            className='mt-5 p-2  w-full rounded-md bg-red-500 hover:bg-red-600'
                            onClick={deleteUser}>
                            Delete Account
                        </button>
                    </div>
                </>
            }
        </div>
    )
}

export default UserEditLeftSide