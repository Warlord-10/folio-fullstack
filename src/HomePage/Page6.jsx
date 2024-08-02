"use client";
import React, { useEffect, useRef, useState } from 'react';

function Page6() {
    const parentContainer = useRef(null);
    const childToBeAnimated = useRef(null);
    const [hasAnimated, setHasAnimated] = useState(false); // Track animation state

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((element) => {
                    if (element.isIntersecting && !hasAnimated) {
                        parentContainer.current.classList.add("page-6");
                        parentContainer.current.classList.remove("page-6-reverse");
                        setHasAnimated(true); // Set flag to true after animation starts
                    } else if (!element.isIntersecting && hasAnimated) {
                        parentContainer.current.classList.remove("page-6");
                        parentContainer.current.classList.add("page-6-reverse");
                        setHasAnimated(false); // Reset flag
                    }
                });
            },
            { threshold: 1, rootMargin: "100px" }
        );

        observer.observe(parentContainer.current);

        // Cleanup function
        return () => observer.disconnect();
    }, [hasAnimated]);

    return (
        <div>
            <div ref={parentContainer} className='min-h-screen font-mono bg-black p-10 flex flex-col items-center sticky top-0'>

                <h1 className='leading-none text-[3rem] font-semibold text-white'>Managing Files Is</h1>

                <div ref={childToBeAnimated} className='relative items-center flex flex-col h-full mt-5'>
                    <div className='page-6-text-content text-white text-center w-[50%]'>
                        <h1 className='leading-none text-transparent bg-clip-text bg-gradient-to-r from-red-900 to-blue-900 p-1 text-[3rem] font-extrabold'>Now Easier</h1>
                        <p className='text-[1.2rem]'>
                            Effortlessly capture, organize, and safeguard your code with the seamless file storage solution. Instantly upload, access, and share your projects anytime, anywhere.
                        </p>
                    </div>
                    <div className='page-6-file-manager absolute min-w-96 rounded-md border-2 border-gray-600 w-[60%] overflow-hidden bg-gray-900 px-5'>
                        <h1 className='border-b-2 border-white text-white text-[2rem] p-3'>
                            Folio
                        </h1>
                        <div className='flex flex-col page-6-file-manager-content h-[256px]'>
                            <div className='p-2 flex justify-between gap-x-5 hover:bg-gray-950 cursor-pointer items-center'>
                                <h1 className='items-center flex text-white gap-3'>
                                    <img src='/folderIcon.svg' />
                                    ...
                                </h1>
                                <div className='flex gap-3'>
                                    <img src='/editIcon.svg' className='h-[20px] aspect-square'/>
                                    <img src='/trashIcon.svg' className='h-[20px] aspect-square'/>
                                </div>
                            </div>
                            <div className='p-2 flex justify-between gap-x-5 hover:bg-gray-950 cursor-pointer items-center'>
                                <h1 className='items-center flex text-white gap-3'>
                                    <img src='/folderIcon.svg' />
                                    src
                                </h1>
                                <div className='flex gap-3'>
                                    <img src='/editIcon.svg' className='h-[20px] aspect-square'/>
                                    <img src='/trashIcon.svg' className='h-[20px] aspect-square'/>
                                </div>
                            </div>
                            <div className='p-2 flex justify-between gap-x-5 hover:bg-gray-950 cursor-pointer items-center'>
                                <h1 className='items-center flex text-white gap-3'>
                                    <img src='/folderIcon.svg' />
                                    app
                                </h1>
                                <div className='flex gap-3'>
                                    <img src='/editIcon.svg' className='h-[20px] aspect-square'/>
                                    <img src='/trashIcon.svg' className='h-[20px] aspect-square'/>
                                </div>
                            </div>
                            <div className='p-2 flex justify-between gap-x-5 hover:bg-gray-950 cursor-pointer items-center'>
                                <h1 className='items-center flex text-white gap-3'>
                                    <img src='/folderIcon.svg' />
                                    public
                                </h1>
                                <div className='flex gap-3'>
                                    <img src='/editIcon.svg' className='h-[20px] aspect-square'/>
                                    <img src='/trashIcon.svg' className='h-[20px] aspect-square'/>
                                </div>
                            </div>
                            <div className='p-2 flex justify-between gap-x-5 hover:bg-gray-950 cursor-pointer items-center'>
                                <h1 className='items-center flex text-white gap-3'>
                                    <img src='/folderIcon.svg' />
                                    components
                                </h1>
                                <div className='flex gap-3'>
                                    <img src='/editIcon.svg' className='h-[20px] aspect-square'/>
                                    <img src='/trashIcon.svg' className='h-[20px] aspect-square'/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className='h-[300px]'></div>

        </div>
    );
}

export default Page6;
