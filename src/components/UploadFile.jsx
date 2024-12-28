"use client"
import React, { useState } from 'react';

function UploadFile ({setIsUploading}){
    const [selectedFiles, setSelectedFiles] = useState([]);
    
    return(
        <div>
            <div className='overflow-scroll flex flex-col gap-y-1 p-2'>
                {selectedFiles.map((file, index) => {
                    return (
                        <div key={index} className='flex justify-between items-center p-2 bg-gray-800 rounded-lg'>
                            <h1 className='text-gray-300'>{file.name}</h1>
                            <div className='flex items-center gap-x-2 justify-end'>
                                <h1 className='text-gray-300'>{(file.size/1024) | 0} KB</h1>
                                <button
                                    className='px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md transition duration-300'
                                    onClick={() => setSelectedFiles(selectedFiles.filter((f, i) => i !== index))}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* make the form sticky to the bottom of the component */}
            <form className='flex justify-between items-center absolute bottom-0 w-full p-2'
                action={(e) => { fileFunctions.uploadNewFiles(selectedFiles); setSelectedFiles([])
            }}>
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
                {
                    selectedFiles.length > 0 
                        ? <button className='p-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition duration-300' type='submit'>Upload</button> 
                        : null
                }
                
            </form>
        </div>
    )
}

export default UploadFile;