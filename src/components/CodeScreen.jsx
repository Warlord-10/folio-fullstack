"use client"
import React, { useState, useEffect } from 'react'
import axios from "@/Networking/Axios";
import requests from '@/Networking/Requests';

import ProjectDetail from './ProjectDetail';
import CodeEditorPanel from './CodeEditorPanel';
import Dropdown from './DropDown';



function CodeScreen({ projectData, data }) {
    const [folderId, setFolderId] = useState(data) // id of the folder currently inside
    const [currRepo, setCurrRepo] = useState({}); // data of the folder currently inside
    const [fileId, setFileId] = useState(null); // id of the file viewing


    const createFile = async (data) => {
        try {
            const response = await axios.post(requests.createFile(), data);
            setCurrRepo({
                ...currRepo,
                files: [...currRepo.files, response.data]
            });
        } catch (error) {
        }
    }
    const updateFile = async (fileId, dataToSend) => {
        try {
            const responseUpdate = await axios.patch(requests.updateDeleteFile(fileId), dataToSend);
        } catch (error) {
        }
    }
    const deleteFile = async (fileId) => {
        try {
            const response = await axios.delete(requests.updateDeleteFile(fileId));
            setCurrRepo({
                ...currRepo,
                files: currRepo.files.filter((comp) => comp._id !== fileId)
            });
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


    useEffect(() => {
        const fetchFolderData = async () => {
            const repoResponse = await axios.get(requests.getUpdateDeleteFolderById(folderId));
            setCurrRepo(repoResponse.data);
            return repoResponse.data;
        }
        fetchFolderData();
    }, [folderId])


    return (
        <div className='main flex bg-[#0d0a15] text-white font-mono'>
            <div className='componentTree p-3 border-2 border-white w-1/4 flex flex-col'>
                <h1 className='text-2xl underline mb-3 font-bold'>Files</h1>
                {
                    <Dropdown
                        repoId={data}
                        fileFunctions={{ setFileId }}
                        folderFunctions={{ setFolderId }}
                    />
                }
            </div>

            <div className='codeEditor p-3 border-2 w-full flex flex-col gap-2'>
                {currRepo &&
                    <ProjectDetail
                        repoData={currRepo}
                        fileFunctions={{ setFileId, createFile, updateFile, deleteFile, uploadNewFiles }}
                        folderFunctions={{ setFolderId, createFolder, updateFolder, deleteFolder }}
                    />
                }

                {fileId === null && currRepo.parent === null && projectData.banner
                    ? <div className='overflow-hidden rounded-md border-2 border-white'>
                        <img src={`${requests.publicFiles()}${projectData.banner}`} />
                    </div>
                    : <CodeEditorPanel
                        fileId={fileId}
                        updateFileFunction={updateFile}
                        deleteFileFunction={deleteFile}
                        closeFileFunction={setFileId}
                    />
                }


            </div>
        </div>
    )
}

export default CodeScreen