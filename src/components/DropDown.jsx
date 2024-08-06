import React, { useState, useEffect } from 'react';
import axios from "@/Networking/Axios";
import requests from '@/Networking/Requests';

function Dropdown({repoId, fileFunctions, folderFunctions}) {
  const [visible, setVisible] = useState(false);
  const [repoData, setRepoData] = useState({})
  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useEffect(()=>{
    const fetchFolderData = async ()=>{
      const response = await axios.get(requests.getUpdateDeleteFolderById(repoId))
      setRepoData(response.data)
    }
    fetchFolderData(repoId)
  }, [repoId])

  return (
    <div className='text-sm font-light text-gray-300'>
      <div className='flex items-center gap-2 cursor-pointer'>
          <div onClick={toggleVisibility} className='w-4 h-4 flex items-center justify-center'>
              <div className={`transform transition-transform duration-200 ${visible ? "rotate-90" : ""}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                      <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                  </svg>
              </div>
          </div>
          <div 
              onClick={() => folderFunctions.setFolderId(repoId)} 
              className='flex items-center gap-2 cursor-pointer hover:text-purple-400 transition duration-200'
          >
              <img src="/folderIcon.svg" alt="" className="w-4 h-4" />
              <h1 className="font-medium">{repoData.name}</h1>
          </div>
      </div>
      
      <div className={visible ? 'flex flex-col pl-4 items-start gap-2 mt-2' : 'hidden'}>
          {repoData.folders && repoData.folders.map((folder, key) => (
              <Dropdown 
                  repoId={folder._id} 
                  key={key} 
                  fileFunctions={fileFunctions} 
                  folderFunctions={folderFunctions}
              />
          ))}
          {repoData.files && repoData.files.map((file, key) => (
              <div 
                  className='flex items-center gap-2 cursor-pointer hover:text-purple-400 transition duration-200' 
                  onClick={() => fileFunctions.setFileId(file._id)} 
                  key={key}
              >
                  <img src="/fileIcon.svg" alt="" className="w-3 h-3" />
                  <h1>{file.name}</h1>
              </div>
          ))}
      </div>
    </div>
  );
}

export default Dropdown;
