"use client"
import { format } from 'date-fns';
import React, { useState } from 'react';
import UploadFile from './UploadFile';
import PopUpBox from './PopUpBox';


function ProjectDetail({ repoData, fileFunctions, folderFunctions, permission }) {
    const [isCreatingNew, setIsCreatingNew] = useState(false);
    // const [selectedFiles, setSelectedFiles] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    // functions to display files and folders
    function FileDetailTab(fileData, key) {
        return (
            <div className='flex p-3 hover:bg-gray-800 justify-between items-center rounded-lg transition duration-300' key={key}>
                <div className='flex gap-2 items-center justify-center cursor-pointer'
                    onClick={() => fileFunctions.setFileId(fileData._id)}>
                    <img src="/fileIcon.svg" alt="" className="w-5 h-5" />
                    <h1 className='text-base cursor-pointer hover:text-purple-400 transition duration-300'>{fileData.name}</h1>
                </div>
                <div className='flex items-center justify-end gap-6'>
                    {permission === "OWNER" &&
                        <div className='flex gap-4'>
                            <img className='cursor-pointer w-4 h-4 hover:opacity-75 transition duration-300' src="/editIcon.svg" alt="" />
                            <img className='cursor-pointer w-4 h-4 hover:opacity-75 transition duration-300' src="/trashIcon.svg" alt="" onClick={(e) => { e.preventDefault(); setIsDeleting('file') }} />
                        </div>
                    }
                    <h1 className='text-gray-500 text-sm'>{format(new Date(fileData.updatedAt), "dd/MM/yy HH:mm")}</h1>
                </div>

                {isDeleting === 'file' &&
                    <PopUpBox toClose={setIsDeleting} customStyle={{ height: 'fit-content' }} heading={'Confirm Delete?'}>
                        <div className='flex flex-col items-center justify-center px-4'>
                            <p className='text-gray-300'>
                                Are you sure you want to delete <span className='text-red-600'>{fileData.name}</span> ?
                            </p>
                            <button
                                className='bg-red-600 text-white p-2 m-4 rounded-md hover:bg-red-700 transition duration-200 w-2/4'
                                onClick={(e) => {
                                    e.preventDefault();
                                    fileFunctions.deleteFile(fileData._id);
                                    setIsDeleting(false)
                                }
                                }>Yes</button>
                        </div>
                    </PopUpBox>
                }
            </div>
        );
    }
    function FolderDetailTab(folderData, key) {
        return (
            <div className='flex p-3 hover:bg-gray-800 justify-between items-center rounded-lg transition duration-300' key={key}>
                <div className='flex gap-2 items-center justify-center cursor-pointer'
                    onClick={() => folderFunctions.setFolderId(folderData._id)}>
                    <img src="/folderIcon.svg" alt="" className="w-5 h-5" />
                    <h1 className='text-base cursor-pointer hover:text-purple-400 transition duration-300'>{folderData.name}</h1>
                </div>
                <div className='flex items-center justify-end gap-6'>
                    {permission === "OWNER" &&
                        <div className='flex gap-4'>
                            <img className='cursor-pointer w-4 h-4 hover:opacity-75 transition duration-300' src="/editIcon.svg" alt="" />
                            <img className='cursor-pointer w-4 h-4 hover:opacity-75 transition duration-300' src="/trashIcon.svg" alt="" onClick={(e) => { e.preventDefault(); setIsDeleting('folder') }} />
                        </div>
                    }
                    <h1 className='text-gray-500 text-sm'>{format(new Date(folderData.updatedAt), "dd/MM/yy HH:mm")}</h1>
                </div>

                {isDeleting === 'folder' &&
                    <PopUpBox toClose={setIsDeleting} customStyle={{ height: 'fit-content' }} heading={'Confirm Delete?'}>
                        <div className='flex flex-col items-center justify-center px-4'>
                            <p className='text-gray-300'>
                                Are you sure you want to delete <span className='text-red-600'>{folderData.name}</span> ?
                            </p>
                            <button
                                className='bg-red-600 text-white p-2 m-4 rounded-md hover:bg-red-700 transition duration-200 w-2/4'
                                onClick={(e) => {
                                    e.preventDefault();
                                    folderFunctions.deleteFolder(folderData._id);
                                    setIsDeleting(false)
                                }
                                }>Yes
                            </button>
                        </div>
                    </PopUpBox>
                }
            </div>
        );
    }



    return (
        <div className='border-2 border-purple-600 rounded-lg font-mono bg-gray-900 shadow-lg'>
            <div className='flex justify-between items-center border-b-2 border-purple-600 p-4'>
                <h1 className='text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>{repoData.name}</h1>

                {permission === "OWNER" &&
                    <div className='flex divide-x-2 bg-gray-800 p-1 rounded-md'>
                        <button
                            className='px-4 py-2 bg-gray-800 hover:bg-purple-700 text-white rounded-l-md transition duration-300'
                            onClick={() => setIsCreatingNew("file")}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="24" height="24" fill="currentColor"><path d="M0 64C0 28.7 28.7 0 64 0L224 0l0 128c0 17.7 14.3 32 32 32l128 0 0 38.6C310.1 219.5 256 287.4 256 368c0 59.1 29.1 111.3 73.7 143.3c-3.2 .5-6.4 .7-9.7 .7L64 512c-35.3 0-64-28.7-64-64L0 64zm384 64l-128 0L256 0 384 128zm48 96a144 144 0 1 1 0 288 144 144 0 1 1 0-288zm16 80c0-8.8-7.2-16-16-16s-16 7.2-16 16l0 48-48 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l48 0 0 48c0 8.8 7.2 16 16 16s16-7.2 16-16l0-48 48 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-48 0 0-48z" /></svg>
                        </button>
                        <button
                            className='px-4 py-2 bg-gray-800 hover:bg-purple-700 text-white rounded-r-md transition duration-300'
                            onClick={() => setIsCreatingNew("folder")}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24" height="24" fill="currentColor"><path d="M512 416c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96C0 60.7 28.7 32 64 32l128 0c20.1 0 39.1 9.5 51.2 25.6l19.2 25.6c6 8.1 15.5 12.8 25.6 12.8l160 0c35.3 0 64 28.7 64 64l0 256zM232 376c0 13.3 10.7 24 24 24s24-10.7 24-24l0-64 64 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-64 0 0-64c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 64-64 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l64 0 0 64z" /></svg>
                        </button>
                    </div>
                }
            </div>

            <div className='p-4 flex flex-col gap-1'>
                {/* Adds a back button */}
                {
                    repoData.parent &&
                    <div className='flex p-3 hover:bg-gray-800 justify-between items-center rounded-lg transition duration-300'>
                        <div
                            className='flex gap-2 items-center justify-center cursor-pointer'
                            onClick={() => folderFunctions.setFolderId(repoData.parent)}
                        >
                            <img src="/folderIcon.svg" alt="" className="w-5 h-5" />
                            <h1 className='text-base cursor-pointer hover:text-purple-400 transition duration-300'>...</h1>
                        </div>
                    </div>
                }

                {repoData.folders && repoData.folders.map((data, key) => {
                    return FolderDetailTab(data, key)
                })}
                {repoData.files && repoData.files.map((data, key) => {
                    return FileDetailTab(data, key)
                })}

                {/* to create new folder/file */}
                {isCreatingNew &&
                    <form
                        action={isCreatingNew === "file"
                            ? (e) => {
                                fileFunctions.createFile({ name: e.get("name"), parent: repoData._id });
                                setIsCreatingNew(false)
                            }
                            : (e) => {
                                folderFunctions.createFolder({ name: e.get("name"), parent: repoData._id });
                                setIsCreatingNew(false)
                            }
                        }
                        className='flex p-3 hover:bg-gray-800 justify-between items-center rounded-lg transition duration-300'>
                        <div className='flex gap-2 items-center justify-center'>
                            {isCreatingNew && isCreatingNew === "file"
                                ? <img src="/fileIcon.svg" alt="" className="w-5 h-5" />
                                : <img src="/folderIcon.svg" alt="" className="w-5 h-5" />
                            }
                            <input
                                className="bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 text-lg px-2"
                                placeholder={isCreatingNew + " name"}
                                name="name"
                                autoFocus
                                required
                            />
                        </div>
                        <div className='flex gap-4'>
                            <button
                                type='submit'
                                className='border-2 border-green-300 rounded-md p-1 hover:border-green-700 hover:shadow-lg transition duration-300'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="lightgreen" >
                                    <path d="M9 18.3l-5.7-5.7c-.4-.4-.4-1 0-1.4l1.4-1.4c.4-.4 1-.4 1.4 0l3.3 3.3 7.9-7.9c.4-.4 1-.4 1.4 0l1.4 1.4c.4.4.4 1 0 1.4l-9.6 9.6c-.4.4-1 .4-1.4 0z" />
                                </svg>
                            </button>
                            <button
                                type='button'
                                className='border-2 border-red-300 rounded-md p-1 hover:border-red-700 hover:shadow-lg transition duration-300'
                                onClick={() => setIsCreatingNew(false)}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="darkred">
                                    <path d="M18.3 5.7c.4-.4.4-1 0-1.4L16.9 4.3c-.4-.4-1-.4-1.4 0L12 8.6 6.4 4.3c-.4-.4-1-.4-1.4 0L4.6 5.7c-.4.4-.4 1 0 1.4L8.6 12 4.3 16.7c-.4.4-.4 1 0 1.4l1.4 1.4c.4.4 1 .4 1.4 0l5.6-5.6 5.6 5.6c.4.4 1 .4 1.4 0l1.4-1.4c.4-.4.4-1 0-1.4L16.7 12l5.6-5.6z" />
                                </svg>
                            </button>
                        </div>
                    </form>
                }
            </div>

            {
                isUploading &&
                <PopUpBox toClose={setIsUploading} heading={'Select files to upload'}>
                    <UploadFile setIsUploading={setIsUploading} />
                </PopUpBox>
            }

            {permission === "OWNER" &&
                <button className='p-2 mb-2 ml-4 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition duration-300' type='button' onClick={() => setIsUploading(true)}>
                    Upload files
                </button>
            }
        </div>
    )
}

export default ProjectDetail;
