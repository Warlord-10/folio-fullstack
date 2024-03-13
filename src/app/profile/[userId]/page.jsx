"use client"
import axios from "@/Networking/Axios";
import requests from "@/Networking/Requests";
import Navbar from "@/components/Navbar";
import UserEditLeftSide from "@/components/UserEditLeftSide";
import UserEditRightSide from "@/components/UserEditRightSide";
import { hasCookie } from "cookies-next";
import { useEffect, useState } from "react";

// {
//     headers:{
//         cookie: `accessToken=${cookieStore.get("accessToken").value}; refreshToken=${cookieStore.get("refreshToken").value}`
//     }
// }


export default function Page({ params }) {
    const [userData, setUserData] = useState(null);
    const [userPermission, setUserPermission] = useState(null);

    useEffect(()=>{
        const fetchData = async ()=>{
            const response = await axios.get(requests.getDeleteUpdateUserById(params.userId));
            setUserData(response.data.data)
            setUserPermission(response.data.PERMISSION)
        }
        fetchData();
    }, [params])


    try {
        return (
            <>
                <Navbar isLogged={hasCookie("accessToken")}/>
                <div className='userEditScreen flex p-2 font-mono bg-[#171323] text-white justify-center min-h-[100vh] gap-5'>
                    {userData &&
                        <>
                            <UserEditLeftSide data={userData} permission={userPermission}/>
                            <UserEditRightSide data={userData} permission={userPermission}/>
                        </>
                    }
                </div>
            </>
        )
    } catch (error) {
    }
}

