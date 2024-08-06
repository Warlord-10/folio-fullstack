import React, { useContext, useState } from 'react'
import axios from "@/Networking/Axios";
import requests from '@/Networking/Requests';
import UserDataContext from '@/utils/UserDataContext';

function UserDetailsEditComponent({ setIsUserEdit }) {
    const {userData, setUserData} = useContext(UserDataContext);
    const [defaultPage, setDefaultPage] = useState(userData.userPageProject);
    const [res, setRes] = useState(null);

    const updateUser = async (e) => {
        try {
            const dataToSend = new FormData()
            dataToSend.append("name", e.get("name"))
            dataToSend.append("email", e.get("email"))
            dataToSend.append("about", e.get("about"))
            dataToSend.append("file", e.get("avatar"))
            dataToSend.append("userPageProject", defaultPage ? defaultPage : null)
            const response = await axios.patch(requests.getDeleteUpdateUserById(userData._id), dataToSend);

            setRes(<span className='text-green-400 font-semibold'>Updated Successfully</span>)
            setUserData(response.data);
            setDefaultPage(response.data.userPageProject);
        } catch (error) {
            setRes(<span className='text-red-400 font-semibold'>Error Occurred</span>)
        } finally {
            setTimeout(() => {
                setRes(null);
                setIsUserEdit(false);
            }, 2000);
        }
    }

    return (
        <form action={updateUser} className='bg-gray-800 rounded-lg p-6 space-y-4'>
            <label className='block w-max-[400px]'>
                <div className='rounded-full overflow-hidden border-4 border-purple-800 cursor-pointer hover:opacity-60 transition duration-200'>
                    <img
                        className='h-full aspect-square'
                        src={userData.avatar ? `${requests.publicFiles() + userData.avatar}` : "https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/a/9/4/a940fe649d1d5bb4355b3dc5ccdee540bb7d2929.png"}
                        alt={userData.name}
                    />
                    <input
                        type='file'
                        className='hidden'
                        name='avatar'
                        accept="image/*"
                    />
                </div>
            </label>
            <label className='block'>
                <span className='text-gray-300'>Name:</span>
                <input
                    className='mt-1 p-2 block w-full rounded-md bg-gray-700 border-transparent focus:border-purple-500 focus:bg-gray-900 focus:ring-0 text-white'
                    name='name'
                    defaultValue={userData.name}
                    type="text"
                />
            </label>
            <label className='block'>
                <span className='text-gray-300'>Email:</span>
                <input
                    className='mt-1 p-2 block w-full rounded-md bg-gray-700 border-transparent focus:border-purple-500 focus:bg-gray-900 focus:ring-0 text-white'
                    name='email'
                    defaultValue={userData.email}
                    type="email"
                />
            </label>
            <label className='block'>
                <span className='text-gray-300'>About:</span>
                <textarea
                    className='mt-1 p-2 block w-full rounded-md bg-gray-700 border-transparent focus:border-purple-500 focus:bg-gray-900 focus:ring-0 text-white'
                    name='about'
                    defaultValue={userData.about}
                    rows={5}
                />
            </label>
            <div>
                <span className='text-gray-300'>Default portfolio:</span>
                <div className='mt-2 space-y-2'>
                    {userData.projects.map((p) => (
                        <button
                            type='button'
                            key={p._id}
                            onClick={() => setDefaultPage(defaultPage === p._id ? null : p._id)}
                            className={`w-full text-left px-3 py-2 rounded-md transition duration-300 ${p._id === defaultPage ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>
                            {p.title}
                        </button>
                    ))}
                </div>
            </div>

            {res && <div className='text-center py-2'>{res}</div>}

            <div className='flex justify-between pt-4'>
                <button
                    className='px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300'
                    type='button'
                    onClick={() => setIsUserEdit(false)}>
                    Cancel
                </button>
                <button
                    className='px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300'
                    type='submit'>
                    Submit
                </button>
            </div>
        </form>
    )
}

export default UserDetailsEditComponent