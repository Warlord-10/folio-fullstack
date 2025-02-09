import axios from "@/Networking/Axios";
import requests from "@/Networking/Requests";
import UserProfilePanel from "@/components/ProfileDisplayPanel/UserProfilePanel";
import UserProjectPanel from "@/components/ProfileDisplayPanel/UserProjectPanel";
import { cookies } from 'next/headers'


export default async function Page({ params }) {
    const cookieStore = cookies()
    const head = {
        Cookie: cookieStore.toString(),
    }


    // Caching for 1 minutes only
    const [userData, projectData] = await Promise.all([
        await fetch(process.env.NEXT_PUBLIC_BASE_URL + requests.getDeleteUpdateUserById(params.userId), {
            headers: head,
            next: { revalidate: 60 },
            credentials: 'include',
            // cache: 'force-cache'
        }).then(res => res.json()),

        await fetch(process.env.NEXT_PUBLIC_BASE_URL + requests.getDeleteUserAllProjects(params.userId), {
            headers: head,
            next: { revalidate: 60 },
            credentials: 'include',
            // cache: 'force-cache' 
        }).then(res => res.json())
    ])
    console.log(projectData)

    // const [userData, projectData] = await Promise.all([
    //     await axios.get(requests.getDeleteUpdateUserById(params.userId), {
    //         headers: head
    //     }),
    //     await axios.get(requests.getDeleteUserAllProjects(params.userId), {
    //         headers: head
    //     })
    // ])

    return (
        <div className='userEditScreen flex justify-center gap-5 p-2 '>
            <div className="max-w-[400px]">
                <UserProfilePanel userDataProp={userData} userProjectProp={projectData.data} />
            </div>
            <div className="w-full lg:w-[60%]">
                <UserProjectPanel userProjectProp={projectData} />
            </div>
        </div>
    );
}

