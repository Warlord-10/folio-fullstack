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
    const [responseData, setResponseData] = useState({ type: null, msg: null });
    const [currFile, setCurrFile] = useState({ detail: "", data: "" }); // data of the file currently editing

    useEffect(() => {
        const fetchFileData = async () => {
            const responseDetail = await axios.get(requests.getFileDetail(fileId));
            const responseData = await axios.get(requests.getFileData(fileId));
            // console.log(responseDetail.data, responseData.data);
            setCurrFile({ detail: responseDetail.data, data: responseData.data });
            return responseDetail.data;
        }
        if (fileId !== null) {
            fetchFileData();
        }
    }, [fileId])

    return (
        <div className={isEdit ? 'border-4 border-green-500 rounded-md mt-2 overflow-hidden' : 'rounded-md border-2 mt-2 overflow-hidden'}>
            {currFile.detail && <div className='codeEditorNavbar flex p-2 border-b-2 justify-between items-center'>
                <div>
                    <h1 className='text-xl'>{currFile.detail.name}</h1>
                    {responseData.type == "update" && <h1 className='text-green-500'>{responseData.msg}</h1>}
                    <h1 className='text-gray-500 text-sm'>Updated At: {currFile.detail.updatedAt}</h1>
                </div>

                {isEdit
                    ? <div className='flex divide-x border-2 border-gray-500 rounded-md'>
                        <button className='p-2 hover:bg-gray-600' onClick={() => setIsEdit(false)}>Cancel Changes</button>
                        <button className='p-2 hover:bg-green-600' onClick={() => updateFileFunction(fileId, { data: currFile.data })}>Save Changes</button>
                    </div>
                    : <div className='flex border-2 border-gray-500 rounded-md divide-x'>
                        <button className="p-2 hover:bg-gray-600" onClick={() => setIsEdit(true)}>Edit</button>
                        <button className='p-2 hover:bg-gray-600' onClick={() => deleteFileFunction(fileId)}>Delete</button>
                        <button className='p-2 hover:bg-gray-600'>Download</button>
                        <button className='p-2 hover:bg-gray-600 px-5' onClick={() =>
                            {closeFileFunction(null); setCurrFile({ detail: "", data: "" })}
                        }>X</button>
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