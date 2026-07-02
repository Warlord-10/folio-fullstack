"use client"
import React, { useState } from 'react'
import Link from 'next/link';
import UserProfileEditPanel from './ProfileComponents/UserProfileEditPanel';
import { EditIcon, Mail } from 'lucide-react';
import UserProfileImage from '../UserProfileImage';

function UserProfilePanel({ userDataProp, userProjectProp }) {
    const [userData, setUserData] = useState(userDataProp.data);
    const [isUserEdit, setIsUserEdit] = useState(false);
    const userPermission = userDataProp.permission

    return (
        <div className='flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-lg'>
            <div className='relative h-28 bg-gradient-to-r from-primary to-violet-500'>
                <div className='absolute -bottom-12 left-6 aspect-square w-28 overflow-hidden rounded-full border-4 border-card bg-card'>
                    <UserProfileImage userData={userData} />
                </div>
            </div>

            <div className='flex flex-col gap-6 p-6 pt-16'>
                <div className='flex flex-col gap-1'>
                    <div className='flex items-center justify-between'>
                        <h1 className='text-2xl font-bold tracking-tight'>{userData.name}</h1>
                        {userPermission === "OWNER" && (
                            <button
                                aria-label="Edit profile"
                                onClick={() => setIsUserEdit(true)}
                                className='rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground'
                            >
                                <EditIcon size={20} />
                            </button>
                        )}
                    </div>
                    <h2 className='flex items-center gap-2 text-sm text-muted-foreground'>
                        <Mail size={15} />
                        <span>{userData.email}</span>
                    </h2>
                </div>
                {userData.about && (
                    <p className='border-y border-border py-4 text-sm leading-relaxed text-muted-foreground'>
                        {userData.about}
                    </p>
                )}
                {userData.user_portfolio ? (
                    <Link href={`/portfolio-v2/${userData._id}`} target='_blank'
                        className='rounded-md bg-primary px-4 py-2 text-center font-semibold text-primary-foreground transition-colors hover:bg-primary/90'>
                        View Portfolio
                    </Link>
                ) : (
                    <p className='text-sm text-muted-foreground'>No portfolio set yet.</p>
                )}
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


