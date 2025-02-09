"use client"
import React, { useState } from 'react';
import { XIcon } from 'lucide-react';

function UploadFile({ isOpen, toClose, handleUpload }) {
    const [selectedFiles, setSelectedFiles] = useState([]);

    const uploadFiles = (e) => {
        e.preventDefault();
        const formData = new FormData();
        selectedFiles.forEach((file) => {
            formData.append('file', file);
        });
        handleUpload(formData);
        toClose()
    }

    if (!isOpen) return null;
    else {
        return (
            <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-70 backdrop-blur-sm">

                <form className='flex flex-col space-y-4 w-full max-w-lg bg-gray-900 rounded-lg shadow-lg overflow-hidden border border-purple-500 relative p-4' onSubmit={uploadFiles}>
                    <div className='flex items-center justify-between'>
                        <h1 className='text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>Upload Files</h1>
                        <button type='button' onClick={toClose}>
                            <XIcon size={24} />
                        </button>
                    </div>

                    <div className='flex flex-col bg-inherit h-full overflow-hidden gap-2'>
                        <div className='flex flex-col gap-y-1 overflow-scroll flex-1'>
                            {selectedFiles.map((file, index) => {
                                return (
                                    <div key={index} className='flex justify-between items-center p-2 bg-gray-800 rounded-lg'>
                                        <h1 className='text-gray-300'>
                                            {file.name.slice(0, 25)}
                                            <>{file.name.length > 25 ? " ..." : ""}</>
                                        </h1>
                                        <div className='flex items-center gap-x-5 justify-end'>
                                            <h1 className='text-gray-300'>
                                                {(file.size / 1024) | 0} KB
                                            </h1>
                                            <button
                                                className='px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md transition duration-300'
                                                type='button'
                                                onClick={() => setSelectedFiles(selectedFiles.filter((f, i) => i !== index))}
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                            </button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        <div className='flex justify-between items-center h-fit'>
                            <label className='flex px-4 py-2 justify-between items-center cursor-pointer rounded-md bg-purple-600 hover:bg-purple-700 text-white transition duration-300'>
                                Select Files
                                <input
                                    name="file"
                                    className='hidden'
                                    type='file'
                                    multiple
                                    onChange={(e) => setSelectedFiles([...selectedFiles, ...e.target.files])} />
                            </label>
                            <h1 className='text-gray-300'>{selectedFiles.length} Files selected</h1>
                        </div>

                        {selectedFiles.length > 0 && (
                            <button type='submit' className='p-2 border-2 border-pink-500'>Upload</button>
                        )}
                    </div>

                </form>
            </div>
        )
    }
}

export default UploadFile;