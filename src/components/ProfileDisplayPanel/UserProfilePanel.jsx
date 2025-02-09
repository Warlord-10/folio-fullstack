"use client"
import React, { useState } from 'react'
import axios from "@/Networking/Axios";
import requests from '@/Networking/Requests';
import Link from 'next/link';
import UserProfileEditPanel from './UserProfileEditPanel';
import { EditIcon, Mail } from 'lucide-react';

function UserProfilePanel({ userDataProp, userProjectProp }) {
    const [userData, setUserData] = useState(userDataProp.data);
    const [isUserEdit, setIsUserEdit] = useState(false);
    const userPermission = userDataProp.permission

    return (
        <div className='flex flex-col h-full bg-gradient-to-t from-zinc-950 to-neutral-900 rounded-lg shadow-lg'>
            <div className='relative p-2'>
                <div className="absolute top-0 left-0 w-full h-[60%] bg-gradient-to-r from-purple-600 to-blue-600 rounded-t-lg z-10" />
                <img
                    className='w-[60%] aspect-square rounded-full border-4 border-purple-500 mb-6 relative z-10'
                    src={userData?.avatar_path ? requests.publicFiles(userData.avatar_path) : "/default.jpg"}
                    alt={userData.name}
                />
            </div>
            <div className='p-6 flex flex-col gap-6'>
                <div className='flex flex-col'>
                    <div className='flex justify-between items-center'>
                        <h1 className='text-3xl font-bold text-white'>{userData.name}</h1>
                        {userPermission === "OWNER" && (
                            <button className='' onClick={() => setIsUserEdit(true)} >
                                <EditIcon size={24} />
                            </button>
                        )}
                    </div>
                    <h2 className='text-lg text-gray-400 flex items-center gap-2'>
                        <Mail size={16} />
                        <span>{userData.email}</span>
                    </h2>
                </div>
                {userData.about && (
                    <p className='text-gray-300 border-y-2 py-4'>
                        {userData.about}
                    </p>
                )}
                <Link href={`/portfolio-v2/${userData._id}`} target='_blank'
                    className='py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 text-center'>
                    Portfolio
                </Link>
            </div>

            {isUserEdit &&
                <UserProfileEditPanel
                    userData={userData}
                    userProjects={userProjectProp}
                    toClose={() => setIsUserEdit(false)}
                    setUserData={setUserData}
                />
            }
        </div>
    )
}

export default UserProfilePanel


