"use client"
import React, { useState, useEffect } from 'react'
import axios from "@/Networking/Axios";
import requests from "@/Networking/Requests";
import { FileDetailTab, FolderDetailTab } from './RepoTab';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation';
import DropdownMenu from './DropDownMenu';
import PopUpBox from './PopUpBox';
import { FilePlusIcon, FolderPlusIcon, Upload, UploadIcon } from 'lucide-react';
import UploadFile from './UploadFile';

function FileAndFolderList({ permission, rawFolderData }) {
    const pathname = usePathname();
    const router = useRouter();

    const [fileData, setFileData] = useState(rawFolderData.files)
    const [folderData, setFolderData] = useState(rawFolderData.folders)
    const [currFolderData, setCurrFolderData] = useState(rawFolderData.data)
    const [currFolderId, setCurrFolderId] = useState(rawFolderData.data._id)

    const [showDropDown, setShowDropDown] = useState(false)
    const [isAddingNew, setIsAddingNew] = useState(null)
    const [isDeleting, setIsDeleting] = useState(false)
    const [isUploading, setIsUploading] = useState(false)


    const handleUploadFiles = async (dataToSend) => {
        try {
            const response = await axios.post(requests.uploadFile(currFolderId), dataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    const handleAdd = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        formData.append("parent", currFolderId)
        const dataToSend = Object.fromEntries(formData);

        try {
            if (isAddingNew == "folder") {
                const response = await axios.post(requests.createFolder(), dataToSend)
                setFolderData([...folderData, response.data])
            }
            else {
                const response = await axios.post(requests.createFile(), dataToSend)
                setFileData([...fileData, response.data])
            }
            setIsAddingNew(null);
        } catch (error) { }
    }

    const handleDelete = async (e) => {
        try {
            e.preventDefault()
            const response = axios.delete(requests.getUpdateDeleteFolderById(currFolderData._id))
            setFolderData(folderData.filter((folder) => folder._id !== currFolderData._id));
            setIsDeleting(false)

            const lastSlashIndex = pathname.lastIndexOf('/');
            const newUrl = pathname.substring(0, lastSlashIndex).replace("blob", "tree");

            router.replace(newUrl);
        } catch (error) { }
    }


    return (
        <div className='w-full border-2 border-purple-600 rounded-lg font-mono bg-gray-900 shadow-lg'>
            <div className='p-4 items-center flex justify-between border-gray-950 border-b-4'>
                <h1 className='text-md font-thin'>
                    <Link href={`/${currFolderData.relPath.split("\\").slice(0, 2).join("/")}`} className='text-blue-600'>
                        {currFolderData.relPath.split("\\")[1]}
                    </Link>
                    <span>{"/" + currFolderData.absPath.replace("\\", "/")}</span>
                </h1>

                {permission == "OWNER" && (
                    <div className='flex gap-2'>
                        <DropdownMenu
                            title="Add Files"
                            isOpen={showDropDown}
                            toOpen={() => setShowDropDown(!showDropDown)}
                        >
                            <button className='flex gap-4 hover:bg-gray-700 transition duration-100 p-1 rounded-md' onClick={() => { setIsAddingNew("file"); setShowDropDown(false) }}>
                                <FilePlusIcon size={24} />
                                <h1>Add File</h1>
                            </button>
                            <button className='flex gap-4 hover:bg-gray-700 transition duration-100 p-1 rounded-md' onClick={() => { setIsAddingNew("folder"); setShowDropDown(false) }}>
                                <FolderPlusIcon size={24} />
                                <h1>Add Folder</h1>
                            </button>
                            <button className='flex gap-4 hover:bg-gray-700 transition duration-100 p-1 rounded-md' onClick={() => { setIsUploading(true); setShowDropDown(false) }}>
                                <UploadIcon size={24} />
                                <h1>Upload Files</h1>
                            </button>
                        </DropdownMenu>

                        {currFolderData.parent_id !== null && (
                            <button
                                className='rounded-md border border-red-800 hover:bg-red-500 p-2'
                                onClick={() => setIsDeleting(true)}
                            >Delete
                            </button>
                        )}
                    </div>
                )}
            </div>


            <div className='p-2 flex flex-col'>
                {currFolderData && currFolderData.parent_id !== null && (
                    <Link
                        className='flex p-3 hover:bg-gray-800 justify-between items-center rounded-lg transition duration-300'
                        href={pathname.split("/").slice(0, -1).join("/")}
                    >...

                    </Link>
                )}
                {isAddingNew && (
                    <form onSubmit={(e) => handleAdd(e)} className='flex justify-between p-3'>
                        <input name={`${isAddingNew}_name`} className='p-1 text-black rounded-md' placeholder={`${isAddingNew} name`} type='text' />
                        <div className='flex gap-2'>
                            <button type='submit' className='rounded-md border-2 border-black p-2 hover:bg-green-500 transition duration-100' >Save</button>
                            <button type='button' className='rounded-md border-2 border-black p-2 hover:bg-red-500 transition duration-100' onClick={() => setIsAddingNew(null)}>Cancel</button>
                        </div>
                    </form>
                )}
                {
                    fileData && fileData.map((file, index) => {
                        let tempPath = ""
                        if (pathname.includes("tree/main")) {
                            tempPath = `${pathname.replace("tree", "blob")}/${file.name}`
                        }
                        else {
                            tempPath = `${pathname}/blob/main/${file.absPath}`
                        }
                        return (
                            <Link key={index} href={tempPath}>
                                <FileDetailTab fileData={file} key={index} />
                            </Link>
                        )
                    })
                }
                {
                    folderData && folderData.map((folder, index) => {
                        let tempPath = ""
                        if (pathname.includes("tree/main")) {
                            tempPath = `${pathname}/${folder.name}`
                        }
                        else {
                            tempPath = `${pathname}/tree/main/${folder.absPath}`
                        }
                        return (
                            <Link key={index} href={tempPath}>
                                <FolderDetailTab folderData={folder} key={index} />
                            </Link>
                        )
                    })
                }
            </div>

            <PopUpBox
                isOpen={isDeleting}
                onClose={() => setIsDeleting(false)}
                onConfirm={handleDelete}
                title="Confirm Delete?"
                confirmTitle="Delete"
            >
                <div className='flex flex-col items-center justify-center'>
                    <p className='text-gray-300'>Are you sure you want to delete folder <span className='text-red-400 font-semibold text-lg'>&quot;{currFolderData.name}&quot;</span>? Once deleted, it cannot be recovered.</p>
                </div>
            </PopUpBox>

            <UploadFile
                isOpen={isUploading}
                toClose={() => setIsUploading(false)}
                handleUpload={handleUploadFiles}
            />

        </div>
    )
}

export default FileAndFolderList