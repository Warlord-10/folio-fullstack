import React, { useState, useEffect } from 'react';
import axios from "../Networking/Axios";
import requests from '../Networking/Requests';

import fileIcon from "../assets/fileIcon.svg";
import folderIcon from "../assets/folderIcon.svg";

function Dropdown({repoData, cbUpdateFunction}) {

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div className='text-sm font-thin'>
        <div className='flex items-center gap-2 cursor-pointer'>
            <button onClick={toggleVisibility}>{">"}</button>
            <img src={folderIcon} alt="" />
            <h1>{tableData.curr}</h1>
        </div>
        {visible &&
        <div className='pl-2.5 flex flex-col items-start gap-1'>
            {tableData.folders.map((folder, key) => (
                <Dropdown fid={folder._id} key={key}/>
            ))}
            {tableData.files.map((file, key) => (
                <div className='flex items-center gap-2 cursor-pointer' onClick={()=>{fetchFileData(file._id); cbFileName(file.name)}} key={key}>
                    <img src={fileIcon} alt="" />
                    <h1>{file.name}</h1>
                </div>
            ))}
        </div>
        }
    </div>
  );
}

export default Dropdown;
