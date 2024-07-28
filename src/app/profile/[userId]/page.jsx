"use client"
import axios from "@/Networking/Axios";
import requests from "@/Networking/Requests";
import UserEditLeftSide from "@/components/UserEditLeftSide";
import UserEditRightSide from "@/components/UserEditRightSide";
import { useContext, useEffect, useState } from "react";

import UserDataContext from "@/utils/UserDataContext";
import UserProjectContext from "@/utils/UserProjectContext";


export default function Page({ params }) {
    const [userData, setUserData] = useState(null);
    const [userPermission, setUserPermission] = useState(null);
    const [projectData, setProjectData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(requests.getDeleteUpdateUserById(params.userId));
            
            setUserData(response.data.data)
            setUserPermission(response.data.PERMISSION)
            setProjectData(response.data.data.projects)
        }
        fetchData();
    }, [params])


    if(!userData) return null;
    return(
        <UserDataContext.Provider value={{userData, setUserData, userPermission, setUserPermission}}>
            <UserProjectContext.Provider value={{projectData, setProjectData}}>

                <div className='userEditScreen flex font-mono bg-[#171323] text-white justify-center min-h-[100vh] gap-5'>
                    <UserEditLeftSide/>
                    <UserEditRightSide/>
                </div>

            </UserProjectContext.Provider>
        </UserDataContext.Provider>
    );
}

