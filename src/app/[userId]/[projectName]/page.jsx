import axios from "@/Networking/Axios";
import requests from "@/Networking/Requests";
import FileAndFolderList from "@/components/FileAndFolderList";
import ReadMePanel from "@/components/ReadMePanel";
import { cookies } from 'next/headers'
import { format, set } from 'date-fns';
import { CircleIcon, User } from "lucide-react";
import Link from "next/link";
import { Settings } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"



// On every load it will fetch the project data and user permission

function makeGraph(data) {
  const totalBytes = data.bytes;
  const results = data.results;

  return (
    Object.keys(results).map(key => {
      const val = results[key];
      const percentage = (val.bytes / totalBytes) * 100;

      return (
        <div key={key} style={{
          backgroundColor: val.color, width: `${percentage}%`, height: '100%'
        }}>
        </div>
      );

    })
  )
}

export default async function Page({ params }) {
  try {
    const cookieStore = cookies()
    const head = {
      Cookie: cookieStore.toString(),
    }

    const response = await axios.get(requests.getProjectByName(params.userId, params.projectName), {
      headers: head
    })

    const folderData = await axios.get(requests.getFolder_v2(params.userId, params.projectName, null), {
      headers: head
    })

    const project_data = response.data.data
    const owner_data = project_data.owner_id
    const permission = response.data.permission
    const metadata = response.data.metadata


    return (
      <div className="flex flex-col px-20">
        <div className="flex justify-between items-center">
          <h1 className='py-4 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>{project_data.title}</h1>
          {/* <Settings size={16} /> */}
        </div>

        <div className="grid grid-cols-4 gap-8">
          <div className="col-span-3 flex flex-col gap-2">
            <FileAndFolderList permission={permission} rawFolderData={folderData.data} />

            {project_data.banner_path && (
              <div className="w-full flex items-center justify-center bg-gray-900 border-2 border-purple-600 rounded-lg">
                <img className="w-1/2 aspect-auto font-mono bg-gray-900 shadow-lg" src={requests.bannerFiles(project_data.banner_path) || "#"} alt="banner" />
              </div>
            )}

            <ReadMePanel file={folderData.data.files.find(file => file.name === "README.md")} />
          </div>

          <div className="col-span-1 flex flex-col gap-2">

            <div className="border-b-2 border-gray-800 pb-4">
              <h1 className="text-2xl font-semibold mb-4 border-b-2 border-gray-800 pb-2">Details</h1>
              <HoverCard>
                <HoverCardTrigger className="text-lg flex items-center gap-2 m-0 cursor-pointer">
                  <User size={20} strokeWidth={3} />
                  <h1 className="text-lg"> {owner_data.name}</h1>
                </HoverCardTrigger>
                <HoverCardContent className="p-2 w-full bg-gray-800">
                  <Link href={`/profile/${owner_data._id}`} className="flex items-center gap-2 justify-between hover:text-blue-400">
                    <h1 className="text-lg font-semibold"> {owner_data.name}</h1>
                    <img className="w-10 h-10 rounded-full border-black border-2" src={requests.publicFiles(`${owner_data._id}/avatar.jpeg`)} alt="profile pic" />
                  </Link>
                </HoverCardContent>
              </HoverCard>

              <h1>Created: {format(new Date(project_data.createdAt), "dd/MM/yy")}</h1>
              <h1>Updated: {format(new Date(project_data.updatedAt), "dd/MM/yy")}</h1>
            </div>
            <div className="border-b-2 border-gray-800 pb-4">
              <h1 className="text-lg font-semibold mb-2">Description</h1>
              <h1>{project_data.description}</h1>
            </div>
            <div>
              <h1 className="text-lg font-semibold mb-2">
                Languages
              </h1>
              <div className="overflow-hidden flex rounded-full h-3 border-2">
                {makeGraph(metadata)}
              </div>
              <div className="flex flex-col mt-2">{
                Object.keys(metadata.results).map(key => {
                  const val = metadata.results[key];
                  return (
                    <div key={key} className="flex items-center gap-2">
                      <CircleIcon fill={`${val.color}`} className="p-1.5" />
                      <span>{key}</span>
                    </div>
                  )
                })
              }
              </div>
            </div>

          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.log(error)
  }
}
