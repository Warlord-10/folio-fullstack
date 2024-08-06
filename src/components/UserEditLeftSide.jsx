"use client"
import React, { useContext, useState } from 'react'
import axios from "@/Networking/Axios";
import requests from '@/Networking/Requests';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import UserDataContext from '@/utils/UserDataContext';
import UserDetailsEditComponent from './UserDetailsEditComponent';

function UserEditLeftSide() {
    const router = useRouter();
    const {userData, userPermission} = useContext(UserDataContext);
    const [isUserEdit, setIsUserEdit] = useState(false);
    const [compilerRes, setCompilerRes] = useState(null);

    const transpileProject = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(requests.transpileProject())
            setCompilerRes(<span className='text-green-400 font-semibold'>Compiled Successfully</span>)
        } catch (error) {
            setCompilerRes(<span className='text-red-400 font-semibold'>Error Occurred</span>)
        } finally {
            setTimeout(() => setCompilerRes(null), 2000);
        }
    }

    const deleteUser = async (e) => {
        try {
            await axios.delete(requests.getDeleteUpdateUserById(userData._id));
            router.replace("/")
        } catch (error) {
            console.error("Failed to delete user", error);
        }
    }

    return (
        <div className='flex flex-col p-6 max-w-[400px] bg-gray-950 rounded-lg shadow-xl'>
            {isUserEdit ? (
                <UserDetailsEditComponent setIsUserEdit={setIsUserEdit} />
            ) : (
                <>
                    <img
                        className='w-full aspect-square rounded-full border-4 border-purple-500 mb-6'
                        src={userData.avatar ? `${requests.publicFiles() + userData.avatar}` : "https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/a/9/4/a940fe649d1d5bb4355b3dc5ccdee540bb7d2929.png"}
                        alt={userData.name}
                    />
                    <h1 className='text-3xl font-bold text-white mb-2'>{userData.name}</h1>
                    <h2 className='text-lg text-gray-400 mb-4'>{userData.email}</h2>
                    <p className='text-gray-300 mb-6'>{userData.about}</p>

                    <div className='space-y-3'>
                        <div className='grid grid-cols-2 gap-3'>
                            {userPermission === "OWNER" && (
                                <button
                                    className='py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-300'
                                    onClick={() => setIsUserEdit(true)}>
                                    Edit Profile
                                </button>
                            )}
                            <Link href={`/portfolio/${userData._id}`}
                                  className='py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 text-center'>
                                Portfolio
                            </Link>
                        </div>
                        {userPermission === "OWNER" && (
                            <>
                                <button
                                    onClick={transpileProject}
                                    className="w-full py-2 px-4 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition duration-300">
                                    Transpile Project
                                </button>
                                <button
                                    className='w-full py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300'
                                    onClick={deleteUser}>
                                    Delete Account
                                </button>
                            </>
                        )}
                        {compilerRes && (
                            <div className='text-center py-2'>{compilerRes}</div>
                        )}
                    </div>
                </>
            )}
        </div>
    )
}

export default UserEditLeftSide