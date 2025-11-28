import requests from "@/Networking/Requests";
import FileAndFolderBox from "@/components/ProjectDetail/FileAndFolderBox";
import ReadMePanel from "@/components/ProjectDetail/ReadMePanel";
import { cookies } from 'next/headers'
import { fetchClient } from "@/Networking/FetchInstance";
import BannerImagePanel from "@/components/BannerImagePanel";
import { Toaster } from 'sonner'
import ProjectPageDetailSection from "@/components/ProjectDetail/ProjectPageDetailSection";


export default async function Page({ params }) {
  try {
    const cookieStore = cookies()
    const head = {
      'Cookie': cookieStore.toString(),
      'Content-Type': 'application/json',
    }

    const response = await fetchClient(requests.getProjectByName(params.userId, params.projectName), {
      headers: head,
      cache: "no-store"
    })

    const folderData = await fetchClient(requests.getFolder_v2(params.userId, params.projectName), {
      headers: head,
      cache: "no-store"
    })

    const project_data = response.data
    const permission = response.permission
    const metadata = response.metadata
    const owner_data = project_data.owner_id


    return (
      <div className="flex flex-col px-20">
        <div className="flex justify-between items-center">
          <h1 className='py-4 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>{project_data.title}</h1>
        </div>

        <div className="grid grid-cols-4 gap-8">
          <div className="col-span-3 flex flex-col gap-2">
            <FileAndFolderBox permission={permission} rawFolderData={folderData} />

            <ReadMePanel file={folderData.files.find(file => file.name === "README.md")} />

            {project_data.banner_path && (
              <BannerImagePanel url={requests.bannerFiles(project_data.banner_path)} />
            )}
          </div>

          <div className="col-span-1 flex flex-col gap-2">
            <ProjectPageDetailSection owner_data={owner_data} project_data={project_data} metadata={metadata} />
          </div>
        </div>

        <Toaster richColors />
      </div>
    )
  } catch (error) {
    console.log(error)
  }
}
