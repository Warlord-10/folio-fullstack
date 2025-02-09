"use client"
import React, { useEffect, useRef, useState } from 'react'

import axios from "@/Networking/Axios";
import requests from '@/Networking/Requests';

import { format, set } from 'date-fns';
import Editor from '@monaco-editor/react';
import PopUpBox from './PopUpBox';

import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { EditIcon, TrashIcon, X, FileIcon, Check } from 'lucide-react';
import { registerCompletion } from 'monacopilot';

import { motion } from "framer-motion"


const fileLoading = () => {
    return (
        <motion.div
            className="relative flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
            <FileIcon className="w-8 h-8 text-white" />
            <motion.div
                className="absolute w-full h-full rounded-full border-4 border-blue-300"
                animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeOut" }}
            />
        </motion.div>
    )
}

function CodeEditorPanel({ fileDetails, permission }) {
    const pathname = usePathname();
    const router = useRouter();
    const editorRef = useRef(null);

    const [currFileData, setCurrFileData] = useState(null);

    const [isEditingFile, setIsEditingFile] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [responseData, setResponseData] = useState(null);
    const [cleanup, setCleanUp] = useState(null);


    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor;
        const completion = registerCompletion(monaco, editor, {
            endpoint: requests.getCodeSuggestions(),
            language: fileDetails.language?.toLowerCase(),
            maxContextLines: 50,
        });
        setCleanUp(() => completion.deregister)
    }


    const localFileUpdateFunction = async () => {
        try {
            const response = await axios.patch(requests.updateDeleteFileById(fileDetails._id), { data: currFileData })
            setResponseData("Saved");
            setTimeout(() => {
                setResponseData(null);
            }, 2000);
        } catch (error) {
            setResponseData("Failed");
            setTimeout(() => {
                setResponseData(null);
            }, 2000);
        }

    }

    const handleDelete = async (e) => {
        try {
            e.preventDefault()
            const response = await axios.delete(requests.updateDeleteFileById(fileDetails._id))

            const lastSlashIndex = pathname.lastIndexOf('/');
            const newUrl = pathname.substring(0, lastSlashIndex).replace("blob", "tree");

            router.replace(newUrl);
        } catch (error) {

        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(requests.getFileData(fileDetails._id))
            setCurrFileData(response.data)
        }

        fetchData()
        return () => {
            cleanup;
        }
    }, [])



    return (
        <div className={`${isEditingFile ? 'border-2 border-green-500' : 'border-2 border-gray-700'} rounded-md overflow-hidden bg-gray-900`}>

            <div className='codeEditorNavbar flex p-2 border-b-2 border-gray-700 justify-between items-center'>
                <div>
                    <h1 className='text-xl text-white'>
                        {fileDetails.name}
                        {isEditingFile ? <span className='text-green-500'> (Editing...)</span> : null}
                    </h1>
                    {responseData}
                    <h1 className='text-gray-400 text-sm'>
                        Updated At: {format(new Date(fileDetails.updatedAt), "dd/MM/yy, HH:mm")}
                    </h1>
                </div>

                {!isEditingFile
                    ?
                    // If the file is in View mode
                    permission == "OWNER" && (
                        <div className='flex border-2 border-gray-600 rounded-md items-center divide-x'>
                            <button
                                className='flex gap-1 p-2 items-center hover:bg-gray-600 transition duration-200'
                                onClick={() => setIsEditingFile(true)}
                                name='editFile'
                            >
                                <h1>Edit</h1>
                                <EditIcon size={24} />
                            </button>
                            <button
                                className='flex gap-1 p-2 items-center hover:bg-gray-600 transition duration-200'
                                onClick={() => setIsDeleting(true)}
                                name='deleteFile'
                            >
                                <h1>Delete</h1>
                                <TrashIcon size={24} />
                            </button>
                        </div>
                    )
                    :
                    // If the file is in Edit mode
                    <div className='flex divide-x border-2 border-gray-600 rounded-md'>
                        <button
                            className='p-2 hover:bg-gray-700 text-white'
                            onClick={() => setIsEditingFile(false)}
                            name='cancelEdit'>
                            <X size={24} />
                        </button>
                        <button
                            className='p-2 hover:bg-green-700 text-white'
                            onClick={() => localFileUpdateFunction()}
                            name='saveEdit'>
                            <Check size={24} />
                        </button>
                    </div>
                }
            </div>

            <Editor
                height="80vh"
                onChange={(value, event) => {
                    setCurrFileData(value)
                }}
                language={fileDetails.language?.toLowerCase() || "javascript"}
                onMount={handleEditorDidMount}
                options={{
                    minimap: { enabled: true },
                    fontSize: 14,
                    readOnly: !isEditingFile,
                    autoIndent: "advanced",
                    bracketPairColorization: true,
                    codeLens: true,
                    cursorBlinking: "blink"
                }}
                theme='hc-black'
                value={currFileData}
                loading={<div className='text-2xl'>Loading File...</div>}
            />
            <PopUpBox
                isOpen={isDeleting}
                onClose={() => setIsDeleting(false)}
                onConfirm={handleDelete}
                title="Confirm Delete?"
                confirmTitle="Delete"
            >
                <div className='flex flex-col items-center justify-center'>
                    <p className='text-gray-300'>Are you sure you want to delete file <span className='text-red-400 font-semibold text-lg'>&quot;{fileDetails.name}&quot;</span>? Once deleted, it cannot be recovered.</p>
                </div>
            </PopUpBox>
        </div>
    )
}

export default CodeEditorPanel