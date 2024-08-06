"use client"
import React, { useState, useEffect } from 'react'
import axios from "@/Networking/Axios";
import requests from '@/Networking/Requests';

import ProjectDetail from './ProjectDetail';
import CodeEditorPanel from './CodeEditorPanel';
import Dropdown from './DropDown';



function CodeScreen({ projectData, data, permission }) {
    const [folderId, setFolderId] = useState(data) // id of the folder currently inside
    const [currRepo, setCurrRepo] = useState({}); // data of the folder currently inside
    const [fileId, setFileId] = useState(null); // id of the file viewing


    const createFile = async (data) => {
        try {
            if (!data.name || data.name.trim() === '') {
                throw new Error('Invalid file name');
            }
            const response = await axios.post(requests.createFile(), data);
            setCurrRepo({
                ...currRepo,
                files: [...currRepo.files, response.data]
            });
        } catch (error) {
        }
    }
    const updateFile = async (fileId, dataToSend) => {
        let msg = ""
        try {
            const responseUpdate = await axios.patch(requests.updateDeleteFile(fileId), dataToSend);
            msg = <h1 className='text-green-500'>Successfully Saved</h1>
        } catch (error) {
            msg = <h1 className='text-red-500'>Error Occurred</h1>
        } finally{
            return msg;
        }
    }
    const deleteFile = async (fileId) => {
        try {
            const response = await axios.delete(requests.updateDeleteFile(fileId));
            setCurrRepo({
                ...currRepo,
                files: currRepo.files.filter((comp) => comp._id !== fileId)
            });
            setFileId(null);
        } catch (error) {
        }
    }
    const uploadNewFiles = async (data) => {
        try {
            const fd = new FormData();
            data.forEach((f) => {
                fd.append('file', f);
            });

            const response = await axios.post(requests.uploadFile(folderId), fd)
            setCurrRepo({
                ...currRepo,
                files: [...currRepo.files, response.data]
            });
        } catch (error) {
        }
    }

    const createFolder = async (data) => {
        try {
            if (!data.name || data.name.trim() === '') {
                throw new Error('Invalid folder name');
            }
            const response = await axios.post(requests.createFolder(), data);
            setCurrRepo({
                ...currRepo,
                folders: [...currRepo.folders, response.data]
            });
        } catch (error) {
        }
    }
    const updateFolder = async (folderId, dataToSend) => {
        try {
            const responseUpdate = await axios.patch(requests.getUpdateDeleteFolderById(folderId), dataToSend);
        } catch (error) {
        }
    }
    const deleteFolder = async (folderId) => {
        try {
            const response = await axios.delete(requests.getUpdateDeleteFolderById(folderId));
            setCurrRepo({
                ...currRepo,
                folders: currRepo.folders.filter((comp) => comp._id !== folderId)
            });
        } catch (error) {
        }
    }

    const handleImageError = (event) => {
        event.target.style.display = 'none'; // Hide the image on error
    };

    useEffect(() => {
        const fetchFolderData = async () => {
            const repoResponse = await axios.get(requests.getUpdateDeleteFolderById(folderId));
            setCurrRepo(repoResponse.data);
            return repoResponse.data;
        }
        fetchFolderData();
    }, [folderId])


    return (
        <div className='main flex text-white font-mono min-h-[100vh] justify-around'>
            <div className='componentTree p-2 w-1/4 flex flex-col'>
                <div className='h-full p-3 border-2 border-purple-600 rounded-lg font-mono bg-gray-900 shadow-lg'>
                    <h1 className='text-2xl mb-3 font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>Files</h1>
                    {
                        <Dropdown
                            repoId={data}
                            fileFunctions={{ setFileId }}
                            folderFunctions={{ setFolderId }}
                        />
                    }
                </div>
            </div>

            <div className='codeEditor w-3/4 flex flex-col gap-2 p-2 '>
                {currRepo &&
                    <ProjectDetail
                        repoData={currRepo}
                        fileFunctions={{ setFileId, createFile, updateFile, deleteFile, uploadNewFiles }}
                        folderFunctions={{ setFolderId, createFolder, updateFolder, deleteFolder }}
                        permission={permission}
                    />
                }

                {fileId === null && currRepo.parent === null && projectData.banner !== null
                    ? <div className='flex justify-center overflow-hidden border-2 border-purple-600 rounded-lg font-mono bg-gray-900 shadow-lg'>
                        <img src={`${requests.publicFiles()}${projectData.banner}`} className='w-full'
                        onError={handleImageError}/>
                    </div>
                    : <CodeEditorPanel
                        fileId={fileId}
                        updateFileFunction={updateFile}
                        deleteFileFunction={deleteFile}
                        closeFileFunction={setFileId}
                        permission={permission}
                    />
                }
            </div>
        </div>
    )
}

export default CodeScreen