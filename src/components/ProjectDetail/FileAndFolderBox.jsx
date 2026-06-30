"use client"
import React, { useState } from 'react'
import { fetchClient } from '@/Networking/FetchInstanceClient';
import requests from "@/Networking/Requests"
import { usePathname, useRouter } from 'next/navigation'
import { toast } from 'sonner'

import FileList from './FileList'
import FolderList from './FolderList'
import AddFileOrFolderForm from './AddFileOrFolderForm'
import FolderHeader from './FolderHeader'
import PopUpBox from '../PopUpBox'
import UploadFile from '../UploadFile'
import Link from 'next/link'

function FileAndFolderBox({ permission, rawFolderData }) {
    const pathname = usePathname();
    const router = useRouter();

    const currFolderData = rawFolderData.data;
    const currFolderId = currFolderData._id;

    const [fileData, setFileData] = useState(rawFolderData.files);
    const [folderData, setFolderData] = useState(rawFolderData.folders);

    const [showDropDown, setShowDropDown] = useState(false);
    const [isAddingNew, setIsAddingNew] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const handleUploadFiles = async (dataToSend) => {
        try {
            await fetchClient(requests.uploadFile(currFolderId), {
                method: 'POST',
                body: dataToSend,
            });
            toast.success("Upload successful");
        } catch (error) {
            console.error(error);
            toast.error("Upload failed");
        }
    }

    const handleAdd = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        formData.append("parent_id", currFolderId);

        const dataToSend = Object.fromEntries(formData);

        try {
            if (isAddingNew === "folder") {
                const response = await fetchClient(requests.createFolder(), {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dataToSend),
                });
                setFolderData([...folderData, response]);
            } else {
                const response = await fetchClient(requests.createFile(), {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dataToSend),
                });
                setFileData([...fileData, response]);
            }

            toast.success("Creation successful");
            setIsAddingNew(null);
        } catch (error) {
            console.error(error);
            toast.error("Creation failed");
        }
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            await fetchClient(requests.getUpdateDeleteFolderById(currFolderData._id), {
                method: 'DELETE',
            });
            setFolderData(folderData.filter(folder => folder._id !== currFolderData._id));
            setIsDeleting(false);

            const lastSlashIndex = pathname.lastIndexOf('/');
            const newUrl = pathname.substring(0, lastSlashIndex).replace("blob", "tree");

            toast.success("Deletion successful");
            router.replace(newUrl);
        } catch (error) {
            console.error(error);
            toast.error("Deletion failed");
        }
    }

    return (
        <div className='w-full border-2 border-purple-600 rounded-lg font-mono bg-gray-900 shadow-lg'>
            <FolderHeader
                relPath={currFolderData.relPath}
                absPath={currFolderData.absPath}
                permission={permission}
                showDropDown={showDropDown}
                toggleDropDown={() => setShowDropDown(!showDropDown)}
                onAddFile={() => { setIsAddingNew("file"); setShowDropDown(false); }}
                onAddFolder={() => { setIsAddingNew("folder"); setShowDropDown(false); }}
                onUpload={() => { setIsUploading(true); setShowDropDown(false); }}
                onDelete={() => setIsDeleting(true)}
                showDeleteButton={currFolderData.parent_id !== null}
            />

            <div className='p-2 flex flex-col'>
                {currFolderData.parent_id !== null && (
                    <Link
                        className='flex p-3 hover:bg-gray-800 justify-between items-center rounded-lg transition duration-300'
                        href={pathname.split("/").slice(0, -1).join("/")}
                    >...
                    </Link>
                )}

                {isAddingNew && (
                    <AddFileOrFolderForm
                        type={isAddingNew}
                        onSubmit={handleAdd}
                        onCancel={() => setIsAddingNew(null)}
                    />
                )}

                <FolderList folders={folderData} pathname={pathname} />
                <FileList files={fileData} pathname={pathname} />
            </div>

            <PopUpBox
                isOpen={isDeleting}
                onClose={() => setIsDeleting(false)}
                onConfirm={handleDelete}
                title="Confirm Delete?"
                confirmTitle="Delete"
            >
                <div className='flex flex-col items-center justify-center'>
                    <p className='text-gray-300'>
                        Are you sure you want to delete folder <span className='text-red-400 font-semibold text-lg'>&quot;{currFolderData.name}&quot;</span>? Once deleted, it cannot be recovered.
                    </p>
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

export default FileAndFolderBox;
