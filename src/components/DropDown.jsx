import React, { useState, useEffect } from 'react';
import axios from "@/Networking/Axios";
import requests from '@/Networking/Requests';

function Dropdown({repoId, fileFunctions, folderFunctions}) {
  const [visible, setVisible] = useState(false);
  const [repoData, setRepoData] = useState({})
  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const fetchFolderData = async ()=>{
    const response = await axios.get(requests.getUpdateDeleteFolderById(repoId))
    setRepoData(response.data)
  }

  useEffect(()=>{
    fetchFolderData(repoId)
  }, [repoId])

  return (
    <div className='text-sm font-thin'>
        <div className='flex items-center gap-2 cursor-pointer'>
            <div onClick={toggleVisibility}>
              <div className={"font-extrabold" && visible?"rotate-90":null}>{">"}</div>
            </div>
            <div onClick={()=>folderFunctions.setFolderId(repoId)} className='flex items-center gap-2 cursor-pointer hover:underline'>
              <img src="/folderIcon.svg" alt="" />
              <h1>{repoData.name}</h1>
            </div>
        </div>
        
        {<div className={visible?'flex flex-col pl-2.5 items-start gap-1':'hidden'}>
              {repoData.folders && repoData.folders.map((folder, key) => (
                  <Dropdown repoId={folder._id} key={key} fileFunctions={fileFunctions} folderFunctions={folderFunctions}/>
              ))}
              {repoData.files && repoData.files.map((file, key) => (
                  <div className='flex items-center gap-2 cursor-pointer hover:underline' onClick={()=>fileFunctions.setFileId(file._id)} key={key}>
                      <img src="/fileIcon.svg" alt="" />
                      <h1>{file.name}</h1>
                  </div>
              ))}
        </div>}
    </div>
  );
}

export default Dropdown;
