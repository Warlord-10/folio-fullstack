import { fetchClient } from "@/Networking/FetchInstance";
import requests from "@/Networking/Requests";
import UserProfilePanel from "@/components/ProfileDisplayPanel/UserProfilePanel";
import UserProjectPanel from "@/components/ProfileDisplayPanel/UserProjectPanel";
import { cookies } from 'next/headers'
import {Toaster} from 'sonner'


export default async function Page({ params }) {
    const cookieStore = cookies()
    const head = {
        Cookie: cookieStore.toString(),
    }

    // Caching for 1 minutes only
    const [userData, projectData] = await Promise.all([
        await fetchClient(requests.getDeleteUpdateUserById(params.userId), {
            headers: head,
            next: { revalidate: 60, tags: ['user-profile'] },
            credentials: 'include',
        }),

        await fetchClient(requests.getDeleteUserAllProjects(params.userId), {
            headers: head,
            next: { revalidate: 60, tags: ['user-projects'] },
            credentials: 'include',
        })
    ])
    

    return (
        <div className='userEditScreen flex flex-col md:flex-row gap-5 p-2 justify-center w-full'>
            <div className="w-full md:w-[30%]">
                <UserProfilePanel userDataProp={userData} userProjectProp={projectData.data} />
            </div>
            <div className="w-full md:w-[60%]">
                <UserProjectPanel userProjectProp={projectData} />
            </div>
            <Toaster richColors/>
        </div>
    );
}

