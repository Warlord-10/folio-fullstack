"use client"
import React, { useState } from 'react'
import axios from "@/Networking/Axios";
import requests from '@/Networking/Requests';


function ProjectDetail({ repoData, fileFunctions, folderFunctions }) {
    const [creatingNew, setCreatingNew] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);

    const uploadNewFiles = async (e) => {
        try {
            e.preventDefault()
            const fd = new FormData();
            console.log(selectedFiles);
            selectedFiles.forEach((f) => {
                fd.append('file', f);
            });
    
            const response = await axios.post(requests.uploadFile(repoData._id), fd)
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    // functions to display files and folders
    function FileDetailTab(fileData, key) {
        return (
            <div className='flex p-2 hover:bg-[#120e1daf] justify-between items-center' key={key}>
                <div className='flex gap-2 items-center cursor-pointer'
                    onClick={() => fileFunctions.setFileId(fileData._id)}>
                    <img src="/fileIcon.svg" alt="" />
                    <h1 className='text-base cursor-pointer hover:underline'>{fileData.name}</h1>
                </div>
                <div className='flex items-center justify-center gap-10'>
                    <div className='flex gap-4'>
                        <img className='cursor-pointer' src="/editIcon.svg" alt="" />
                        <img className='cursor-pointer' src="/trashIcon.svg" alt="" onClick={(e) => fileFunctions.deleteFile(fileData._id)} />
                    </div>
                    <h1 className='text-gray-500'>{fileData.updatedAt}</h1>
                </div>
            </div>
        );
    }
    function FolderDetailTab(folderData, key) {
        return (
            <div className='flex p-2 hover:bg-[#120e1daf] justify-between items-center' key={key}>
                <div className='flex gap-2 items-center cursor-pointer'
                    onClick={() => folderFunctions.setFolderId(folderData._id)}>
                    <img src="/folderIcon.svg" alt="" />
                    <h1 className='text-base cursor-pointer hover:underline'>{folderData.name}</h1>
                </div>
                <div className='flex items-center justify-center gap-10'>
                    <div className='flex gap-4'>
                        <img className='cursor-pointer' src="/editIcon.svg" alt="" />
                        <img className='cursor-pointer' src="/trashIcon.svg" alt="" onClick={(e) => folderFunctions.deleteFolder(folderData._id)} />
                    </div>
                    <h1 className='text-gray-500'>{folderData.updatedAt}</h1>
                </div>
            </div>
        );
    }



    return (
        <div className='border-2 border-white rounded-md font-mono'>
            <div className='flex justify-between items-center border-b-2 p-2'>
                <h1 className='text-xl'>{repoData.name}</h1>
                <div className='flex divide-x border-2 border-gray-500 rounded-md'>
                    <button className='p-2 hover:bg-gray-600' onClick={() => setCreatingNew("file")}>Create File</button>
                    <button className='p-2 hover:bg-gray-600' onClick={() => setCreatingNew("folder")}>Create Folder</button>
                </div>
            </div>

            <div className='p-2'>
                {/* Adds a back button */}
                {repoData.parent && <div className='flex p-2 hover:bg-[#120e1daf]'>
                    <div className='flex gap-2 items-center cursor-pointer' onClick={() => folderFunctions.setFolderId(repoData.parent)}>
                        <img src="/folderIcon.svg" alt="" />
                        <h1 className='text-base cursor-pointer hover:underline'>...</h1>
                    </div>
                </div>}

                {repoData.folders && repoData.folders.map((data, key) => {
                    return FolderDetailTab(data, key)
                })}
                {repoData.files && repoData.files.map((data, key) => {
                    return FileDetailTab(data, key)
                })}

                {/* to create new folder/file */}
                {creatingNew &&
                    <form
                        action={creatingNew === "file"
                            ? (e) => { fileFunctions.createFile({ name: e.get("name"), parent: repoData._id }); setCreatingNew(false) }
                            : (e) => { folderFunctions.createFolder({ name: e.get("name"), parent: repoData._id }); setCreatingNew(false) }
                        }
                        className='flex p-2 justify-between items-center'>
                        <div className='flex gap-2'>
                            {creatingNew && creatingNew == "file"
                                ? <img src="/fileIcon.svg" alt="" />
                                : <img src="/folderIcon.svg" alt="" />
                            }
                            <input
                                className="p-1 bg-inherit text-lg border-2 border-gray-600 rounded-md"
                                placeholder={creatingNew + " name"}
                                name="name" />
                        </div>
                        <div className='flex divide-x border-2 border-gray-600 rounded-md'>
                            <button
                                type='submit'
                                className='p-2 hover:bg-green-600'>
                                Create
                            </button>
                            <button
                                type='button'
                                className='p-2 hover:bg-red-600 pl-8 pr-8'
                                onClick={() => setCreatingNew(false)}>
                                X
                            </button>
                        </div>
                    </form>
                }
                <form className='flex justify-between px-2' onSubmit={uploadNewFiles}>
                    <div className='flex items-center gap-x-2'>
                        <label className='flex p-2 hover:bg-[#120e1daf] justify-between items-center cursor-pointer rounded-md border-2 border-white'>
                            Upload File
                            <input
                                name="file"
                                className='hidden'
                                type='file'
                                multiple
                                onChange={(e) => setSelectedFiles([...e.target.files])} />
                        </label>
                        <h1>{selectedFiles.length} Files selected</h1>
                    </div>
                    <button className='hover:bg-[#120e1daf] p-2 rounded-md border-2 border-white' type='submit'>Upload</button>
                </form>
            </div>
        </div>
    )
}

export default ProjectDetail;