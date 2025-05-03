import React from 'react'
import requests from "@/Networking/Requests";

function UserProfileImage({ userData }) {
    if (!userData.avatar_path) {
        return <img src="/default.jpg" alt="user" className='aspect-square w-full h-full' />
    }

    return (
        <img src={requests.publicFiles(userData.avatar_path)} alt="user" className='aspect-square w-full h-full' />
    )
}

export default UserProfileImage