import { fetchServer } from "@/Networking/FetchInstanceServer";
import requests from "@/Networking/Requests";
import UserProfilePanel from "@/components/ProfileDisplayPanel/UserProfilePanel";
import UserProjectPanel from "@/components/ProfileDisplayPanel/UserProjectPanel";
import { Toaster } from 'sonner'

export async function generateMetadata({ params }) {
    try {
        const userData = await fetchServer(requests.getDeleteUpdateUserById(params.userId), {
            method: 'GET',
            next: { revalidate: 60, tags: ['user-profile'] },
        });
        const name = userData?.data?.name;
        if (!name) return { title: "Profile" };
        const description = userData.data.about || `${name}'s developer portfolio and projects on Folio.`;
        return {
            title: `${name}'s Portfolio`,
            description,
            openGraph: {
                title: `${name} · Folio`,
                description,
                images: [requests.publicFiles(`${params.userId}/avatar.jpeg`)],
            },
        };
    } catch {
        return { title: "Profile" };
    }
}

export default async function Page({ params }) {
    // Caching for 1 minutes only
    const [userData, projectData] = await Promise.all([
        fetchServer(requests.getDeleteUpdateUserById(params.userId), {
            method: 'GET',
            next: { revalidate: 60, tags: ['user-profile'] },
        }),

        fetchServer(requests.getDeleteUserAllProjects(params.userId), {
            method: 'GET',
            next: { revalidate: 60, tags: ['user-projects'] },
        })
    ]).catch((error) => {
        console.log("Error fetching user data or projects:", error);
        return [null, null];
    });


    return (
        <div className='userEditScreen flex flex-col md:flex-row gap-5 p-2 justify-center w-full'>
            <div className="w-full md:w-[30%]">
                <UserProfilePanel userDataProp={userData} userProjectProp={projectData.data} />
            </div>
            <div className="w-full md:w-[60%]">
                <UserProjectPanel userProjectProp={projectData} />
            </div>
            <Toaster richColors />
        </div>
    );
}

