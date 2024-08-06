"use client"
import React, { useEffect, useState } from 'react'
import AceEditor from 'react-ace';
import axios from "@/Networking/Axios";
import requests from '@/Networking/Requests';

import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/keybinding-vscode';
import 'ace-builds/src-noconflict/theme-github_dark';

import "ace-builds/src-noconflict/ext-language_tools"

function CodeEditorPanel({ fileId, updateFileFunction, deleteFileFunction, closeFileFunction }) {
    const [isEdit, setIsEdit] = useState(false);
    const [responseData, setResponseData] = useState(null);
    const [currFile, setCurrFile] = useState({ detail: "", data: "" }); // data of the file currently editing


    const localFileUpdateFunction = ()=>{
        const response = updateFileFunction(fileId, { data: currFile.data })
        setResponseData(response);
        setTimeout(() => {
            setResponseData(null);
        }, 2000);
    }
    const localFileDeleteFunction = ()=>{
        deleteFileFunction(fileId)
    }
    const localCloseFileFunction = ()=>{
        closeFileFunction(null); 
    }


    useEffect(() => {
        const fetchFileData = async () => {
            const responseDetail = await axios.get(requests.getFileDetail(fileId));
            const responseData = await axios.get(requests.getFileData(fileId));
            setCurrFile({ detail: responseDetail.data, data: responseData.data });
            return responseDetail.data;
        }
        if (fileId !== null) {
            fetchFileData();
        }
        else{
            setCurrFile({ detail: "", data: "" })
        }
    }, [fileId])

    return (
        <div className={`${isEdit ? 'border-4 border-green-500' : 'border-2 border-gray-700'} rounded-md mt-2 overflow-hidden bg-gray-900`}>
            {currFile.detail && <div className='codeEditorNavbar flex p-2 border-b-2 border-gray-700 justify-between items-center'>
                <div>
                    <h1 className='text-xl text-white'>{currFile.detail.name}</h1>
                    {responseData}
                    <h1 className='text-gray-400 text-sm'>Updated At: {currFile.detail.updatedAt}</h1>
                </div>

                {isEdit
                    ? <div className='flex divide-x border-2 border-gray-600 rounded-md'>
                        <button
                            className='p-2 hover:bg-gray-700 text-white'
                            onClick={() => setIsEdit(false)}>
                            Cancel Changes
                        </button>
                        <button
                            className='p-2 hover:bg-green-700 text-white'
                            onClick={localFileUpdateFunction}>
                            Save Changes
                        </button>
                    </div>
                    : <div className='flex border-2 border-gray-600 rounded-md divide-x'>
                        <button
                            className="p-2 hover:bg-gray-700 text-white"
                            onClick={() => setIsEdit(true)}>
                            Edit
                        </button>
                        <button
                            className='p-2 hover:bg-gray-700 text-white'
                            onClick={localFileDeleteFunction}> 
                            Delete
                        </button>
                        <button
                            className='p-2 hover:bg-gray-700 text-white px-5'
                            onClick={localCloseFileFunction}> X
                        </button>
                    </div>
                }
            </div>}
            <AceEditor
                className='folioCodeEditor'
                mode="javascript"
                theme="github_dark"
                keyboardHandler='vscode'
                onChange={(e) => setCurrFile({
                    detail: currFile.detail,
                    data: e
                })}
                value={currFile.data}
                name="UNIQUE_ID_OF_DIV"
                showPrintMargin={false}
                readOnly={!isEdit}
                width='100%'
                minLines={30}
                maxLines={Infinity}
                fontSize={20}
                editorProps={{ $blockScrolling: true }}
                style={{ backgroundColor: "#0d0a15" }}
                setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                }}
            />
        </div>
    )
}

export default CodeEditorPanel