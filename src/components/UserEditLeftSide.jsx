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
        try {
            e.preventDefault();
            const response = await axios.get(requests.transpileProject())
            setCompilerRes(<h1 className='text-green-500'>Compiled Successfully</h1>)
        } catch (error) {
            setCompilerRes(<h1 className='text-red-500'>Error Occured</h1>)
        } finally {
            setTimeout(() => {
                setCompilerRes(null);
            }, 2000);
        }
    }

    const deleteUser = async (e) => {
        try {
            await axios.delete(requests.getDeleteUpdateUserById(userData._id));
            router.replace("/")
        } catch (error) {

        }
    }
    return (
        <div className='flex flex-col p-3 max-w-[400px]'>
            {isUserEdit
                ? <UserDetailsEditComponent 
                    setIsUserEdit={setIsUserEdit}
                  />
                  
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
                            {userPermission==="OWNER" &&
                                <button
                                    className='mt-5 p-2 w-full rounded-md bg-green-500 hover:bg-green-600' onClick={() => setIsUserEdit(true)}>
                                    Edit Profile
                                </button>
                            }
                            <button
                                className='mt-5 p-2 w-full rounded-md bg-green-500 hover:bg-green-600'>
                                <Link href={`/portfolio/${userData._id}`}>
                                    Portfolio
                                </Link>
                            </button>
                        </div>
                        {userPermission==="OWNER" && 
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