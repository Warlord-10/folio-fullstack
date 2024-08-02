import React from 'react'
import { Source_Code_Pro } from 'next/font/google'
import Link from 'next/link'

const scp = Source_Code_Pro({
    weight: "400",
    style: "italic",
    subsets: ['latin']
})

function CodeEditorHomePage({styles}) {
    return (
        <div className={`border-4 border-white rounded-lg ${styles} relative backdrop-blur-sm`}>

            <div className='bg-white p-2 font-mono'>
                Folio.jsx
            </div>
            <div className={`p-5 text-white relative ${scp.className} flex flex-col gap-1`}>
                <div className='line relative'>
                    <span className='text-red-500'>export default </span>
                    <span className='text-cyan-500'>function </span>
                    <span className='text-green-500'>Index</span>
                    <span className='text-yellow-500'>{"(){"}</span>
                </div>
                <div className='line relative left-5'>
                    <span>{"<"}</span>
                    <span className='text-blue-500'>Home</span>
                    <span>{" />"}</span>
                </div>
                <Link className='line relative left-5' href="/auth/login">
                    <span>{"<"}</span>
                    <span className='text-blue-500'>Login</span>
                    <span>{" />"}</span>
                </Link>
                <div className='line relative left-5'>
                    <span>{"<"}</span>
                    <span className='text-blue-500'>About</span>
                    <span>{" />"}</span>
                </div>
                <div className='line relative'>
                    <span className='text-yellow-500'>{"}"}</span>
                </div>
            </div>

        </div>
    )
}

export default CodeEditorHomePage