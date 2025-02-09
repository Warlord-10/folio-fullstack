import React from 'react'
import axios from "@/Networking/Axios";
import requests from "@/Networking/Requests";
import FileAndFolderList from '@/components/FileAndFolderList';
import { cookies } from 'next/headers'
import CodeEditorPanel from '@/components/CodeEditorPanel';

async function Page({ params }) {
  const cookieStore = cookies()
  const head = {
    Cookie: cookieStore.toString(),
  }

  if (params.type === "tree") {
    const folderData = await axios.get(requests.getFolder_v2(params.userId, params.projectName, params.path?params.path.join("/"):null), {
      headers: head
    })

    return (
      <div className='p-4'>
        <FileAndFolderList permission={folderData.data.permission} rawFolderData={folderData.data} />
      </div>
    )
  }

  
  else if (params.type === "blob") {
    const response = await axios.get(requests.getFileDetails_v2(params.userId, params.projectName, params.path.join("/")), {
      headers: head
    })

    return (
      <div className='p-4'>
        <CodeEditorPanel fileDetails={response.data.data} permission={response.data.permission} />
      </div>
    )
  }
}

export default Page