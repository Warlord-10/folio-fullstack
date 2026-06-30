"use client";
import React, { useEffect, useRef, useState } from 'react';
import { fetchClient } from '@/Networking/FetchInstanceClient'
import requests from '@/Networking/Requests';

import { usePathname, useRouter } from 'next/navigation';
import { format } from 'date-fns';
import Editor from '@monaco-editor/react';
import { registerCompletion } from 'monacopilot';
import { toast } from 'sonner';

import EditorToolbar from './EditorToolbar';
import FileDeletePopup from './FileDeletePopup';

function CodeEditorPanel({ fileDetails, permission }) {
    const pathname = usePathname();
    const router = useRouter();
    const editorRef = useRef(null);

    const [currFileData, setCurrFileData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchClient(requests.getFileData(fileDetails._id), {
                    method: "GET",
                    responseType: "text",
                });
                setCurrFileData(response);
            } catch (error) {
                console.error("Failed to fetch file data", error);
            }
        };

        fetchData();
    }, [fileDetails._id]);

    const handleEditorDidMount = (editor, monaco) => {
        return 0;
        editorRef.current = editor;
        const completion = registerCompletion(monaco, editor, {
            endpoint: requests.getCodeSuggestions(),
            language: fileDetails.language?.toLowerCase(),
            maxContextLines: 50,
        });

        return () => completion.deregister();
    };

    const handleSave = () => {
        toast.promise(fetchClient(requests.updateDeleteFileById(fileDetails._id), {
            method: "PATCH",
            body: JSON.stringify({ content: currFileData }),
            headers: {
                "Content-Type": "application/json",
            }
        }), {
            loading: 'Saving file...',
            success: 'File saved successfully',
            error: 'Failed to save file'
        });
    };

    const handleDelete = async () => {
        try {
            await fetchClient(requests.updateDeleteFileById(fileDetails._id), {
                method: "DELETE",
            });
            toast.success("File deleted successfully");
            const newUrl = pathname.substring(0, pathname.lastIndexOf('/')).replace("blob", "tree");
            router.replace(newUrl);
        } catch (error) {
            console.error("File delete failed", error);
            toast.error("Failed to delete file");
        }
    };

    const handleSetIsEditing = (value) => {
        if (value) {
            toast.info("Editing mode enabled");
        } else {
            toast.info("Editing mode disabled");
        }
        setIsEditing(value);
    };

    return (
        <div className={`${isEditing ? 'border-green-500' : 'border-gray-700'} border-2 rounded-md overflow-hidden bg-gray-900`}>
            <div className="codeEditorNavbar p-2 border-b-2 border-gray-700 flex justify-between items-center">
                <div>
                    <h1 className="text-xl text-white">{fileDetails.name}{isEditing && <span className="text-green-500"> (Editing...)</span>}</h1>
                    <p className="text-gray-400 text-sm">
                        Updated At: {format(new Date(fileDetails.updatedAt), "dd/MM/yy, HH:mm")}
                    </p>
                </div>

                <EditorToolbar
                    isEditing={isEditing}
                    setIsEditing={handleSetIsEditing}
                    onSave={handleSave}
                    onDelete={() => setIsDeleting(true)}
                    permission={permission}
                />
            </div>

            <Editor
                height="80vh"
                language={fileDetails.language?.toLowerCase() || "javascript"}
                value={currFileData}
                onMount={handleEditorDidMount}
                onChange={(value) => setCurrFileData(value)}
                theme="hc-black"
                options={{
                    minimap: { enabled: true },
                    fontSize: 14,
                    readOnly: !isEditing,
                    autoIndent: "advanced",
                    bracketPairColorization: true,
                    codeLens: true,
                    cursorBlinking: "blink",
                }}
                loading={<div className='text-white text-center text-xl mt-4'>Loading File...</div>}
            />

            <FileDeletePopup
                isOpen={isDeleting}
                onClose={() => setIsDeleting(false)}
                onConfirm={handleDelete}
                fileName={fileDetails.name}
            />
        </div>
    );
}

export default CodeEditorPanel;
