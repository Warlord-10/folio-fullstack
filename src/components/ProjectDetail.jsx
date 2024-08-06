"use client"
import React, { useState } from 'react';


function ProjectDetail({ repoData, fileFunctions, folderFunctions, permission }) {
    const [creatingNew, setCreatingNew] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);

    // functions to display files and folders
    function FileDetailTab(fileData, key) {
        return (
            <div className='flex p-3 hover:bg-gray-800 justify-between items-center rounded-lg transition duration-300' key={key}>
                <div className='flex gap-3 items-center cursor-pointer'
                    onClick={() => fileFunctions.setFileId(fileData._id)}>
                    <img src="/fileIcon.svg" alt="" className="w-5 h-5" />
                    <h1 className='text-base cursor-pointer hover:text-purple-400 transition duration-300'>{fileData.name}</h1>
                </div>
                <div className='flex items-center justify-center gap-6'>
                    {permission === "OWNER" &&
                        <div className='flex gap-4'>
                            <img className='cursor-pointer w-4 h-4 hover:opacity-75 transition duration-300' src="/editIcon.svg" alt="" />
                            <img className='cursor-pointer w-4 h-4 hover:opacity-75 transition duration-300' src="/trashIcon.svg" alt="" onClick={(e) => fileFunctions.deleteFile(fileData._id)} />
                        </div>
                    }
                    <h1 className='text-gray-500 text-sm'>{fileData.updatedAt}</h1>
                </div>
            </div>
        );
    }
    function FolderDetailTab(folderData, key) {
        return (
            <div className='flex p-3 hover:bg-gray-800 justify-between items-center rounded-lg transition duration-300' key={key}>
                <div className='flex gap-3 items-center cursor-pointer'
                    onClick={() => folderFunctions.setFolderId(folderData._id)}>
                    <img src="/folderIcon.svg" alt="" className="w-5 h-5" />
                    <h1 className='text-base cursor-pointer hover:text-purple-400 transition duration-300'>{folderData.name}</h1>
                </div>
                <div className='flex items-center justify-center gap-6'>
                    {permission === "OWNER" &&
                        <div className='flex gap-4'>
                            <img className='cursor-pointer w-4 h-4 hover:opacity-75 transition duration-300' src="/editIcon.svg" alt="" />
                            <img className='cursor-pointer w-4 h-4 hover:opacity-75 transition duration-300' src="/trashIcon.svg" alt="" onClick={(e) => folderFunctions.deleteFolder(folderData._id)} />
                        </div>
                    }
                    <h1 className='text-gray-500 text-sm'>{folderData.updatedAt}</h1>
                </div>
            </div>
        );
    }



    return (
        <div className='border-2 border-purple-600 rounded-lg font-mono bg-gray-900 shadow-lg'>
            <div className='flex justify-between items-center border-b-2 border-purple-600 p-4'>
                <h1 className='text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>{repoData.name}</h1>
                {permission === "OWNER" &&
                    <div className='flex'>
                        <button
                            className='px-4 py-2 bg-gray-800 hover:bg-purple-700 text-white rounded-l-md transition duration-300'
                            onClick={() => setCreatingNew("file")}>
                            Create File
                        </button>
                        <button
                            className='px-4 py-2 bg-gray-800 hover:bg-purple-700 text-white rounded-r-md transition duration-300'
                            onClick={() => setCreatingNew("folder")}>
                            Create Folder
                        </button>
                    </div>
                }
            </div>
            <div className='p-4'>
                {/* Adds a back button */}
                {repoData.parent && <div className='flex p-2 hover:bg-gray-800 rounded-md transition duration-300'>
                    <div
                        className='flex gap-2 items-center cursor-pointer'
                        onClick={() => folderFunctions.setFolderId(repoData.parent)}
                    >
                        <img src="/folderIcon.svg" alt="" className="w-5 h-5" />
                        <h1 className='text-base cursor-pointer hover:text-purple-400 transition duration-300'>...</h1>
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
                            ? (e) => {
                                fileFunctions.createFile({ name: e.get("name"), parent: repoData._id });
                                setCreatingNew(false)
                            }
                            : (e) => {
                                folderFunctions.createFolder({ name: e.get("name"), parent: repoData._id });
                                setCreatingNew(false)
                            }
                        }
                        className='flex p-2 justify-between items-center bg-gray-800 rounded-md'>
                        <div className='flex gap-2 items-center'>
                            {creatingNew && creatingNew === "file"
                                ? <img src="/fileIcon.svg" alt="" className="w-5 h-5" />
                                : <img src="/folderIcon.svg" alt="" className="w-5 h-5" />
                            }
                            <input
                                className="p-2 bg-gray-700 text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                                placeholder={creatingNew + " name"}
                                name="name" />
                        </div>
                        <div className='flex'>
                            <button
                                type='submit'
                                className='px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-l-md transition duration-300'>
                                Create
                            </button>
                            <button
                                type='button'
                                className='px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-r-md transition duration-300'
                                onClick={() => setCreatingNew(false)}>
                                X
                            </button>
                        </div>
                    </form>
                }

                {permission === "OWNER" &&
                    <form
                        className='flex justify-between px-2 mt-4'
                        action={(e) => {
                            fileFunctions.uploadNewFiles(selectedFiles);
                            setSelectedFiles([])
                        }}
                    >
                        <div className='flex items-center gap-x-4'>
                            <label className='flex px-4 py-2 justify-between items-center cursor-pointer rounded-md bg-purple-600 hover:bg-purple-700 text-white transition duration-300'>
                                Upload File
                                <input
                                    name="file"
                                    className='hidden'
                                    type='file'
                                    multiple
                                    onChange={(e) => setSelectedFiles([...e.target.files])} />
                            </label>
                            <h1 className='text-gray-300'>{selectedFiles.length} Files selected</h1>
                        </div>
                        <button className='px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition duration-300' type='submit'>Upload</button>
                    </form>
                }
            </div>
        </div>
    )
}

export default ProjectDetail;