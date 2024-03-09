"use client"
import React, { useState } from 'react'
import axios from "@/Networking/Axios";
import requests from '@/Networking/Requests';
import Link from 'next/link';

function UserEditLeftSide({ data, permission }) {
    const [isUserEdit, setIsUserEdit] = useState(false);
    const [userData, setUserData] = useState(data);
    const [defaultPage, setDefaultPage] = useState(data.userPageProject);
    const [res, setRes] = useState(null);
    const [compilerRes, setCompilerRes] = useState(null);

    const transpileProject = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.get(requests.transpileProject(userData._id))
            setCompilerRes(<h1 className='text-green-500'>Compiled Successfully</h1>)
        } catch (error) {
            setCompilerRes(<h1 className='text-red-500'>Error Occured</h1>)
        } finally {
            setTimeout(() => {
                setCompilerRes(null);
            }, 2000);
        }
    }

    const updateUser = async (e) => {
        try {
            const dataToSend = new FormData()
            dataToSend.append("name", e.get("name"))
            dataToSend.append("email", e.get("email"))
            dataToSend.append("about", e.get("about"))
            dataToSend.append("file", e.get("avatar"))
            dataToSend.append("userPageProject", defaultPage ? defaultPage : null)
            const response = await axios.patch(requests.getDeleteUpdateUserById(userData._id), dataToSend);

            setRes(<h1 className='text-green-500'>Updated Successfully</h1>)
            setUserData(response.data);
            setDefaultPage(response.data.userPageProject);
        } catch (error) {
            setRes(<h1 className='text-red-500'>Error Occured</h1>)
        } finally {
            setTimeout(() => {
                setRes(null);
                setIsUserEdit(false);
            }, 2000);
        }
    }
    const deleteUser = async (e) => {
        try {
            await axios.delete(requests.getDeleteUpdateUserById(userData._id));
            return redirect("/auth/login");
        } catch (error) {
        }
    }
    return (
        <div className='flex flex-col p-3 max-w-[400px]'>
            {isUserEdit
                ? <form action={updateUser} className='border-2 border-white rounded-md flex flex-col p-5 gap-3'>
                    <label className='max-w-[400px] rounded-full overflow-hidden border-2 border-gray-600 aspect-square flex justify-center items-center'>
                        <img
                            className=''
                            src={userData.avatar ? `${requests.publicFiles() + userData.avatar}` : "https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/a/9/4/a940fe649d1d5bb4355b3dc5ccdee540bb7d2929.png"}
                        />
                        <input
                            type='file'
                            className='hidden'
                            name='avatar'
                            accept="image/*"
                        />
                    </label>
                    <label className='text-lg flex flex-col text-white'>Name:
                        <input
                            className='p-2 rounded-md text-black'
                            name='name'
                            defaultValue={userData.name}
                            type="text"
                        />
                    </label>
                    <label className='text-lg flex flex-col text-white'>Email:
                        <input
                            className='p-2 rounded-md text-black'
                            name='email'
                            defaultValue={userData.email}
                            type="email"
                        />
                    </label>
                    <label className='text-lg flex flex-col text-white'>About:
                        <textarea
                            className='p-2 rounded-md text-black'
                            name='about'
                            defaultValue={userData.about}
                            cols={5}
                            rows={5}
                        />
                    </label>
                    <label className='text-lg text-white'>Default portfolio
                        <div className='flex flex-col gap-1'>
                            {userData.projects.map((p) => (
                                <button
                                    type='button'
                                    key={p._id}
                                    onClick={() => setDefaultPage(defaultPage === p._id ? null : p._id)}
                                    className={`rounded-md border-2 border-grey-500 p-1 ${p._id === defaultPage && "bg-green-500"}`}>{p.title}
                                </button>
                            ))}
                        </div>
                    </label>

                    {res}

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
                    <div className='max-w-[400px] rounded-full overflow-hidden border-2 border-gray-600 aspect-square flex justify-center items-center'>
                        <img
                            className=''
                            src={userData.avatar ? `${requests.publicFiles() + userData.avatar}` : "https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/a/9/4/a940fe649d1d5bb4355b3dc5ccdee540bb7d2929.png"}
                        />
                    </div>
                    <h1 className='text-3xl text-left mt-5'>{userData.name}</h1>
                    <h1 className='text-lg text-left text-gray-600'>{userData.email}</h1>
                    <p className='text-base mt-2'>{userData.about}</p>

                    <div className='flex flex-col gap-2'>
                        <div className='flex gap-5'>
                            {permission==="OWNER" &&
                                <button
                                    className='mt-5 p-2 w-full rounded-md bg-green-500 hover:bg-green-600' onClick={() => setIsUserEdit(true)}>
                                    Edit Profile
                                </button>
                            }
                            <button
                                className='mt-5 p-2 w-full rounded-md bg-green-500 hover:bg-green-600'>
                                <Link href={`/user/${userData._id}`}>
                                    Portfolio
                                </Link>
                            </button>
                        </div>
                        {permission==="OWNER" && 
                            <>
                                <button
                                    onClick={transpileProject}
                                    className="p-2 bg-yellow-500 rounded-md hover:bg-yellow-600">
                                    Transpile Project
                                </button>
                                <button
                                    className='p-2  w-full rounded-md bg-red-500 hover:bg-red-600'
                                    onClick={deleteUser}>
                                    Delete Account
                                </button>
                            </>
                        }
                        {compilerRes}
                    </div>
                </>
            }
        </div>
    )
}

export default UserEditLeftSide