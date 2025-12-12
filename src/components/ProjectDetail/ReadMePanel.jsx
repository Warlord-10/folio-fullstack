"use client"
import React, { useEffect, useState } from 'react'
import { fetchClient } from '@/Networking/FetchInstanceClient';
import requests from '@/Networking/Requests';
import Markdown from 'marked-react';
import { BookOpenIcon } from 'lucide-react';

function ReadMePanel({ file }) {
    const [readme, setReadme] = useState(null);

    useEffect(() => {
        async function fetchReadme() {
            try {
                const data = await fetchClient(requests.getFileData(file._id));
                setReadme(data);
            } catch (error) {

            }
        }

        if (file) fetchReadme();
    }, [])

    if (!file || readme === null) return null;
    return (
        <div className="w-full border-2 border-purple-600 rounded-lg font-mono bg-gray-900 shadow-lg">
            <div className='flex items-center border-b-2 border-gray-800 p-4 gap-2'>
                <BookOpenIcon size={16} strokeWidth={3} />
                <h1 className='font-bold text-lg'>README</h1>
            </div>
            <div className='p-2'>
                <Markdown>
                    {readme}
                </Markdown>
            </div>
        </div>
    )
}

export default ReadMePanel