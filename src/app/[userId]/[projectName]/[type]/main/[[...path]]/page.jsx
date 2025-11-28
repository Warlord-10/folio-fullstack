import React from 'react'
import requests from "@/Networking/Requests";
import FileAndFolderBox from '@/components/ProjectDetail/FileAndFolderBox';
import { cookies } from 'next/headers'
import CodeEditorPanel from '@/components/CodeEditor/CodeEditorPanel';
import { fetchClient } from '@/Networking/FetchInstance';

async function Page({ params }) {
  const cookieStore = cookies()
  const head = {
    'Cookie': cookieStore.toString(),
    'Content-Type': 'application/json',
  }

  // If the content is a directory then fetch its content
  if (params.type === "tree") {
    const folderData = await fetchClient(requests.getFolder_v2(params.userId, params.projectName, params.path ? params.path.join("/") : null), {
      headers: head,
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
    const response = await fetchClient(requests.getFileDetails_v2(params.userId, params.projectName, params.path.join("/")), {
      headers: head,
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