import Image from 'next/image'
import requests from "@/Networking/Requests";

function UserProfileImage({ userData }) {
    const src = userData?.avatar_path ? requests.publicFiles(userData.avatar_path) : "/default.jpg";
    // width/height set intrinsic ratio; w-full/h-full scales it to whatever container it sits in
    return <Image src={src} alt="user" width={128} height={128} className='aspect-square h-full w-full object-cover' />
}

export default UserProfileImage
