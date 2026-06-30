import React from 'react'
import requests from "@/Networking/Requests";
import FileAndFolderBox from '@/components/ProjectDetail/FileAndFolderBox';
import CodeEditorPanel from '@/components/CodeEditor/CodeEditorPanel';
import { fetchServer } from '@/Networking/FetchInstanceServer';

async function Page({ params }) {

  // If the content is a directory then fetch its content
  if (params.type === "tree") {
    const folderData = await fetchServer(requests.getFolder_v2(params.userId, params.projectName, params.path ? params.path.join("/") : null), {
      method: 'GET',
      cache: "no-store"
    })

    return (
      <div className='p-4'>
        <FileAndFolderBox permission={folderData.permission} rawFolderData={folderData} />
      </div>
    )
  }

  // If the content is a file then fetch its content
  else if (params.type === "blob") {
    const response = await fetchServer(requests.getFileDetails_v2(params.userId, params.projectName, params.path.join("/")), {
      method: 'GET',
      cache: "no-store"
    })

    return (
      <div className='p-4'>
        <CodeEditorPanel fileDetails={response.data} permission={response.permission} />
      </div>
    )
  }
}

export default Page