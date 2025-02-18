"use client"
import React, { useEffect, useRef, useState } from 'react'
import Editor from '@monaco-editor/react';
import { Clipboard } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster"





const obj = `import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import Home from './Home.jsx'   // Your main component
import "./styles.css";

const rootElement = document.getElementById('userPageRoot')
const root = createRoot(rootElement)

root.render(<Home />)
`;

const obj2 = `@tailwind base;

@tailwind components;

@tailwind utilities;
`;

function Page5() {
    const { toast } = useToast()
    const [code, setCode] = useState(obj);

    const parentContainer = useRef(null);
    const childToBeAnimated = useRef(null);
    const [animationState, setAnimationState] = useState('hidden'); // 'hidden', 'opening', 'open', 'closing'

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                        setAnimationState('opening');
                    } else if (!entry.isIntersecting && animationState === 'open') {
                        setAnimationState('closing');
                    }
                });
            },
            { threshold: [0, 0.5, 1], rootMargin: "0px" }
        );

        observer.observe(parentContainer.current);

        return () => observer.disconnect();
    }, [animationState]);

    useEffect(() => {
        if (animationState === 'opening') {
            childToBeAnimated.current.classList.add("capsule-animate");
            childToBeAnimated.current.classList.remove("capsule-animate-reverse");
            setTimeout(() => setAnimationState('open'), 500); // Adjust based on your animation duration
        } else if (animationState === 'closing') {
            childToBeAnimated.current.classList.add("capsule-animate-reverse");
            childToBeAnimated.current.classList.remove("capsule-animate");
            setTimeout(() => setAnimationState('hidden'), 500); // Adjust based on your animation duration
        }
    }, [animationState]);

    return (
        <div>
            <div ref={parentContainer} className='min-h-screen page-5 bg-black flex flex-col items-center p-10 sticky top-0'>

                <div className='text-[3rem] font-semibold font-mono text-center text-white'>
                    <h1>From Code, to Host.</h1>
                    <h1 className='text-transparent bg-clip-text bg-gradient-to-r from-red-900 to-blue-900 font-extrabold'>It&apos;s Simple!!</h1>
                    <h1>With just a click</h1>
                </div>

                <div ref={childToBeAnimated} className={`capsule flex flex-col bg-black rounded-lg border-2 border-white ${animationState !== 'hidden' ? 'opacity-100' : 'opacity-0'}`}>
                    <div className='border-b-2 border-gray-700 flex justify-between bg-gray-900 font-mono rounded-t-lg px-4 items-center pt-4'>
                        {/* <span className='text-gray-400'>index.jsx</span> */}
                        <div className='flex text-gray-400 gap-2'>
                            <button className={`p-2 hover:bg-gray-700 rounded-t-sm ${code === obj ? "bg-gray-700" : "bg-gray-900"}`} onClick={() => setCode(obj)}>index.jsx</button>
                            <button className={`p-2 hover:bg-gray-700 rounded-t-sm ${code === obj2 ? "bg-gray-700" : "bg-gray-900"}`} onClick={() => setCode(obj2)}>styles.css</button>
                        </div>
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(code);
                                toast({
                                    title: "Copied to clipboard!",
                                    description: "Create a file with the same name in the project's root directory and add the following code to it.",
                                    className: "text-gray-400 bg-gray-900"
                                })
                            }}
                            className='p-2 hover:bg-gray-700 rounded-t-sm text-gray-400'>
                            <Clipboard size={16} />
                        </button>
                    </div>
                    <div className='code-block rounded-b-lg overflow-hidden'>
                        <Editor
                            height={"15rem"}
                            language="javascript"
                            options={{
                                fontSize: 16,
                                readOnly: true,
                                autoIndent: "advanced",
                                bracketPairColorization: true,
                                minimap: { enabled: false },
                                scrollbar: { horizontal: "hidden", vertical: "hidden" },
                                scrollBeyondLastLine: false,
                                codeLens: false,
                            }}
                            theme='hc-black'
                            value={code}
                            loading={<div className='text-2xl'>Loading File...</div>}
                        />
                    </div>
                    <div className='mt-10 text-[1.2rem] flex items-center gap-6 w-full justify-evenly'>
                        <div className='relative group'>
                            <div className='absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt'></div>
                            <button className='relative px-7 py-4 bg-black rounded-lg leading-none flex items-center divide-x divide-gray-600'>
                                <span className='flex items-center space-x-5'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-600 -rotate-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                    </svg>
                                    <span className='pr-6 text-gray-100'>Create Project</span>
                                </span>
                            </button>
                        </div>
                        <div className='relative group'>
                            <div className='absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt'></div>
                            <button className='relative px-7 py-4 bg-black rounded-lg leading-none flex items-center divide-x divide-gray-600'>
                                <span className='flex items-center space-x-5'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 -rotate-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    <span className='pr-6 text-gray-100'>Deploy</span>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
                
            </div>
            <Toaster />

            <div className='h-[300px]'></div>
        </div>
    )
}

export default Page5